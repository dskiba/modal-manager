'use client'
import { todoActions, useSelectTodo, useSelectTodosIds } from 'libs/todos/todos'
import { FC, memo } from 'react'

const Todo: FC<{ id: number }> = ({ id }) => {
  const todo = useSelectTodo(id)
  console.log('render-id:', id)
  if (!todo) return null
  return <div>
    <input
      className={'mb-2 bg-white text-gray-900'}
      value={todo.text}
      onChange={(e) => todoActions.edit({ id: id, text: e.target.value })} />
  </div>
}


export const Todos = () => {
  const todosIds = useSelectTodosIds()
  console.log({ todosIds })
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todosIds.map(id => (
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
},3000)

const MemoTodo = memo(Todo)
