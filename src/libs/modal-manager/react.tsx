'use client'
import { createContext, FC, useContext, useSyncExternalStore } from 'react'
import { ModalManager } from './types'

type ModalManagerProps = {
  value: ModalManager
  children: React.ReactNode
}

const ModalManagerContext = createContext<ModalManager | null>(null)

export const ModalManagerProvider: FC<ModalManagerProps> = (props) => {
  const { value, children } = props
  // const {value: ModalManager} =props
  // const modals = useSyncExternalStore(ModalManager.open, ModalManager.stack)
  return (
    <ModalManagerContext.Provider value={value}>
      {children}
    </ModalManagerContext.Provider>
  )
}
