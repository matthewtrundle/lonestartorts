'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  // Determine message based on status
  let title = 'Unsubscribe';
  let message = '';
  let isSuccess = false;

  switch (status) {
    case 'success':
      title = "You've Been Unsubscribed";
      message =
        "We've removed you from our promotional emails. You won't receive any more messages from our drip campaign.";
      isSuccess = true;
      break;
    case 'already_unsubscribed':
      title = 'Already Unsubscribed';
      message =
        "You've already been unsubscribed from our promotional emails.";
      isSuccess = true;
      break;
    case 'not_found':
      title = 'Link Not Found';
      message =
        "We couldn't find this subscription. It may have already been removed or the link may be invalid.";
      break;
    case 'invalid':
      title = 'Invalid Link';
      message =
        'The unsubscribe link appears to be invalid. Please try clicking the link in your email again.';
      break;
    case 'error':
    default:
      title = 'Something Went Wrong';
      message =
        "We couldn't process your unsubscribe request. Please try again later or contact us at howdy@lonestartortillas.com";
      break;
  }

  return (
    <main className="min-h-screen bg-cream-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Icon */}
          <div className="mb-6">
            {isSuccess ? (
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ) : (
              <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-charcoal-900 mb-4">{title}</h1>

          {/* Message */}
          <p className="text-charcoal-600 mb-8">{message}</p>

          {/* Actions */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block w-full bg-charcoal-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-charcoal-800 transition-colors"
            >
              Return to Homepage
            </Link>

            {isSuccess && (
              <p className="text-sm text-charcoal-500">
                Changed your mind?{' '}
                <Link
                  href="/contact"
                  className="text-sunset-600 hover:text-sunset-700 underline"
                >
                  Contact us
                </Link>{' '}
                to re-subscribe.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-charcoal-500">
            Lonestar Tortillas • Premium Texas Tortillas
          </p>
          <p className="text-xs text-charcoal-400 mt-2">
            Independent reseller • Not affiliated with or endorsed by H-E-B®
          </p>
        </div>
      </div>
    </main>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-cream-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sunset-600"></div>
        </main>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
