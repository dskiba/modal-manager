import { Actions, Listener, Reducers, Store } from './store-types'

export const createStore = <State, R extends Reducers<State>>(initialState: State, reducers: R): Store<State, R> => {
  let state: State = initialState

  const listeners = new Set<Listener>()
  const subscribe = (listener: Listener) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  const getState = () => state

  const setState = (fn: (currState: State) => State) => {
    state = fn(state)
    listeners.forEach(listener => listener())
  }

  const keys = Object.keys(reducers) as Array<keyof R>
  const actions = keys.reduce((acc, key) => {
    const k = key as keyof R
    const cb = reducers[k]
    acc[k] = (payload) => setState(s => cb(s, payload))

    return acc
  }, {} as Actions<State, R>)

  return { actions, getState, subscribe,  }
}





