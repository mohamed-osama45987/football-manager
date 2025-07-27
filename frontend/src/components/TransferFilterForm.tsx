import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransferFilterForm({
  filters,
  setFilters,
  onSubmit,
}: any) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="grid md:grid-cols-4 gap-2 items-end"
    >
      <Input
        placeholder="Player name"
        value={filters.playerName}
        onChange={(e) => setFilters({ ...filters, playerName: e.target.value })}
      />
      <Input
        placeholder="Team name"
        value={filters.teamName}
        onChange={(e) => setFilters({ ...filters, teamName: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Max price"
        value={filters.maxPrice}
        min={0}
        step={100_000}
        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
      />
      <Button type="submit" className="max-w-1/2">
        Apply Filters
      </Button>
    </form>
  );
}
