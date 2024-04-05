'use client'
import { createModalManager } from 'libs/modal-manager'
import { ModalManagerProvider } from 'libs/modal-manager/react'
import {
  selectStoreField, selectTodo,
  todosStore,
  useSelectField, useSelector, useSelectTodosIds,
  useTodos,
  useTodosStore
} from 'libs/todos/todos'
import { FC, memo, useRef } from 'react'

const logs = 'logs'

export default function Home() {
  return (
    <div>
      {/*<ModalManagerProvider value={ModalManager}>*/}
      <main className="flex min-h-screen flex-col p-8 max-w-3xl mx-auto">
        <Todos />
        <button onClick={() => todosStore.addTodo()}>
          Add todo
        </button>
        <h1 className={'self-center font-bold mb-4'}>Modal-manager demo:</h1>
        <ul className={'mb-4 list-disc list-inside'}>
        </ul>
        <div>
          <span>Debug:</span>
          <br />
          <div>
            {logs}
          </div>
        </div>
      </main>
      {/*</ModalManagerProvider>*/}
    </div>
  )
}


const Todos = () => {
  const todos = useSelectTodosIds()
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map(todo => (
          <MemoTodo id={todo.id} key={todo.id} />
        ))}
      </ul>
      <button onClick={todosStore.addTodo}>Add todo</button>
    </div>
  )
}

setTimeout(() => {
  todosStore.addTodo()
  console.log({ todos: todosStore.getTodos() })
},2500)


const Todo: FC<{ id: number }> = ({ id }) => {
  // const todos = useTodos()
  const editTodo = useSelector(selectStoreField('editTodo'))
  const todo = useSelector(selectTodo(id))
  // const todo = todos.find(todo => todo.id === id)
  console.log('render:', id)
  if (!todo) return null
  return <div>
    <input
      className={'mb-2 text-gray-800'}
      value={todo.text}
      onChange={(e) => editTodo(todo.id, e.target.value)} />
    {/*<button onClick={() => removeTodo(todo.id)}>Remove</button>*/}
  </div>
}

const MemoTodo = memo(Todo)
