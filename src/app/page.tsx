import Link from 'next/link'


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8 max-w-3xl mx-auto gap-4">
        <li>
          <Link href="/todo">Todos</Link>
        </li>
        <li>
          <Link href="/mantine">Mantine</Link>
        </li>
        <li>
          <Link href="/custom">Custom</Link>
        </li>
    </main>)
}

