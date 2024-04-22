'use client'
import { FC, useEffect, useState } from 'react'
import { useModal, useCreateModal, modals } from './modals'
import { ModalRequest } from 'libs/modal-manager/types'


let params: { id?: string } = {
  id: '47'
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
  const { open, close } = useCreateModal(SomeModalBody)
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
  const payload: ModalRequest<typeof SomeModalBody> = { children: SomeModalBody, props: { someId: '47' } }
  modals.open(payload)
}, 5000)

