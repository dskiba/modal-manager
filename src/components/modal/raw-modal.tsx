import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from 'components/dialog'
import { useSelectModal } from 'libs/modal-manager'
import { ModalId } from 'libs/modal-manager/types'
import { FC } from 'react'

export const ModalRaw: FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  return <Dialog open={isOpen} onOpenChange={(state) => {
    if (!state) onClose()
  }}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
}
