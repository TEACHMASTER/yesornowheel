import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'

export default function CatchAll({
  params: { locale }
}: {
  params: { locale: string }
}) {
  notFound();
} 