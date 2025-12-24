'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Star, Search, Filter, MessageSquare, TrendingUp, Users, CheckCircle } from 'lucide-react';

interface Feedback {
  id: string;
  orderNumber: string;
  email: string;
  customerName: string | null;
  rating: number;
  comment: string | null;
  submittedAt: string;
  couponCode: string | null;
  couponUsed: boolean;
}

interface Stats {
  total: number;
  averageRating: string | number;
  distribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  pages: number;
}

export default function FeedbackPage() {
  const searchParams = useSearchParams();
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams?.get('search') || '');
  const [ratingFilter, setRatingFilter] = useState(searchParams?.get('rating') || 'all');
  const [commentFilter, setCommentFilter] = useState(searchParams?.get('hasComment') || 'all');
  const [page, setPage] = useState(parseInt(searchParams?.get('page') || '1'));
  const [pagination, setPagination] = useState<Pagination>({ page: 1, perPage: 20, total: 0, pages: 1 });

  useEffect(() => {
    fetchFeedback();
  }, [search, ratingFilter, commentFilter, page]);

  const fetchFeedback = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        search,
        ...(ratingFilter !== 'all' && { rating: ratingFilter }),
        ...(commentFilter !== 'all' && { hasComment: commentFilter }),
      });

      const response = await fetch(`/api/admin/feedback?${params}`);
      if (!response.ok) throw new Error('Failed to fetch feedback');

      const data = await response.json();
      setFeedback(data.feedback);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (err) {
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleRatingChange = (value: string) => {
    setRatingFilter(value);
    setPage(1);
  };

  const handleCommentChange = (value: string) => {
    setCommentFilter(value);
    setPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-amber-400 text-amber-400'
                : 'fill-stone-200 text-stone-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingBgColor = (rating: number) => {
    if (rating <= 2) return 'bg-red-50';
    if (rating === 3) return 'bg-amber-50';
    return 'bg-white';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-charcoal-950 mb-2">Customer Feedback</h1>
          <p className="text-charcoal-600">View and analyze customer ratings and comments</p>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-500">Total Reviews</p>
                <p className="text-2xl font-bold text-charcoal-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-500">Average Rating</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-charcoal-900">{stats.averageRating}</p>
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-500">5-Star Reviews</p>
                <p className="text-2xl font-bold text-charcoal-900">{stats.distribution[5]}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-charcoal-500">Low Ratings (1-2)</p>
                <p className="text-2xl font-bold text-charcoal-900">
                  {stats.distribution[1] + stats.distribution[2]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rating Distribution */}
      {stats && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-charcoal-900 mb-4">Rating Distribution</h2>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.distribution[rating as keyof typeof stats.distribution];
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-20">
                    <span className="text-sm font-medium text-charcoal-700">{rating}</span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="flex-1 h-4 bg-charcoal-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        rating >= 4 ? 'bg-green-500' : rating === 3 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-charcoal-600 w-16 text-right">
                    {count} ({percentage.toFixed(0)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal-400" />
            <input
              type="text"
              placeholder="Search by order #, customer name, or email..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
            />
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-charcoal-400" />
            <select
              value={ratingFilter}
              onChange={(e) => handleRatingChange(e.target.value)}
              className="px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          {/* Comment Filter */}
          <select
            value={commentFilter}
            onChange={(e) => handleCommentChange(e.target.value)}
            className="px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-sunset-500 focus:border-transparent"
          >
            <option value="all">All Feedback</option>
            <option value="true">With Comments</option>
            <option value="false">Without Comments</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunset-600 mx-auto"></div>
            <p className="text-charcoal-600 mt-4">Loading feedback...</p>
          </div>
        ) : feedback.length === 0 ? (
          <div className="p-12 text-center">
            <Star className="w-12 h-12 text-charcoal-300 mx-auto mb-4" />
            <p className="text-charcoal-600">No feedback found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-charcoal-200">
                <thead className="bg-charcoal-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Comment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-charcoal-500 uppercase tracking-wider">
                      Coupon
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-charcoal-200">
                  {feedback.map((item) => (
                    <tr key={item.id} className={getRatingBgColor(item.rating)}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-charcoal-500">
                        {formatDate(item.submittedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={`/admin/orders/${item.orderNumber}`}
                          className="text-sm font-medium text-sunset-600 hover:text-sunset-700"
                        >
                          {item.orderNumber}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-charcoal-900">{item.customerName || 'N/A'}</div>
                        <div className="text-xs text-charcoal-500">{item.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {renderStars(item.rating)}
                      </td>
                      <td className="px-6 py-4">
                        {item.comment ? (
                          <div className="max-w-xs">
                            <p className="text-sm text-charcoal-700 line-clamp-2">{item.comment}</p>
                          </div>
                        ) : (
                          <span className="text-sm text-charcoal-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.couponCode ? (
                          <div>
                            <code className="text-xs font-mono bg-charcoal-100 px-2 py-1 rounded">
                              {item.couponCode}
                            </code>
                            {item.couponUsed && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Used
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-charcoal-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="bg-white px-6 py-4 border-t border-charcoal-200 flex items-center justify-between">
                <div className="text-sm text-charcoal-700">
                  Showing {(pagination.page - 1) * pagination.perPage + 1} to{' '}
                  {Math.min(pagination.page * pagination.perPage, pagination.total)} of{' '}
                  {pagination.total} reviews
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(page - 1)}
                    disabled={page <= 1}
                    className="px-4 py-2 border border-charcoal-300 rounded-lg text-sm hover:bg-charcoal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(page + 1)}
                    disabled={page >= pagination.pages}
                    className="px-4 py-2 border border-charcoal-300 rounded-lg text-sm hover:bg-charcoal-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
