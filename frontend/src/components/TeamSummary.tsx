interface Props {
  budget: number;
  teamValue: number;
  playerCount: number;
}

const TeamSummary = ({ budget, teamValue, playerCount }: Props) => (
  <div className="grid md:grid-cols-3 gap-4 text-center">
    <div className="bg-muted rounded-md p-4">
      <p className="text-sm text-muted-foreground">Team Value</p>
      <p className="text-xl font-bold">{teamValue.toLocaleString()} EGP</p>
    </div>
    <div className="bg-muted rounded-md p-4">
      <p className="text-sm text-muted-foreground">Budget</p>
      <p className="text-xl font-bold">{budget.toLocaleString()} EGP</p>
    </div>
    <div className="bg-muted rounded-md p-4">
      <p className="text-sm text-muted-foreground">Players</p>
      <p className="text-xl font-bold">{playerCount}</p>
    </div>
  </div>
);

export default TeamSummary;
