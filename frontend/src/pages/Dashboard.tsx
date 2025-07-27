import { useEffect, useState } from "react";
import TeamSummary from "@/components/TeamSummary";
import PlayerCard from "@/components/PlayerCard";
import SellDialog from "@/components/SellDialog";
import { sellPlayer, unsellPlayer } from "@/api/player";
import { getTeamData } from "@/api/team";
import type { IPlayer } from "@/constants";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Dashboard = () => {
  const [budget, setBudget] = useState(0);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [totalPlayerNum, setTotalPlayerNum] = useState(0);
  const [totalClubValue, setTotalClubValue] = useState(0);
  const [isGeneratingTeam, setIsGeneratingTeam] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const [page, setPage] = useState(1);

  const handleFetchData = async (page = 1) => {
    const data = await getTeamData(page);
    setBudget(data.team.budget);
    setPlayers(data.players);
    setTotalPlayerNum(data.total);
    setTotalClubValue(data.totalClubValue);
    setTotalPages(data.totalPages);
    setIsGeneratingTeam(data.generatingTeam);
  };

  useEffect(() => {
    handleFetchData(page);
  }, [page]);

  const handleSell = async (id: string, price: number) => {
    try {
      await sellPlayer(id, price);
      await handleFetchData(page);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Error while selling player");
    }
  };

  const handleUnsell = async (id: string) => {
    try {
      await unsellPlayer(id);
      await handleFetchData(page);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Error while unselling player");
    }
  };

  if (isGeneratingTeam) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Generating team...</h1>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <TeamSummary
        budget={budget}
        teamValue={totalClubValue}
        playerCount={totalPlayerNum}
      />

      <div className="grid md:grid-cols-3 gap-4">
        {players.map((player) => (
          <PlayerCard
            key={player._id}
            {...player}
            action={() =>
              player.forSale
                ? handleUnsell(player._id)
                : (setSelectedId(player._id), setShowDialog(true))
            }
            actionText={player.forSale ? "Unsell" : "Sell"}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </Button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </Button>
      </div>

      {selectedId && (
        <SellDialog
          open={showDialog}
          onClose={() => setShowDialog(false)}
          onConfirm={(price) => handleSell(selectedId, price)}
        />
      )}
    </div>
  );
};

export default Dashboard;
