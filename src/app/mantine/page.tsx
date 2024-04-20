import React from 'react'
import { Metadata } from 'next'
import { MantineDemo } from './mantine-demo'
import Link from 'next/link'


export const metadata: Metadata = {
  title: 'Mantine demo',
}
export default function MantinePage() {
  return<main className="flex min-h-screen flex-col p-8 max-w-3xl mx-auto">
    <h1>Mantine page</h1>
    <Link href={'/'}>Home</Link>
    <br/>
    <MantineDemo />
  </main>
}
