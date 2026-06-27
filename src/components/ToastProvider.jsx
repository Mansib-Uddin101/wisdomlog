'use client'; // This directive is required

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Global styling options can go here
        duration: 3000,
      }}
    />
  );
}
