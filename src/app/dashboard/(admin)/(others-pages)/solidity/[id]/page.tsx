'use client';

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CodeViewer from '@/components/ConsoleCode';
import Graph from '@/components/Graph';
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "react-oidc-context";

export default function SolidityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const auth = useAuth();
  const fileId = params.id as string;

  const [sourceCode, setSourceCode] = useState('');
  const [fileName, setFileName] = useState('');
  const [reportMessages, setReportMessages] = useState({});
  const [fineGrainedReport, setFineGrainedReport] = useState(null);
  const [coarseGrainedReport, setCoarseGrainedReport] = useState(null);
  const [hoveredLineNumber, setHoveredLineNumber] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [hoveredLinesFromGraph, setHoveredLinesFromGraph] = useState([]);
  const [scrollToLine, setScrollToLine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Feedback popup states
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [subscribeToNews, setSubscribeToNews] = useState(false);

  const apiBaseUrl = process.env.NEXT_PUBLIC_SCAN_API_BASE_URL!;

  // Bug type names corresponding to coarse_grained array indices
  const bugTypes = [
    'Access Control',
    'Arithmetic',
    'Denial of Service',
    'Front Running',
    'Reentrancy',
    'Time Manipulation',
    'Unchecked Low Level Calls'
  ];

  useEffect(() => {
    if (fileId) {
      fetchFileData();
    }
  }, [fileId]);

  // Show feedback popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFeedbackPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmitFeedback = async () => {
    try {
      setSubmittingFeedback(true);
      const token = auth.user?.access_token;
      
      const response = await fetch(`${apiBaseUrl}/v1.0.0/vulnerability/detection/feedback`, {
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
        setShowFeedbackPopup(false);
        setFeedbackRating(0);
        setFeedbackText('');
        setSubscribeToNews(false);
      } else {
        console.error('Failed to submit feedback');
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const handleCloseFeedbackPopup = () => {
    setShowFeedbackPopup(false);
  };

  const fetchFileData = async () => {
    try {
      setLoading(true);
      
      const token = auth.user?.access_token;
      if (!token) {
        setError('Authentication required. Please log in.');
        setLoading(false);
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
      };
      
      // Fetch file metadata
      const response = await fetch(`/api/file/${fileId}`, { headers });
      if (!response.ok) {
        throw new Error('File not found');
      }
      
      const data = await response.json();
      setFileName(data.fileName);

      // Fetch source code separately
      const sourceCodeResponse = await fetch(`/api/file/${fileId}/source-code`, { headers });
      if (sourceCodeResponse.ok) {
        const sourceCodeText = await sourceCodeResponse.text();
        setSourceCode(sourceCodeText);
      } else {
        console.warn('Source code not available');
      }

      // Fetch bug report
      try {
        const bugReportResponse = await fetch(`/api/file/${fileId}/bug-report`, { headers });
        if (bugReportResponse.ok) {
          const bugReport = await bugReportResponse.json();
          setFineGrainedReport(bugReport.fine_grained);
          setCoarseGrainedReport(bugReport.coarse_grained);
        }
      } catch (bugReportError) {
        console.warn('Bug report not available:', bugReportError);
      }

      // Fetch graph data
      try {
        const graphResponse = await fetch(`/api/file/${fileId}/graph`, { headers });
        if (graphResponse.ok) {
          const graph = await graphResponse.json();
          setGraphData(graph);

          // Process graph data for report messages
          if (graph && graph.nodes) {
            const messages = {};
            graph.nodes.forEach(node => {
              if (node.message && node.message !== '' && Array.isArray(node.code_lines)) {
                node.code_lines.forEach(lineNumber => {
                  if (messages[lineNumber]) {
                    messages[lineNumber] += '\n\n' + node.message;
                  } else {
                    messages[lineNumber] = node.message;
                  }
                });
              }
            });
            setReportMessages(messages);
          }
        }
      } catch (graphError) {
        console.warn('Graph data not available:', graphError);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching file data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers for synchronizing hover effects
  const handleLineHover = (lineNumber) => {
    setHoveredLineNumber(lineNumber);
  };

  const handleLineLeave = () => {
    setHoveredLineNumber(null);
  };

  const handleNodeHover = (lineNumber) => {
    setHoveredLinesFromGraph(prev => {
      const currentLines = Array.isArray(prev) ? prev : Array.from(prev);
      if (!currentLines.includes(lineNumber)) {
        return [...currentLines, lineNumber];
      }
      return currentLines;
    });
  };

  const handleNodeLeave = () => {
    setHoveredLinesFromGraph([]);
  };

  const handleNodeClick = (lineNumber) => {
    setScrollToLine(lineNumber);
  };

  if (loading) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Code Analysis" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Code Analysis" />
        <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => router.push('/dashboard/solidity')}
              className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700"
            >
              Back to Files
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle={`Code Analysis - ${fileName}`} />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12 relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{fileName}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">ID: {fileId}</p>
          </div>
          <button
            onClick={() => router.push('/dashboard/solidity')}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
          >
            Back to Files
          </button>
        </div>

        {/* Bug Type Indicators */}
        {coarseGrainedReport && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Detected Vulnerabilities
            </h3>
            <div className="flex flex-wrap gap-2">
              {coarseGrainedReport.map((hasVulnerability, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded-lg font-medium text-white shadow-sm transition-all ${
                    hasVulnerability === 1
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      hasVulnerability === 1 ? 'bg-red-200' : 'bg-green-200'
                    }`}></span>
                    <span className="text-sm">{bugTypes[index]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {sourceCode && (
            <CodeViewer 
              code={sourceCode} 
              fineGrainedReport={fineGrainedReport || []} 
              reportMessages={reportMessages}
              onLineHover={handleLineHover}
              onLineLeave={handleLineLeave} 
              hoveredLinesFromGraph={hoveredLinesFromGraph}
              scrollToLine={scrollToLine}
            />
          )}
          {graphData && (
            <Graph 
              graphData={graphData} 
              hoveredLineNumber={hoveredLineNumber}
              onNodeHover={handleNodeHover}
              onNodeLeave={handleNodeLeave}
              onNodeClick={handleNodeClick}
            />
          )}
        </div>
      </div>

      {/* Feedback Popup */}
      {showFeedbackPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
              Rate Your Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center text-sm">
              How would you rate this app?
            </p>
            
            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5, 6].map((star) => (
                <button
                  key={star}
                  onClick={() => setFeedbackRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <svg
                    className={`w-8 h-8 ${
                      star <= feedbackRating
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

            {/* Feedback Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Feedback
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell us what you think about the app..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            {/* Subscribe to News */}
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={subscribeToNews}
                  onChange={(e) => setSubscribeToNews(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Subscribe to news and promotions via email
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCloseFeedbackPopup}
                className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Let me play around
              </button>
              <button
                onClick={handleSubmitFeedback}
                disabled={submittingFeedback || feedbackRating === 0}
                className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {submittingFeedback ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}