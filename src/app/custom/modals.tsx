'use client'
import { ModalId } from 'libs/modal-manager/types'
import { createUseStoreSelector } from 'libs/store'
import { createModalManager, createUseModalHook } from 'libs/modal-manager'

type Options = { position: 'left' | 'right' | 'center', title?: string }

const store = createModalManager()
export const modals = store.actions

export const useCreateModal = createUseModalHook(modals)

const useModalSelector = createUseStoreSelector(store)
export const useSelectModalIds = () => useModalSelector((s) => s.map(m => m.id))
export const useSelectModal = (id: ModalId) => useModalSelector(s => s.find(m => m.id === id))


