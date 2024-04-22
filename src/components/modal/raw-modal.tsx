import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from 'components/dialog'
import { FC, ReactNode } from 'react'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}
export const ModalRaw: FC<ModalProps> = (props) => {
  console.log({ props })
  const { isOpen, onClose, children } = props
  return <Dialog open={isOpen} onOpenChange={(state) => {
    if (!state) onClose()
  }}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
}
