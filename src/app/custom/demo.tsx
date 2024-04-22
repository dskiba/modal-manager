'use client'
import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  CustomModalRequest,
  modals,
  useCreateModal,
  useSelectModal,
  useSelectModalIds
} from './modals'
import { ModalId, ModalStatus } from 'libs/modal-manager/types'
import { ModalRaw } from 'components/modal'


let params: { id?: string } = {
  id: '47'
}

type Context = {
  id: ModalId
  isOpen: boolean
  onClose: () => void
}
const ModalContext = createContext<Context | null>(null)
export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used inside ModalContext.Provider')
  return context
}


export const ModalsRenderer: FC = () => {
  const modalIds = useSelectModalIds()
  return <>
    {modalIds.map(id => (
      <ModalRenderer key={id} id={id} />
    ))}
  </>
}

const ModalRenderer: FC<{ id: ModalId }> = ({ id }) => {
  const modal = useSelectModal(id)
  console.log({ modal })
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


const SomeModalBody: FC<{ someId: string, timerValue?: number }> = (props) => {
  const { onClose } = useModal()
  return (<div className={'text-gray-700'}>
    <h3>someId: {props.someId}</h3>
    <br />
    <h4>some timer {props.timerValue}</h4>
    <button
      className={'bg-pink-300 text-gray-900 p-2 rounded'}
      onClick={onClose}
    >
      close
    </button>
  </div>)
}

export const ModalDemoWithHookRules = () => {
  const { open, close } = useCreateModal(SomeModalBody, { options: { position: 'left' } })
  const [timerValue, setTimerValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimerValue(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const paramId = params.id
  if (!paramId) return null
  return (
    <div className={'flex flex-col gap-2 max-w-36'}>
      <button onClick={() => open({ someId: paramId, timerValue })}
              className={'bg-pink-300 text-gray-900 p-2 rounded'}>
        Open modal with hook rules
      </button>
      <button onClick={close} className={'bg-pink-300 text-gray-900 p-2 rounded'}>
        Close modal
      </button>
    </div>
  )
}

setTimeout(() => {
  const payload: CustomModalRequest<typeof SomeModalBody> = { children: SomeModalBody, props: { someId: '13' }, options: { position: 'left' } }
  modals.open(payload)
}, 5000)

