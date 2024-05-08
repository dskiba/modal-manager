'use client'
import {
  createModalManager,
  createUseModalHook,
  createUseStoreSelector,
  type ModalId,
  type ModalRequest, ModalStatus,
} from 'libs/modal-manager'
import { FC } from 'react'


type Options = { position: 'left' | 'right' | 'center', title?: string }

const store = createModalManager<Options>()

export const useModal = createUseModalHook<Options>(store.actions)

export const modals = store.actions


const useModalSelector = createUseStoreSelector(store)

export const useSelectModals = () => useModalSelector()
export const useSelectModalIds = () => useModalSelector((s) => s.map(m => m.id))

export const useSelectModal = (id: ModalId) => useModalSelector(s => s.find(m => m.id === id))

export const useIsModalOnTop = (id: ModalId) => useModalSelector(s => {
  let isOnTop = false
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i].id === id) {
      isOnTop = true
      break
    }
    if (s[i].status === ModalStatus.OPENED) {
      break
    }
  }
  return isOnTop
})

type CustomModalRequest<Comp = FC<any>> = ModalRequest<Options, Comp>

export type { ModalId, ModalRequest, CustomModalRequest }
