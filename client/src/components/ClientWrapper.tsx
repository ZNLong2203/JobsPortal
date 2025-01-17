"use client";

import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store, initializeAuth } from '@/redux/store';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
}
