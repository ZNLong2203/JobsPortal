import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-blue-600">Browse Jobs</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-blue-600">Career Advice</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-blue-600">Resume Help</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-blue-600">Post a Job</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-blue-600">Pricing</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-blue-600">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-blue-600">Contact</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500">&copy; 2025 JobsPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

