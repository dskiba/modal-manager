import { useState } from 'react'

export default function CustonModalDemoPage() {
  const [mounted, setMounted] = useState(false)
  return (
    <div>
      <main className="flex min-h-screen flex-col p-8 max-w-3xl mx-auto">

        {/*<Todos />*/}
        {mounted && <ModalDemo />}
        <button onClick={() => setMounted(m => !m)}>Toggle Mount</button>

        <h1 className={'self-center font-bold mb-4'}>Modal-manager demo:</h1>
        <ModalsRenderer />
      </main>
    </div>)
}
