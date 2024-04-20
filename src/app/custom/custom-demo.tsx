import { FC, memo } from 'react'
import { useModal, useSelectModal, useSelectModalIds } from 'libs/modal-manager'
import { ModalId } from 'libs/modal-manager/types'
import { ModalRaw } from 'components/modal'

const ModalsRenderer: FC = () => {
  const modalIds = useSelectModalIds()
  console.log({ modalIds })
  return <>
    {modalIds.map(id => (
        <ModalRenderer key={id} id={id} />
))}
  </>
}

const ModalRenderer: FC<{ id: ModalId }> = ({ id }) => {
  const modal = useSelectModal(id)
  console.log('render-modal-id:', modal, id)
  if (!modal) return null
  const Component = modal.children
  return <Component {...modal.props} />
}


const MemoTodo = memo(Todo)




const ModalDemo = () => {
  const { open, close, modal } = useModal({
    children: ModalRaw,
  })
  return (
    <div className={'flex flex-col gap-2 max-w-36'}>
    <button onClick={open} className={'bg-pink-300 text-gray-900 p-2 rounded'}>
    Open modal
  </button>
  <button onClick={close} className={'bg-pink-300 text-gray-900 p-2 rounded'}>
    Close modal
  </button>
  </div>
)
}
