'use client'
import { createContext, FC, useCallback, useContext, useMemo } from 'react'
import { ModalId, ModalStatus } from 'libs/modal-manager/types'
import { ModalRaw } from 'components/modal'
import { createUseStoreSelector } from 'libs/store'
import { createModalManager, createUseModalHook } from 'libs/modal-manager'

const store = createModalManager()

export const useCreateModal = createUseModalHook(store.actions)
export const modals = store.actions
const useModalSelector = createUseStoreSelector(store)
export const useSelectModalIds = () => useModalSelector((s) => s.map(m => m.id))
export const useSelectModal = (id: ModalId) => useModalSelector(s => s.find(m => m.id === id))

export const ModalsRenderer: FC = () => {
  const modalIds = useSelectModalIds()
  return <>
    {modalIds.map(id => (
      <ModalRenderer key={id} id={id} />
    ))}
  </>
}

type Context = {
  id: ModalId
  isOpen: boolean
  onClose: () => void
}
const ModalContext = createContext<Context | null>(null)

const ModalRenderer: FC<{ id: ModalId }> = ({ id }) => {
  const modal = useSelectModal(id)
  const isOpen = modal?.status === ModalStatus.OPENED
  const onClose = useCallback(() => modals.close(id), [id])
  const contextValue = useMemo(() => ({ id, isOpen, onClose }), [id, isOpen, onClose])
  if (!modal) return null
  const Component = modal.children
  return <ModalContext.Provider value={contextValue}>
    <ModalRaw isOpen={isOpen} onClose={onClose}>
      <Component {...modal.props} />
    </ModalRaw>
  </ModalContext.Provider>
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used inside ModalContext.Provider')
  return context
}


