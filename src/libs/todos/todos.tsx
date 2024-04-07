'use client'
import { createStore, createStoreSelector } from 'libs/store'


let nextId = 0

type Todo = { id: number, text: string };

let todos: Array<Todo> = [{ id: nextId++, text: 'Todo #1' },
  { id: nextId++, text: 'Todo #2' },
  { id: nextId++, text: 'Todo #3' },
  { id: nextId++, text: 'Todo #4' },
  { id: nextId++, text: 'Todo #5' },
]


const todosStore = createStore(todos, {
  addTodo: (state) => {
    return [...state, { id: nextId++, text: 'Todo #' + nextId }]
  },
  edit: (state: Todo[], payload: { id: number, text: string }) => {
    return state.map(todo => todo.id === payload.id ? { ...todo, text: payload.text } : todo)
  },
})


const useTodosSelector = createStoreSelector(todosStore)
export const todoActions = todosStore.actions

export const useSelectTodosIds = () => useTodosSelector((state) => state.map(t => t.id), (prev, next) => prev.length === next.length)
export const useSelectTodo = (id: number) => useTodosSelector(state => state.find(todo => todo.id === id))


