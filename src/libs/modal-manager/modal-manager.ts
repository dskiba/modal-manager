/*
Required:
[] - Controlled - need to pass isOpen, onClose prop
[] - Uncontrolled - no need to pass isOpen prop
[] - can be called in react and outside of framework e.g. be FrameworkAgnostic
[] - Have Stack¥
[] - Render Stack and 1 overlay
[] - Have binding with react (useSyncExternalStore)
[] - nice api, like toasts (see ****)
 */

import {
  CreateModalManager,
  Modal,
  ModalId,
  ModalStack,
  Subscriber
} from 'libs/modal-manager/types'

export const createModalManager: CreateModalManager = () => {
  const subscribers: Array<Subscriber> = []
  let stack: ModalStack = []

  const emmit = () => {
    subscribers.forEach(subscriber => {
      subscriber()
    })
  }

  const open = (modal: Modal) => {
    stack = [...stack, modal]
    emmit()
  }

  const close = (id: ModalId) => {
    const index = stack.findIndex(modal => modal.id === id)
    if (index === -1) {
      return
    }
    stack.splice(index, 1)
    emmit()
  }


  return {stack, open, close}
}


