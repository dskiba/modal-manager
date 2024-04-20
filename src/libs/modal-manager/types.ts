import { ReactNode } from 'react'

export type ModalId = string

export type Modal = {
  id: string
  status?: ModalStatus
  children: ReactNode
  props: Record<string, any>
}

export type ModalStack = Array<Modal>


export enum ModalStatus {
  /** Modal initiated and rendered. */
  OPENED = 'OPENED',
  /** Modal received call to close. */
  CLOSING = 'CLOSING',
  /** Modal closed and component removed from DOM.*/
  CLOSED = 'CLOSED',
}

export type ModalManager = {
  stack: ModalStack
  open: (modal: Modal) => void
  close: (id: ModalId) => void
}

export type CreateModalManager = () => ModalManager

export type Subscriber = () => void

export type UncontrolledModalRequested = Partial<Omit<Modal, 'id'>>

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ModalRequest = WithOptional<Modal, 'id' | 'status'>
