import { useEffect, useState } from "react";
import TransferFilterForm from "@/components/TransferFilterForm";
import { toast } from "sonner";
import { buyPlayer } from "@/api/player";
import TransferCard from "@/components/TransferCard";
import type { IPlayer } from "@/constants";
import { getMarketPlayers } from "@/api/team";
import { Button } from "@/components/ui/button";

export default function TransferMarket() {
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [filters, setFilters] = useState({
    playerName: "",
    teamName: "",
    maxPrice: "",
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getMarketPlayers(filters, page);
      setPlayers(res.players);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      toast.error("Failed to fetch transfers");
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (playerId: string) => {
    try {
      await buyPlayer(playerId);
      toast.success("Player bought!");
      fetchData();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Error while buying player");
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Transfer Market</h1>

      <TransferFilterForm
        filters={filters}
        setFilters={setFilters}
        onSubmit={() => {
          setPage(1);
          fetchData();
        }}
      />

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : players.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No players found
        </div>
      ) : (
        <div className="flex flex-col ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {players.map((player) => (
              <TransferCard
                key={player._id}
                teamName={player.teamId.teamName}
                {...player}
                onBuy={() => handleBuy(player._id)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
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
        </div>
      )}
    </div>
  );
}
