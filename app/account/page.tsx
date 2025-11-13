import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, MapPin, User, Package } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'My Account',
  description: 'Manage your orders, addresses, and account settings',
};

export default async function AccountPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  // Get customer data
  const customer = await prisma.customer.findUnique({
    where: { clerkUserId: user.id },
    include: {
      Order: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
      Address: {
        where: { isDefault: true },
        take: 1,
      },
    },
  });

  const orderCount = await prisma.order.count({
    where: { customerId: customer?.id },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50 pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-charcoal-950 mb-2">
            Welcome back, {user.firstName || 'there'}!
          </h1>
          <p className="text-charcoal-700">
            Manage your orders, addresses, and account settings
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Orders Summary */}
          <Link
            href="/account/orders"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-sunset-100 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-sunset-600" />
              </div>
              <span className="text-3xl font-bold text-charcoal-950">
                {orderCount}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-charcoal-950 mb-1">
              My Orders
            </h2>
            <p className="text-sm text-charcoal-600">
              View your order history and track shipments
            </p>
          </Link>

          {/* Addresses */}
          <Link
            href="/account/addresses"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-masa-100 rounded-lg">
                <MapPin className="w-6 h-6 text-masa-600" />
              </div>
              <span className="text-3xl font-bold text-charcoal-950">
                {customer?.Address.length || 0}
              </span>
            </div>
            <h2 className="text-lg font-semibold text-charcoal-950 mb-1">
              Addresses
            </h2>
            <p className="text-sm text-charcoal-600">
              Manage your shipping and billing addresses
            </p>
          </Link>

          {/* Account Settings */}
          <Link
            href="/account/settings"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-rust-100 rounded-lg">
                <User className="w-6 h-6 text-rust-600" />
              </div>
            </div>
            <h2 className="text-lg font-semibold text-charcoal-950 mb-1">
              Account Settings
            </h2>
            <p className="text-sm text-charcoal-600">
              Update your profile and preferences
            </p>
          </Link>
        </div>

        {/* Recent Orders */}
        {customer && customer.Order.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-charcoal-950 mb-6">
              Recent Orders
            </h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="divide-y divide-charcoal-200">
                {customer.Order.map((order) => (
                  <Link
                    key={order.id}
                    href={`/account/orders/${order.orderNumber}`}
                    className="block p-6 hover:bg-cream-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-sunset-100 rounded-lg">
                          <Package className="w-5 h-5 text-sunset-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal-950">
                            Order #{order.orderNumber}
                          </p>
                          <p className="text-sm text-charcoal-600">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-charcoal-950">
                          ${(order.total / 100).toFixed(2)}
                        </p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === 'DELIVERED'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'SHIPPED'
                              ? 'bg-blue-100 text-blue-700'
                              : order.status === 'PROCESSING'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-charcoal-100 text-charcoal-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/account/orders"
                className="text-sunset-600 hover:text-sunset-700 font-semibold"
              >
                View all orders →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
