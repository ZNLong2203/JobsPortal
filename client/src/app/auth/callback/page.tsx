'use client';

import { useEffect, Suspense, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slice/authSlice';
import { LoadingSpinner } from '@/components/common/IsLoading';
import toast from 'react-hot-toast';

function AuthCallbackContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const provider = searchParams.get('provider');
  const encodedData = searchParams.get('data');
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (encodedData && !hasProcessed.current) {
      hasProcessed.current = true;
      try {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        dispatch(
          login({
            userInfo: decodedData.userInfo,
            token: decodedData.access_token,
          })
        );
        router.push('/');
        toast.success(`Login with ${provider} successful`);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(`Login failed: ${errorMessage}`);
        router.push('/auth/login');
      }
    }
  }, [encodedData, dispatch, router, provider]);

  return <LoadingSpinner />;
}

export default function AuthCallback() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthCallbackContent />
    </Suspense>
  );
}
