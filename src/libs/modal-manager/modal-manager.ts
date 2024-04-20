/*
Required:
[] - Controlled - need to pass isOpen, onClose prop (Modal Base)
[x] - Uncontrolled - no need to pass isOpen prop, but can get controlls
[x] - can be called in react and outside of framework e.g. be FrameworkAgnostic
[x] - Have Stack
[] - Render Stack and 1 overlay
[x] - Have binding with react (useSyncExternalStore)
[x] - nice api, like toasts
 */

import { Modal, ModalId, ModalRequest, ModalStack, ModalStatus, WithOptional } from './types'
import { createStore, createUseStoreSelector } from 'libs/store'
import { useCallback, useEffect, useMemo, useRef } from 'react'

const initialModalStack: ModalStack = []
// type Request = {
//   component: React.ComponentType
//   props: Record<string, unknown>
//   status: ModalStatus
//   id?: string
// }
const modalManagerStore = createStore(initialModalStack, {
  create: (modals, request: ModalRequest) => {
    const newModal: Modal = {
      id: request.id || generateId,
      status: request.status || ModalStatus.CLOSED,
      ...request
    }
    return [...modals, newModal]
  },
  open: (modals, id: ModalId) => {
    const idx = modals.findIndex(modal => modal.id === id)
    const modal = modals[idx]
    if (!modal || modal.status === ModalStatus.OPENED) {
      return modals
    }
    modal.status = ModalStatus.OPENED
    return [...modals]
  },
  close: (modals, id: ModalId) => {
    const idx = modals.findIndex(modal => modal.id === id)
    const modal = modals[idx]
    if (!modal || modal.status === ModalStatus.CLOSED || modal.status === ModalStatus.CLOSING) {
      return modals
    }
    modal.status = ModalStatus.CLOSED
    return [...modals]
  },
  closeAll: () => {
    return []
  },
  remove: (modals, id: ModalId) => {
    return modals.filter(modal => modal.id !== id)
  }
})

const useModalSelector = createUseStoreSelector(modalManagerStore)

export const modals = modalManagerStore.actions
export const useSelectModalIds = () => useModalSelector((s) => s.map(m => m.id))
export const useSelectModal = (id: ModalId) => useModalSelector(s => s.find(m => m.id === id))

export function generateId() {
  return Math.random().toString(36).substring(7)
}


export const useModal = (options: ModalRequest) => {
  const id = useRef<ModalId>(options.id || generateId()).current

  useEffect(() => {
    modals.create({ ...options, id: id })
    return () => {
      modals.remove(id)
    }
  }, [id, options])

  const open = useCallback(() => {
    modals.open(id)
  }, [id])

  const close = useCallback(() => {
    modals.close(id)
  }, [id])

  const modal = useSelectModal(id)

  return { open, close, modal }
}

