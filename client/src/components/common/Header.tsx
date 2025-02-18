'use client'

import Link from 'next/link'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'; 
import { Button } from "@/components/ui/button"
import { UserMenu } from './UserMenu'
import { logoutApi } from '@/redux/api/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slice/authSlice';

export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">JobsPortal</Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/jobs" className="text-gray-700 hover:text-blue-600">Job Search</Link>
            <Link href="/companies" className="text-gray-700 hover:text-blue-600">Companies</Link>
            <Link href="/register-company" className="text-gray-700 hover:text-blue-600">Employer Registration</Link>
            {/* <Link href="/career-advice" className="text-gray-700 hover:text-blue-600">Career Advice</Link> */}
          </nav>
          <div className="flex items-center space-x-4">
            {userInfo && userInfo.role === 'admin' && (
              <Link href="/admin">
                <Button variant="outline">Admin</Button>
              </Link>
            )}
            {userInfo && userInfo.role === 'hr' && (
              <Link href="/hr">
                <Button variant="outline">HR</Button>
              </Link>
            )}
            {userInfo && userInfo.role === 'company-admin' && (
              <Link href="/company-admin">
                <Button variant="outline">Company Admin</Button>
              </Link>
            )}
            {isAuthenticated && userInfo ? (
              <UserMenu user={userInfo} onLogout={handleLogout} />
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

