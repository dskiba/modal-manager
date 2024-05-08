import { Modal, ModalId, ModalRequest, ModalStack } from './types'
import { createStore } from 'libs/store'
import { generateId } from './utils'


export const createModalManager = <Options = Record<string, any>>(initStack: ModalStack<Options> = []) => createStore(initStack, {
  open: (modals, modal: ModalRequest<Options>) => {
    const idx = modals.findIndex(m => m.id === modal.id)
    const modalFromStack = modals[idx]
    if (!modalFromStack) {
      const id = modal.id || generateId()
      const newModal: Modal<Options> = {
        id,
        status: 'OPENED',
        ...modal,
      }
      return [...modals, newModal]
    }
    if (modalFromStack.status === 'OPENED') {
      return modals
    }
    modalFromStack.status = 'OPENED'
    if (modal.props) modalFromStack.props = modal.props
    return [...modals]
  },

  close: (modals, id: ModalId) => {
    const idx = modals.findIndex(modal => modal.id === id)
    modals[idx].status = 'CLOSED'
    // if (idx === -1) return modals
    // modals.splice(idx, 1)
    return [...modals]
  },

  closeAll: () => {
    return []
  },

  remove: (modals, id: ModalId) => {
    return modals.filter(modal => modal.id !== id)
  }
})
