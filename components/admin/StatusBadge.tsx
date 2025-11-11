import { Badge } from '@/components/ui/badge';

type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
type PaymentStatus = 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'REFUNDED';

interface StatusBadgeProps {
  status: OrderStatus | PaymentStatus;
  type?: 'order' | 'payment';
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // Order statuses
  PENDING: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  PROCESSING: {
    label: 'Processing',
    className: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  SHIPPED: {
    label: 'Shipped',
    className: 'bg-cyan-100 text-cyan-800 border-cyan-300',
  },
  DELIVERED: {
    label: 'Delivered',
    className: 'bg-green-100 text-green-800 border-green-300',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-gray-100 text-gray-800 border-gray-300',
  },
  REFUNDED: {
    label: 'Refunded',
    className: 'bg-red-100 text-red-800 border-red-300',
  },
  // Payment statuses
  SUCCEEDED: {
    label: 'Paid',
    className: 'bg-green-100 text-green-800 border-green-300',
  },
  FAILED: {
    label: 'Failed',
    className: 'bg-red-100 text-red-800 border-red-300',
  },
};

export function StatusBadge({ status, type = 'order' }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status,
    className: 'bg-gray-100 text-gray-800 border-gray-300',
  };

  return (
    <Badge
      variant="outline"
      className={`${config.className} font-semibold text-xs px-2.5 py-0.5`}
    >
      {config.label}
    </Badge>
  );
}
