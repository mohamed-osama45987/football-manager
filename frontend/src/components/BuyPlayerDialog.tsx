import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const BuyPlayerDialog = ({ open, onClose, player, onConfirm }: any) => {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    await onConfirm()
    setLoading(false)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buy Player</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to buy <strong>{player.name}</strong> from <strong>{player.teamName}</strong> for <strong>{(player.askingPrice * 0.95).toLocaleString()} EGP</strong>?</p>
        <Button onClick={handleConfirm} disabled={loading}>
          {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : null}
          Confirm
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default BuyPlayerDialog
