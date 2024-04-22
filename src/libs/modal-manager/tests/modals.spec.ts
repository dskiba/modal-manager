import { beforeEach, describe, expect, it } from 'bun:test'
import { createModalManager } from '../modal-manager'
import { ModalStatus } from '../types'


let store: ReturnType<typeof createModalManager>
describe('modals stack', () => {
  beforeEach(() => {
    store = createModalManager()
  })
  it('should open modal', () => {
    // const store = createModalManager()
    store.actions.open({ id: '1' })
    expect(store.getState()).toEqual([{ id: '1', status: ModalStatus.OPENED }])
  })

  it('should open multiple modals', () => {
      store.actions.open({ id: '1' })
      store.actions.open({ id: '2' })
      expect(store.getState()).toEqual([
        { id: '1', status: ModalStatus.OPENED },
        { id: '2', status: ModalStatus.OPENED }
      ])
    }
  )

  it('should close modal', () => {
    store.actions.open({ id: '1' })
    store.actions.close('1')
    expect(store.getState()).toEqual([])
  })

  it('should close multiple modals', () => {
    store.actions.open({ id: '1' })
    store.actions.open({ id: '2' })
    store.actions.close('1')
    store.actions.close('2')
    expect(store.getState()).toEqual([])
  })

  it('should close all modals', () => {
    store.actions.open({ id: '1' })
    store.actions.open({ id: '2' })
    store.actions.closeAll()
    expect(store.getState()).toEqual([])
  })

  it('should init with modals', () => {
    store = createModalManager([{ id: '1', status: ModalStatus.OPENED }])
    expect(store.getState()).toEqual([{ id: '1', status: ModalStatus.OPENED }])
  })

  it('should open with additional options', () => {
    store.actions.open({ id: '1', options: { some: 1 }, status: ModalStatus.CLOSED })
    expect(store.getState()).toEqual([{ id: '1', status: ModalStatus.CLOSED, options: { some: 1 } }])
  })
})


