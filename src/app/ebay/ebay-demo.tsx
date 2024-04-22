'use client'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { ModalRaw } from 'components/modal'


export const EbayDemo = () => {
  return (
    <div>
      {/*<MantineControlled />*/}
      <EbayUncontrolled />
    </div>
  )
}

const InnerModal = NiceModal.create(({ name }: { name: string }) => {
  const modal = useModal()

  return (
    <ModalRaw
      isOpen={modal.visible}
      onClose={modal.remove}
    >
      Inner Modal {name}!
    </ModalRaw>
  )
})

const RegisteredModal = NiceModal.create(({ name }: { name: string }) => {
  // Use a hook to manage the modal state
  const modal = useModal()
  const showModal = () => {
    NiceModal.show(InnerModal, { name: 'Inner' })
  }
  return (
    <ModalRaw
      isOpen={modal.visible}
      onClose={() => modal.remove()}
    >
      Hello {name}!
      <button className={'bg-pink-300 text-gray-900 p-2 rounded'} onClick={showModal}>
        Show inner modal
      </button>
    </ModalRaw>
  )
})

const EbayUncontrolled = () => {
  const showModal = () => {
    NiceModal.show(RegisteredModal, { name: 'Nate' })
  }
  return (
    <div>
      <button onClick={showModal}>
        Show modal
      </button>
    </div>
  )
}

export const EbayProvider = ({ children }: {
  children: React.ReactNode
}) => {
  return <NiceModal.Provider>
    {children}
  </NiceModal.Provider>
}

