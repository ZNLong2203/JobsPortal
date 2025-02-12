import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="text-3xl font-bold text-primary">
      Jobs<span className="text-blue-600">Portal</span>
    </Link>
  )
}

