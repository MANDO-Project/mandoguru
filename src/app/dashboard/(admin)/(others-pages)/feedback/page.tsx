'use client';

import React, { useState, useEffect } from "react";
import { useAuth } from "react-oidc-context";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

export default function FeedbackPage() {
  const auth = useAuth();
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [subscribeToNews, setSubscribeToNews] = useState(false);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmitFeedback = async () => {
    if (feedbackRating === 0) {
      setSubmitError('Please select a rating before submitting.');
      return;
    }

    try {
      setSubmittingFeedback(true);
      setSubmitError('');
      const token = auth.user?.access_token;

      if (!token) {
        setSubmitError('Authentication required. Please log in.');
        return;
      }

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedbackText,
          rating: feedbackRating,
          subscribe_to_news: subscribeToNews,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFeedbackRating(0);
        setFeedbackText('');
        // Keep subscribeToNews state as user preference
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitError(errorData.message || 'Failed to submit feedback. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setSubmitError('An error occurred while submitting feedback. Please try again.');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const handleReset = () => {
    setFeedbackRating(0);
    setFeedbackText('');
    setSubmitError('');
    setSubmitSuccess(false);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Feedback" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              We Value Your Feedback
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Help us improve by sharing your experience with our application.
            </p>
          </div>

          {/* Success Message */}
          {submitSuccess && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-green-700 dark:text-green-400 font-medium">
                  Thank you for your feedback! We appreciate your input.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {submitError && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 dark:text-red-400 font-medium">{submitError}</p>
              </div>
            </div>
          )}

          {/* Rating Section */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-800 dark:text-white mb-4 text-center">
              How would you rate your experience?
            </label>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5, 6].map((star) => (
                <button
                  key={star}
                  onClick={() => setFeedbackRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-1"
                  aria-label={`Rate ${star} stars`}
                >
                  <svg
                    className={`w-10 h-10 ${star <= feedbackRating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                      }`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      fill={star <= feedbackRating ? 'currentColor' : 'none'}
                    />
                  </svg>
                </button>
              ))}
            </div>
            {feedbackRating > 0 && (
              <p className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                You selected {feedbackRating} out of 6 stars
              </p>
            )}
          </div>

          {/* Feedback Text Section */}
          <div className="mb-8">
            <label className="block text-lg font-medium text-gray-800 dark:text-white mb-3">
              Share Your Thoughts
            </label>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Tell us what you like, what could be improved, or any suggestions you have..."
              className="w-full px-4 py-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
              rows={5}
            />
          </div>

          {/* Subscribe to News Switch */}
          <div className="mb-8 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="text-base font-medium text-gray-800 dark:text-white mb-1">
                  Subscribe to News & Updates
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive news, promotions, and product updates via email
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={subscribeToNews}
                onClick={() => setSubscribeToNews(!subscribeToNews)}
                className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${subscribeToNews ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
              >
                <span
                  className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${subscribeToNews ? 'translate-x-5' : 'translate-x-0'
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
            >
              Reset
            </button>
            <button
              onClick={handleSubmitFeedback}
              disabled={submittingFeedback || feedbackRating === 0}
              className="flex-1 px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
            >
              {submittingFeedback ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Feedback'
              )}
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your feedback helps us build a better product for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
