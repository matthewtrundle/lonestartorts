import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Package, ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const metadata = {
  title: 'My Orders',
  description: 'View your order history',
};

export default async function OrdersPage() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  // Get customer with all orders
  const customer = await prisma.customer.findUnique({
    where: { clerkUserId: user.id },
    include: {
      Order: {
        include: {
          OrderItem: true,
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!customer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cream-50 to-masa-50 pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-charcoal-400" />
          <h1 className="text-2xl font-bold text-charcoal-950 mb-4">
            No orders yet
          </h1>
          <p className="text-charcoal-600 mb-8">
            Start shopping to see your orders here!
          </p>
          <Link
            href="/shop"
            className="inline-block bg-sunset-500 text-cream-50 px-8 py-3 rounded-full font-semibold hover:bg-sunset-600 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
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
          My Orders
        </h1>

        {customer.Order.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-charcoal-400" />
            <h2 className="text-2xl font-bold text-charcoal-950 mb-2">
              No orders yet
            </h2>
            <p className="text-charcoal-600 mb-6">
              Start shopping to see your orders here!
            </p>
            <Link
              href="/shop"
              className="inline-block bg-sunset-500 text-cream-50 px-8 py-3 rounded-full font-semibold hover:bg-sunset-600 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-charcoal-200">
              {customer.Order.map((order) => {
                const items = order.OrderItem;
                return (
                  <div key={order.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-charcoal-950">
                          Order #{order.orderNumber}
                        </h3>
                        <p className="text-sm text-charcoal-600">
                          Placed on{' '}
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
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

                    {/* Order Items */}
                    <div className="mb-4 space-y-2">
                      {items.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-charcoal-700">
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold text-charcoal-950">
                            ${(item.price * item.quantity / 100).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tracking */}
                    {order.trackingNumber && (
                      <div className="bg-cream-50 rounded-lg p-4 mb-4">
                        <p className="text-sm text-charcoal-700 mb-1">
                          <span className="font-semibold">Tracking:</span>{' '}
                          {order.trackingNumber}
                        </p>
                        {order.carrier && (
                          <p className="text-sm text-charcoal-600">
                            Carrier: {order.carrier}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Order Total */}
                    <div className="flex justify-between items-center pt-4 border-t border-charcoal-200">
                      <span className="text-charcoal-700">Total</span>
                      <span className="text-xl font-bold text-charcoal-950">
                        ${(order.total / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
