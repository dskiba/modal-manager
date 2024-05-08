import { Store } from './types'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'

export const createUseStoreSelector = <S = unknown>(store: Store<S, any>) => {
  return <Selected = S>(
    selector: (state: S) => Selected = s => s as unknown as Selected,
    isEqual: (prev: Selected, next: Selected) => boolean = (a, b) => a === b
  ) => {
    return useSyncExternalStoreWithSelector(
      store.subscribe,
      store.getState,
      store.getState,
      selector,
      isEqual
    )
  }
}

