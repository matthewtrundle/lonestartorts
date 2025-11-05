import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MapPin } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'My Addresses',
  description: 'Manage your shipping and billing addresses',
};

export default async function AddressesPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  // Get customer with addresses
  const customer = await prisma.customer.findUnique({
    where: { clerkUserId: user.id },
    include: {
      addresses: {
        orderBy: { isDefault: 'desc' },
      },
    },
  });

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

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-charcoal-950">My Addresses</h1>
          <button className="bg-sunset-500 text-cream-50 px-6 py-3 rounded-full font-semibold hover:bg-sunset-600 transition-colors">
            Add Address
          </button>
        </div>

        {!customer || customer.addresses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-charcoal-400" />
            <h2 className="text-2xl font-bold text-charcoal-950 mb-2">
              No addresses saved
            </h2>
            <p className="text-charcoal-600 mb-6">
              Add an address to make checkout faster!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {customer.addresses.map((address) => (
              <div
                key={address.id}
                className="bg-white rounded-lg shadow-md p-6 relative"
              >
                {address.isDefault && (
                  <span className="absolute top-4 right-4 bg-sunset-100 text-sunset-700 px-3 py-1 rounded-full text-xs font-semibold">
                    DEFAULT
                  </span>
                )}
                <div className="mb-4">
                  <p className="font-semibold text-charcoal-950">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-sm text-charcoal-700 mt-2">
                    {address.street}
                    {address.street2 && (
                      <>
                        <br />
                        {address.street2}
                      </>
                    )}
                  </p>
                  <p className="text-sm text-charcoal-700">
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p className="text-sm text-charcoal-700">{address.country}</p>
                  {address.phone && (
                    <p className="text-sm text-charcoal-700 mt-2">
                      {address.phone}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-sunset-600 hover:text-sunset-700 font-semibold">
                    Edit
                  </button>
                  {!address.isDefault && (
                    <button className="text-sm text-charcoal-600 hover:text-charcoal-700 font-semibold">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
