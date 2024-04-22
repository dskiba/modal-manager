import { Modal, ModalId, ModalRequest, ModalStack, ModalStatus } from './types'
import { createStore } from 'libs/store'
import { generateId } from './utils'

export const createModalManager = (initStack: ModalStack = []) => createStore(initStack, {
  open: (modals, modal: ModalRequest) => {
    const idx = modals.findIndex(m => m.id === modal.id)
    const modalFromStack = modals[idx]
    if (!modalFromStack) {
      const id = modal.id || generateId()
      const newModal: Modal = {
        id,
        status: ModalStatus.OPENED,
        ...modal,
      }
      return [...modals, newModal]
    }
    if (modalFromStack.status === ModalStatus.OPENED) {
      return modals
    }
    modalFromStack.status = ModalStatus.OPENED
    if (modal.props) modalFromStack.props = modal.props
    return [...modals]
  },

  close: (modals, id: ModalId) => {
    const idx = modals.findIndex(modal => modal.id === id)
    if (idx === -1) return modals
    modals.splice(idx, 1)
    return [...modals]
  },

  closeAll: () => {
    return []
  },

  remove: (modals, id: ModalId) => {
    return modals.filter(modal => modal.id !== id)
  }
})
