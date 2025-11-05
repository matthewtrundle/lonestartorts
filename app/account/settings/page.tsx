import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { UserProfile } from '@clerk/nextjs';

export const metadata = {
  title: 'Account Settings',
  description: 'Manage your account settings',
};

export default async function SettingsPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50 pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sunset-600 hover:text-sunset-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Account
        </Link>

        <h1 className="text-4xl font-bold text-charcoal-950 mb-8">
          Account Settings
        </h1>

        <UserProfile
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'shadow-md',
            },
          }}
        />
      </div>
    </div>
  );
}
