import { notFound, redirect } from 'next/navigation'

export default function NotFound() {
  redirect('/404')  
}