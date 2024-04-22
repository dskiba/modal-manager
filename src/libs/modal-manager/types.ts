import { FC } from 'react'

export type ModalId = string

export type Modal<T = FC<any>> = {
  id: string
  children: T
  status?: ModalStatus
  props?: PropsFrom<T>
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

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ModalRequest<T = FC<any>> = WithOptional<Modal<T>, 'id' | 'status' | 'props'>

export type PropsFrom<TComponent> = TComponent extends React.FC<infer Props>
  ? Props
  : TComponent extends React.Component<infer Props>
    ? Props
    : never
