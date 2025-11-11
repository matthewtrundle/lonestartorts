import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, subtitle, trend, icon }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-charcoal-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-charcoal-950">{value}</p>
          {subtitle && (
            <p className="text-xs text-charcoal-500 mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="text-sunset-600 opacity-80">{icon}</div>
        )}
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1">
          {trend.direction === 'up' && (
            <ArrowUp className="w-4 h-4 text-green-600" />
          )}
          {trend.direction === 'down' && (
            <ArrowDown className="w-4 h-4 text-red-600" />
          )}
          {trend.direction === 'neutral' && (
            <Minus className="w-4 h-4 text-gray-600" />
          )}
          <span
            className={`text-sm font-medium ${
              trend.direction === 'up'
                ? 'text-green-600'
                : trend.direction === 'down'
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            {trend.direction === 'up' && '+'}
            {trend.value}%
          </span>
          <span className="text-xs text-charcoal-500 ml-1">vs last period</span>
        </div>
      )}
    </div>
  );
}
