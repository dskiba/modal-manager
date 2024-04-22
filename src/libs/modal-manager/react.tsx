'use client'
import { FC, useCallback, useEffect, useRef } from 'react'
import { Modal, ModalId, ModalStatus, PropsFrom } from './types'
import { createModalManager } from './modal-manager'
import { generateId } from './utils'

export const createUseModalHook = (modals: ReturnType<typeof createModalManager>['actions']) => <T extends FC<any>>(children: T, options?: Partial<Omit<Modal, 'children'>>) => {
  const id = useRef<ModalId>(options?.id || generateId()).current

  // ref for options to avoid re-render or rule-of-hooks
  const optionsRef = useRef(options)

  useEffect(() => {
    // if default status open, open it
    if(optionsRef.current?.status === ModalStatus.OPENED) {
      modals.open({ id, children, status: ModalStatus.CLOSED, ...optionsRef.current })
    }
    return () => {
      modals.remove(id)
    }
  }, [children, id])

  const close = useCallback(() => {
    modals.close(id)
  }, [id])

  const open = useCallback((props: PropsFrom<T>) => {
    modals.open({ id, children, ...optionsRef.current, props })
  }, [children, id])

  return { open, close, id }
}

