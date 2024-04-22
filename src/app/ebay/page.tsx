import React from 'react'
import { Metadata } from 'next'
import { EbayDemo } from './ebay-demo'
import Link from 'next/link'


export const metadata: Metadata = {
  title: 'Ebay demo',
}
export default function MantinePage() {
  return<main className="flex min-h-screen flex-col p-8 max-w-3xl mx-auto">
    <h1>Ebay page</h1>
    <Link href={'/'}>Home</Link>
    <br/>
    <EbayDemo />
  </main>
}
