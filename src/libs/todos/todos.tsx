'use client'
import { useCallback, useRef, useSyncExternalStore } from 'react'

let nextId = 0
let todos = [{ id: nextId++, text: 'Todo #1' },
  { id: nextId++, text: 'Todo #2' },
  { id: nextId++, text: 'Todo #3' },
  { id: nextId++, text: 'Todo #4' },
  { id: nextId++, text: 'Todo #5' },
]
type Listener = () => void;
let listeners: Array<Listener> = []

export const todosStore = {
  subscribe(listener: Listener) {
    listeners = [...listeners, listener]
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  },
  getTodos() {
    return todos
  },
  addTodo() {
    todos = [...todos, { id: nextId++, text: 'Todo #' + nextId }]
    emitChange()
  },
  removeTodo(id: number) {
    todos = todos.filter(todo => todo.id !== id)
    emitChange()
  },
  editTodo(id: number, text: string) {
    todos = todos.map(todo => todo.id === id ? { ...todo, text } : todo)
    emitChange()
  }
}

function emitChange() {
  for (let listener of listeners) {
    listener()
  }
}

export const useTodos = () => {
  return useSelector(s => s.getTodos())
}

export const selectStoreField =
  <Field extends keyof typeof todosStore>(field: Field) => (store: typeof todosStore) => {
    return store[field] as typeof todosStore[Field]
  }


export const useTodosStore = () => {
  return useSelector(s => s.getTodos())
}

export const selectTodo = (id: number) => (store: typeof todosStore) => {
  return store.getTodos().find(todo => todo.id === id)
}

export const useSelectTodos = ()  => {
  return useSelector(store => store.getTodos(), (prev, next) => prev.length === next.length)
}


export const useSelector = <Selected = unknown>(selector: (store: typeof todosStore) => Selected, compare?: (prev: Selected,  next: Selected)=> boolean ): Selected => {
  const prevValue = useRef(selector(todosStore))
  let cb = useCallback(() => {
    const currentValue = selector(todosStore)
    if(compare) {
      const isSame = compare(prevValue.current, currentValue)
      console.log({ isSame })
      if(!isSame) {
        prevValue.current = currentValue
      } else {
        return prevValue.current
      }
      return currentValue
    } else {
      if(prevValue.current !== currentValue) {
        prevValue.current = currentValue
      } else {
        return prevValue.current
      }
      return currentValue
    }
  }, [compare, selector])

  useSyncExternalStore(todosStore.subscribe, cb)
  return selector(todosStore)
}


// export function createModalManagerContext(context = ReactReduxContext) {
//   return function useReduxContext(): ReactReduxContextValue {
//     const contextValue = React.useContext(context)
//
//     if (process.env.NODE_ENV !== 'production' && !contextValue) {
//       throw new Error(
//         'could not find react-redux context value; please ensure the component is wrapped in a <Provider>',
//       )
//     }
//
//     return contextValue!
//   }
// }
