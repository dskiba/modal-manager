import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle, DialogOverlay
} from 'components/dialog'
import { FC, ReactNode } from 'react'
import { cn } from 'utils/utils'
import { Overlay } from 'app/custom/demo'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  isOnTop?: boolean
}
export const ModalRaw: FC<ModalProps> = (props) => {
  const { isOpen, onClose, children, isOnTop = true } = props
  return <Dialog open={isOpen} onOpenChange={(state) => {!state && onClose()}}>

    {/*<DialogOverlay style={{*/}
    {/*  backgroundColor: 'rgba(0, 0, 0, 0.3)',*/}
    {/*  mixBlendMode: 'screen'*/}
    {/*}} />*/}

    <DialogContent className={'outline-0 text-gray-800'} style={{border: 'none'}}>
      <div className={cn(isOnTop && 'hidden',
        !isOnTop && 'visible absolute top-0 left-0 right-0 bottom-0 pointer-events-none bg-opacity-30 bg-gray-900',
        'z-60 w-full duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:rounded-lg'
      )} />
      <DialogHeader>
        <DialogTitle>Custom radix title</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
}
