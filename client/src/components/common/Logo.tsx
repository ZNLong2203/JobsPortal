import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="text-3xl font-bold text-primary">
      Find<span className="text-blue-600">Jobs</span>
    </Link>
  )
}

