'use client'
import { todoActions, useSelectTodo, useSelectTodosIds, } from 'libs/todos/todos'
import { FC, memo } from 'react'

const logs = 'logs'

export default function Home() {
  return (
    <div>
      <main className="flex min-h-screen flex-col p-8 max-w-3xl mx-auto">
        <Todos />
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
    </div>
  )
}


const Todos = () => {
  const todos = useSelectTodosIds()
  console.log({ todos })
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map(id => (
          <MemoTodo id={id} key={id} />
        ))}
      </ul>
      <button onClick={() => todoActions.addTodo()}>
        Add todo
      </button>
    </div>
  )
}

setTimeout(() => {
  todoActions.addTodo()
}, 2000)

const Todo: FC<{ id: number }> = ({ id }) => {
  const todo = useSelectTodo(id)
  console.log('render-id:', id)
  if (!todo) return null
  return <div>
    <input
      className={'mb-2 text-gray-800'}
      value={todo.text}
      onChange={(e) => todoActions.edit({id: id, text: e.target.value})} />
  </div>
}

const MemoTodo = memo(Todo)
