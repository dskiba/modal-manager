import { Metadata } from 'next'
import { ModalDemoWithHookRules } from './demo'
import Link from 'next/link'
import React from 'react'
import { ModalsRenderer } from './demo'

export const metadata: Metadata = {
  title: 'Custom demo',
}
export default function CustomModalDemoPage() {
  return (
    <div>
      <main className="flex min-h-screen flex-col p-8 max-w-3xl mx-auto gap-4">
        <Link href={'/'}>Home</Link>
        <ModalDemoWithHookRules/>
        <h1 className={'self-center font-bold mb-4'}>Modal-manager demo:</h1>
        <ModalsRenderer />
      </main>
    </div>)
}
