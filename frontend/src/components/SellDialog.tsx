import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const sellSchema = z.object({
  askingPrice: z.number().min(1_000_000, "Price must be above 1,000,000"),
});

type SellFormValues = z.infer<typeof sellSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (price: number) => Promise<void>;
}

const SellDialog = ({ open, onClose, onConfirm }: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<SellFormValues>({
    resolver: zodResolver(sellSchema),
    defaultValues: {
      askingPrice: 1_000_000,
    },
  });

  const handleSubmit = async (data: SellFormValues) => {
    setLoading(true);
    await onConfirm(data.askingPrice);
    setLoading(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Asking Price</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Input
            type="number"
            placeholder="Enter price"
            step={100_000}
            max={100_000_000}
            {...form.register("askingPrice", {
              valueAsNumber: true,
              required: true,
            })}
          />
          {form.formState.errors.askingPrice && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.askingPrice.message}
            </p>
          )}
          <Button type="submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SellDialog;
