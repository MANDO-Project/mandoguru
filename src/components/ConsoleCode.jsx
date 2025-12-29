'use client';

import * as React from "react";
import { createPortal } from 'react-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solidity } from 'react-syntax-highlighter/dist/esm/languages/hljs';
import {coy} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { solarizedlight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const CodeViewer = ({ 
  code,
  fineGrainedReport = [],
  reportMessages = {},
  onLineHover = (lineNumber) => {},
  onLineLeave = () => {},
  hoveredLinesFromGraph = [],
  scrollToLine = null,
  clickedLineMessage = null
}) => {

  const [hoveredLine, setHoveredLine] = React.useState(null);
  const [wordWrap, setWordWrap] = React.useState(true);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [linePosition, setLinePosition] = React.useState({ top: 0, left: 0, width: 0 });
  const [isPopupHovered, setIsPopupHovered] = React.useState(false);
  const containerRef = React.useRef(null);
  const codeRef = React.useRef(null);
  const hideTimeoutRef = React.useRef(null);
  const showTimeoutRef = React.useRef(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [pendingLine, setPendingLine] = React.useState(null);

  // Ensure portal only renders on client side
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (scrollToLine && codeRef.current) {
      const lineElements = codeRef.current.querySelectorAll('[data-line-number]');
      const targetLine = Array.from(lineElements).find(
        el => parseInt(el.dataset.lineNumber) === scrollToLine
      );
      
      if (targetLine) {
        targetLine.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
        
        // Add highlight animation
        targetLine.classList.add('highlight-scroll');
        setTimeout(() => {
          targetLine.classList.remove('highlight-scroll');
        }, 2000);
      }
    }
  }, [scrollToLine]);

  // React.useEffect(() => {
  //   if (clickedLineMessage && codeRef.current) {
  //     const lineElements = codeRef.current.querySelectorAll('[data-line-number]');
  //     const targetLine = Array.from(lineElements).find(
  //       el => parseInt(el.dataset.lineNumber) === clickedLineMessage.line
  //     );
      
  //     if (targetLine && fineGrainedReport.includes(clickedLineMessage.line)) {
  //       const rect = targetLine.getBoundingClientRect();
  //       const containerRect = containerRef.current.getBoundingClientRect();
        
  //       setMousePosition({
  //         x: containerRect.width / 2,
  //         y: rect.top - containerRect.top + rect.height / 2
  //       });
  //       setHoveredLine(clickedLineMessage.line);
        
  //       // Add highlight animation class
  //       targetLine.classList.add('highlight-click');

  //       // // Auto-hide message after 5 seconds
  //       // const timer = setTimeout(() => {
  //       //   setHoveredLine(null);
  //       // }, 5000);
  //       // Auto-hide message and remove highlight after 5 seconds
  //       const timer = setTimeout(() => {
  //         setHoveredLine(null);
  //         targetLine.classList.remove('highlight-click');
  //       }, 5000);
        
  //       return () => {
  //         clearTimeout(timer);
  //         targetLine.classList.remove('highlight-click');
  //       };
  //     }
  //   }
  // }, [clickedLineMessage, fineGrainedReport]);

  const handleMouseMove = (event) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
    }
  };

  const handleLineHover = (lineNumber, event) => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    
    // If popup is currently being hovered, don't change it
    if (isPopupHovered) {
      return;
    }
    
    // If we're already showing this line's popup, do nothing
    if (hoveredLine === lineNumber) {
      return;
    }
    
    // Store the line position immediately for smooth transition
    if (event && event.currentTarget && codeRef.current) {
      const lineRect = event.currentTarget.getBoundingClientRect();
      const codeContainerRect = codeRef.current.getBoundingClientRect();
      
      setPendingLine({
        lineNumber,
        position: {
          top: lineRect.top,
          left: codeContainerRect.left + codeContainerRect.width / 2,
          width: lineRect.width
        }
      });
    }
    
    // Clear any pending show timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }
    
    // Add delay before showing popup (allows user to move to existing popup)
    showTimeoutRef.current = setTimeout(() => {
      if (pendingLine || lineNumber) {
        const targetLine = pendingLine?.lineNumber || lineNumber;
        setHoveredLine(targetLine);
        if (pendingLine?.position) {
          setLinePosition(pendingLine.position);
        }
        onLineHover(targetLine);
      }
    }, 400); // 400ms delay before showing popup
  };

  const handleLineLeave = () => {
    // Clear any pending show timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    
    // Clear pending line
    setPendingLine(null);
    
    // Only hide if popup is not being hovered
    if (!isPopupHovered) {
      hideTimeoutRef.current = setTimeout(() => {
        setHoveredLine(null);
        onLineLeave();
      }, 300);
    }
  };

  const handlePopupEnter = () => {
    // Clear any pending hide timeout
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    // Clear any pending show timeout (prevent new popup from appearing)
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    setPendingLine(null);
    setIsPopupHovered(true);
  };

  const handlePopupLeave = () => {
    setIsPopupHovered(false);
    setHoveredLine(null);
    onLineLeave();
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
    };
  }, []);

  const getMessageForLine = (lineNumber) => {
    const message = reportMessages[lineNumber] || `Issue detected on line ${lineNumber}`;
    const lines = message.split('\n').filter(line => line.trim());
    
    // Group lines into bug sections (Bug, Reason, Suggestion)
    const bugs = [];
    const seenBugs = new Set();
    let currentBug = { bug: '', reason: '', suggestion: '', riskLevel: '' };
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('Bug:')) {
        if (currentBug.bug) {
          const bugKey = `${currentBug.bug}|${currentBug.reason}|${currentBug.suggestion}|${currentBug.riskLevel}`;
          if (!seenBugs.has(bugKey)) {
            seenBugs.add(bugKey);
            bugs.push(currentBug);
          }
        }
        currentBug = { 
          bug: trimmedLine.slice(4).trim(),
          reason: '',
          suggestion: '',
          riskLevel: ''
        };
      } else if (trimmedLine.startsWith('Reason:')) {
        currentBug.reason = trimmedLine.slice(7).trim();
      } else if (trimmedLine.startsWith('Suggestion:')) {
        currentBug.suggestion = trimmedLine.slice(11).trim();
      } else if (trimmedLine.startsWith('Risk Level:')) {
        currentBug.riskLevel = trimmedLine.slice(11).trim();
      }
    }
    
    // Add the last bug
    if (currentBug.bug) {
      const bugKey = `${currentBug.bug}|${currentBug.reason}|${currentBug.suggestion}|${currentBug.riskLevel}`;
      if (!seenBugs.has(bugKey)) {
        seenBugs.add(bugKey);
        bugs.push(currentBug);
      }
    }
    
    // Helper to check if a bug has no useful reason/suggestion
    const hasNoDetails = (bug) => {
      const noReason = !bug.reason || bug.reason === 'No reason provided';
      const noSuggestion = !bug.suggestion || bug.suggestion === 'No suggestion provided';
      const noRiskLevel = !bug.riskLevel || bug.riskLevel === 'N/A';
      return noReason && noSuggestion && noRiskLevel; 
    };
    
    // Filter out bugs without reason/suggestion if another bug with the same type has details
    const bugTypesWithDetails = new Set(
      bugs.filter(b => !hasNoDetails(b)).map(b => b.bug)
    );
    
    const filteredBugs = bugs.filter(bug => {
      // Keep the bug if it has details
      if (!hasNoDetails(bug)) return true;
      // If no details, only keep if no other bug of the same type has details
      return !bugTypesWithDetails.has(bug.bug);
    });
    
    return filteredBugs.length > 0 ? filteredBugs : [{ bug: message, reason: '', suggestion: '', riskLevel: '' }];
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col h-screen bg-gray-200 p-5 mt-6 border-blue-700 border-[3px] rounded-xl"
      onMouseMove={handleMouseMove}
    >
      <style jsx global>{`
        @keyframes highlight-pulse {
          0% { background-color: rgba(255, 165, 0, 0.2); }
          50% { background-color: rgba(255, 165, 0, 0.5); }
          100% { background-color: rgba(255, 165, 0, 0.2); }
        }
        .highlight-from-graph {
          animation: highlight-pulse 1.5s ease-in-out infinite;
          background-color: rgba(255, 165, 0, 0.2);
          border-radius: 4px;
          margin: -2px;
          padding: 2px;
        }
        .highlight-scroll {
          animation: highlight-scroll 2s ease-out;
        }
        @keyframes highlight-scroll {
          0% { background-color: rgba(255, 220, 0, 0.8); }
          100% { background-color: transparent; }
        }
        .highlight-click {
          animation: highlight-click 5s ease-out;
        }
        
        @keyframes highlight-click {
          0% { background-color: rgba(255, 0, 0, 0.4); }
          10% { background-color: rgba(255, 0, 0, 0.6); }
          20% { background-color: rgba(255, 0, 0, 0.4); }
          100% { background-color: transparent; }
        }
        
        /* Word wrap styles */
        .word-wrap-enabled pre {
          white-space: pre-wrap !important;
          word-wrap: break-word !important;
          overflow-wrap: break-word !important;
        }
        .word-wrap-enabled code {
          white-space: pre-wrap !important;
          word-wrap: break-word !important;
        }
        .word-wrap-enabled span[style*="display: block"] {
          white-space: pre-wrap !important;
          word-wrap: break-word !important;
        }
        .word-wrap-disabled pre {
          white-space: pre !important;
        }
        .word-wrap-disabled code {
          white-space: pre !important;
        }
      `}</style>
      
      {/* Header with title and word-wrap toggle */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-black">Smart contract</h1>
        
        {/* Word Wrap Toggle Switch */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 font-medium">Word Wrap</span>
          <button
            onClick={() => setWordWrap(!wordWrap)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              wordWrap ? 'bg-blue-600' : 'bg-gray-400'
            }`}
            role="switch"
            aria-checked={wordWrap}
            aria-label="Toggle word wrap"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out ${
                wordWrap ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      
      <div ref={codeRef} className={`relative flex-1 overflow-auto ${wordWrap ? 'word-wrap-enabled' : 'word-wrap-disabled'}`}>
        <SyntaxHighlighter
          language="solidity"
          style={coy}
          showLineNumbers={true}
          wrapLines={true}
          wrapLongLines={wordWrap}
          lineProps={(lineNumber) => {
            const style = { 
              display: 'block', 
              width: wordWrap ? '100%' : 'fit-content',
              whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
              wordBreak: wordWrap ? 'break-word' : 'normal'
            };
            const isHighlighted = fineGrainedReport.includes(lineNumber);
            const isHighlightedFromGraph = hoveredLinesFromGraph.includes(lineNumber);
            
            // if (isHighlighted || isHighlightedFromGraph) {
            //   style.backgroundColor = isHighlightedFromGraph ? '#FFE4B5' : '#FFDB81';
            //   style.cursor = 'pointer';
            //   style.transition = 'all 0.2s ease-in-out';
            //   style.position = 'relative';
            //   style.transform = hoveredLine === lineNumber ? 'scale(1.1)' : 'scale(1)';
            //   style.boxShadow = isHighlightedFromGraph ? '0 0 8px rgba(255, 165, 0, 0.5)' : 'none';
            // }
            
            if (isHighlightedFromGraph) {
              // style.position = 'relative';
              // style.zIndex = 1;
              style.animation = 'highlight-pulse 1.5s ease-in-out infinite';
              style.backgroundColor = 'rgba(255, 165, 0, 0.2)';
            }
            
            if (isHighlighted) {
              style.backgroundColor = '#FFDB81';
              style.cursor = 'pointer';
            }
            
            return { 
              style,
              className: isHighlightedFromGraph ? 'highlight-from-graph' : '',
              'data-line-number': lineNumber,
              onMouseEnter: isHighlighted ? (e) => handleLineHover(lineNumber, e) : undefined,
              onMouseLeave: isHighlighted ? () => handleLineLeave() : undefined,
            };
          }}
        >
          {code}
        </SyntaxHighlighter>

      </div>

      {/* Popup Message Box - Rendered via Portal to ensure it's above all elements */}
      {isMounted && hoveredLine && createPortal(
        <div 
          className="fixed px-4 py-3 text-base bg-gray-800 text-white rounded-lg shadow-xl border-2 border-gray-600 cursor-auto"
          style={{
            left: `${linePosition.left}px`,
            top: `${linePosition.top}px`,
            transform: 'translate(-50%, calc(-100% - 15px))',
            animation: 'fadeInScale 0.2s ease-out forwards',
            minWidth: '650px',
            maxWidth: '700px',
            maxHeight: '500px',
            overflowY: 'auto',
            zIndex: 2147483647 // Maximum z-index value
          }}
          onMouseEnter={handlePopupEnter}
          onMouseLeave={handlePopupLeave}
        >
          <div className="space-y-4">
            {getMessageForLine(hoveredLine).map((bug, index) => (
              <div key={index} className="border-l-4 border-red-500 pl-3 pb-3 last:pb-0">
                <div className="mb-2">
                  <span className="font-bold text-red-400">Bug: </span>
                  <span className="text-white">{bug.bug}</span>
                </div>
                {bug.reason !== 'No reason provided' && (
                  <div className="mb-2">
                    <span className="font-bold text-yellow-400">Reason: </span>
                    <span className="text-gray-300">{bug.reason}</span>
                  </div>
                )}
                {bug.suggestion !== 'No suggestion provided' && (
                  <div>
                    <span className="font-bold text-green-400">Suggestion: </span>
                    <span className="text-gray-300">{bug.suggestion}</span>
                  </div>
                )}
                {bug.riskLevel && bug.riskLevel !== 'N/A' && (
                  <div className="mt-2">
                    <span className="font-bold text-purple-400">Risk Level: </span>
                    <span className="text-gray-300">{bug.riskLevel}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Arrow pointing down */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-gray-800"></div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default CodeViewer;