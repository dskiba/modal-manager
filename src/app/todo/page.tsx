import { Todos } from 'app/todo/todo'
import Link from 'next/link'

export default function TodoPage() {
  return <main className="flex min-h-screen flex-col p-8 max-w-3xl mx-auto gap-4">
    <Link href="/">Back to Home</Link>
    <Todos />
  </main>
}

