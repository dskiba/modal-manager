import { Store } from 'libs/store/store-types'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'

export const createStoreSelector = <S = unknown>(store: Store<S, any>) => {
  return <Selected = S>(
    selector: (state: S) => Selected = s => s as unknown as Selected,
    isEqual?: (prev: Selected, next: Selected) => boolean
  ) => {
    return useSyncExternalStoreWithSelector(
      store.subscribe,
      store.getState,
      store.getState,
      selector,
      isEqual)
  }
}

