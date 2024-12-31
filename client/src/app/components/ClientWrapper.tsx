"use client";

import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from '@/redux/store';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster />
    </Provider>
  );
}
