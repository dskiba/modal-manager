'use client'
import { useEffect, useState } from 'react'
import { modals } from '@mantine/modals'


export const MantineDemo = () => {
  return (
    <div>
      <MantineUncontrolled />
    </div>
  )
}


const MantineUncontrolled = () => {
  const [timer, setTimer] = useState(0)
  useEffect(
    () => {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
      return () => clearInterval(interval)
    },
    []
  )

  const openModal = () => modals.open({
    title: 'Mantine uncontrolled with timer',
    children: (
      <div>
        Timer synced only when open
        <br />
        timer: {timer}
        <br />
        <button
          className={'bg-pink-300 text-gray-900 p-2 rounded w-fit'}
          onClick={() => modals.openConfirmModal({
            title: 'This is modal at second layer',
            labels: { confirm: 'Close modal', cancel: 'Back' },
            closeOnConfirm: false,
            children: (
              <span>
        When this modal is closed modals state will revert to first modal
      </span>
            ),
            onConfirm: modals.closeAll,
          })}>Open confirm modal
        </button>
      </div>
    ),
  })

  return <div>
    <h3>timer: {timer}</h3>
    <button
    className={'bg-pink-300 text-gray-900 p-2 rounded w-fit'}
    onClick={openModal}
  >
    Open confirm modal
  </button>
  </div>
}
