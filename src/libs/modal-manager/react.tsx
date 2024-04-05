'use client'
import { createContext, FC, useContext, useSyncExternalStore } from 'react'
import { ModalManager } from './types'

type ModalManagerProps = {
  value: ModalManager
  children: React.ReactNode
}

const ModalManagerContext = createContext<ModalManager | null>(null)

// const getStore = () => {
//   const modals: any[] = []
//   const subscribers: any[] = []
//   return {
//     subscribe: (subscriber: any) => {
//       // subscribers.push(subscriber)
//       subscriber = [...subscribers, subscriber]
//       return () => {
//         subscriber = subscriber.filter(s => s !== subscriber);
//       }
//     },
//     getSnapshot: () => modals,
//   }
// }

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

const useSelector = () => {

}

// export const useModalManager = (): ModalManager => {
//   const context = useContext(ModalManagerContext)
//   if (!context) {
//     throw new Error('useModalManager must be used within a ModalManagerProvider')
//   }
//   return context
// }
