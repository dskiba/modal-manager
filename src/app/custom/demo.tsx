'use client'
import { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
  CustomModalRequest,
  modals, useIsModalOnTop,
  useModal,
  useSelectModal,
  useSelectModalIds, useSelectModals
} from './modals'
import { ModalId } from './modals'
import { ModalRaw } from 'components/modal'
import { Modal, ModalStatus } from 'libs/modal-manager'


let params: { id?: string } = {
  id: '47'
}

type Context = {
  id: ModalId
  isOpen: boolean
  onClose: () => void
}

const ModalContext = createContext<Context | null>(null)

export const useModalCtx = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used inside ModalContext.Provider')
  return context
}


export const ModalsRenderer: FC = () => {
  const modalIds = useSelectModalIds()
  return <>
    <Overlay />
    {modalIds.map((id) => (
      <>
        <ModalRenderer key={id} id={id} />
      </>
    ))}
  </>
}

export const Overlay: FC = () => {
  const modals = useSelectModals()
  const hasModalToRender = modals.some(modal => modal.status !== ModalStatus.CLOSED)

  if (!hasModalToRender) return null

  return (
    <div
      id={'modal-overlay'}
      className={'fixed top-0 left-0 right-0 bottom-0 pointer-events-none'}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      }}
    />
  )
}


const ModalRenderer: FC<{ id: ModalId }> = ({ id }) => {
  const modal = useSelectModal(id)
  const isOnTop = useIsModalOnTop(id)
  const isOpen = modal?.status === ModalStatus.OPENED
  const onClose = useCallback(() => modals.close(id), [id])
  const contextValue = useMemo(() => ({ id, isOpen, onClose }), [id, isOpen, onClose])
  if (!modal) return null
  const Component = modal.children

  const ModalComp = modal.options?.position === 'left' ? ModalRaw : ModalRaw

  return <ModalContext.Provider value={contextValue}>
    <ModalComp isOpen={isOpen} onClose={onClose} isOnTop={isOnTop}>
      {Component && <Component {...modal.props} />}
    </ModalComp>
  </ModalContext.Provider>
}


const SomeModalBody: FC<{ someId: string, timerValue?: number }> = (props) => {
  const { onClose, id } = useModalCtx()
  // const close = modals.close(id)
  return (<div className={'text-gray-800'}>
      <h3>someId: {props.someId}</h3>
      <br />
      <h4>timer: {props.timerValue}</h4>
      <div className={'flex flex-col gap-2'}>
        <button
          className={'bg-pink-300 text-gray-900 p-2 rounded'}
          onClick={() => modals.open({
            children: () => <div className={'flex flex-col gap-2'}>
              <div>
                hello another world, {props.someId}</div>
              <button
                className={'bg-pink-300 text-gray-900 p-2 rounded'}
                onClick={() => modals.remove(id)}>
                close outer modal
              </button>
            </div>
          })}>
          open another modal
        </button>
        <button
          className={'bg-pink-300 text-gray-900 p-2 rounded'}
          onClick={onClose}
        >
          close
        </button>
      </div>
    </div>
  )
}


export const ModalDemoWithHookRules = () => {
  const [isControlledModalOpen, setIsControlledModalOpen] = useState(false)
  const [timerValue, setTimerValue] = useState(0)

  const { open, close } = useModal(SomeModalBody, {
    props: { someId: '47', timerValue: timerValue },
    options: { position: 'left' },
    id: '10'
  })

  const { open: openSecond } = useModal(SomeModalBody, {
    options: { position: 'left' },
    id: '20'
  })

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
      <button onClick={() => open()}
              className={'bg-pink-300 text-gray-900 p-2 rounded'}>
        Open modal 1
      </button>
      <button onClick={() => openSecond({ someId: paramId, timerValue })}
              className={'bg-pink-300 text-gray-900 p-2 rounded'}>
        Open modal 2
      </button>
      <button onClick={() => modals.open({ children: () => <div>hello world, {timerValue}</div> })}
              className={'bg-pink-300 text-gray-900 p-2 rounded'}>
        Open modal with hook rules
      </button>

      <button onClick={() => setIsControlledModalOpen(true)}
              className={'bg-pink-300 text-gray-900 p-2 rounded'}>
        Open controlled modal
      </button>

      <ModalRaw isOpen={isControlledModalOpen} onClose={() => setIsControlledModalOpen(false)}>
        <div>
          controlled modal
          <div>
            timer: {timerValue}
          </div>
        </div>
      </ModalRaw>

    </div>
  )
}

// setTimeout(() => {
//   const payload: CustomModalRequest<typeof SomeModalBody> = {
//     children: SomeModalBody,
//     id: '33',
//     props: { someId: '13' },
//     // options: { position: 'left' }
//   }
//   modals.open(payload)
// }, 5000)
