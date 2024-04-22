'use client'
import {
  createModalManager,
  createUseModalHook,
  createUseStoreSelector,
  type ModalId,
  type ModalRequest,
} from 'libs/modal-manager'
import { FC } from 'react'


type Options = { position: 'left' | 'right' | 'center', title?: string }

const store = createModalManager<Options>()
export const modals = store.actions

export const useCreateModal = createUseModalHook<Options>(modals)

const useModalSelector = createUseStoreSelector(store)
export const useSelectModalIds = () => useModalSelector((s) => s.map(m => m.id))
export const useSelectModal = (id: ModalId) => useModalSelector(s => s.find(m => m.id === id))

type CustomModalRequest<Comp = FC<any>> = ModalRequest<Options, Comp>

export type { ModalId, ModalRequest, CustomModalRequest }
