// frontend/app/layout.tsx
import { ReactNode } from 'react';
import './globals.css';  

export const metadata = {
  title: 'YouTube Intro Generator',
  description: 'Generate catchy intros for your YouTube videos.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
