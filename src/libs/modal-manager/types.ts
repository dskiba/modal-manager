import { FC } from 'react'

export type ModalId = string

export type Modal<Options = Record<string, any>, T = FC<any>> = {
  id: string
  children?: T
  status?: ModalStatus
  props?: PropsFrom<T>
  options?: Options
}

export type ModalStack<Options> = Array<Modal<Options>>

export const ModalStatus = {
  OPENED: 'OPENED',
  CLOSING: 'CLOSING',
  CLOSED: 'CLOSED',
} as const
export type ModalStatus = typeof ModalStatus[keyof typeof ModalStatus]

export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type ModalRequest<Options = Record<string, any>, T = FC<any>> = WithOptional<Modal<Options, T>, 'id' | 'status' | 'props' | 'children'>

export type PropsFrom<TComponent> = TComponent extends React.FC<infer Props>
  ? Props
  : TComponent extends React.Component<infer Props>
    ? Props
    : never
