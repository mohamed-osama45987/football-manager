import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TransferCard({
  name,
  price,
  position,
  teamName,
  onBuy,
}: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {position} • {teamName}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">{price.toLocaleString()} EGP</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onBuy}>Buy</Button>
      </CardFooter>
    </Card>
  );
}
