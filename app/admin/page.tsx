'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Admin homepage - redirects to dashboard
 */
export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/dashboard');
  }, [router]);

  return null;
}