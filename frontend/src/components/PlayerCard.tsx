import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { IPlayer } from "@/constants";

interface Props extends IPlayer {
  action?: () => void;
  actionText?: string;
}

const PlayerCard = ({
  name,
  position,
  price,
  forSale,
  action,
  actionText = "Sell",
}: Props) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex gap-4 items-center">
        <Avatar>
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{name}</CardTitle>
          <p className="text-muted-foreground text-sm">{position}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-lg">💰 {price.toLocaleString()} EGP</p>
      </CardContent>
      <CardFooter>
        <Button onClick={action} variant={forSale ? "destructive" : "default"}>
          {actionText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlayerCard;
