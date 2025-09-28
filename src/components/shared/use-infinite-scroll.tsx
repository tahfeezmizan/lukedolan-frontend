"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
  rootMargin?: string;
  debounceMs?: number;
}

interface UseInfiniteScrollReturn {
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  isNearTop: boolean;
  scrollToBottom: (behavior?: ScrollBehavior) => void;
  maintainScrollPosition: () => void;
}

export function useInfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 0.1,
  rootMargin = "100px",
  debounceMs = 150,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearTop, setIsNearTop] = useState(false);
  const [scrollState, setScrollState] = useState<{
    scrollTop: number;
    scrollHeight: number;
  } | null>(null);
  
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isLoadingRef = useRef(false);
  const lastLoadTimeRef = useRef(0);

  // Debounced load more function to prevent rapid API calls
  const debouncedLoadMore = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      const now = Date.now();
      const timeSinceLastLoad = now - lastLoadTimeRef.current;
      
      // Prevent rapid successive calls (minimum 500ms between calls)
      if (timeSinceLastLoad < 500) {
        return;
      }

      if (hasMore && !isLoading && !isLoadingRef.current) {
        isLoadingRef.current = true;
        lastLoadTimeRef.current = now;
        
        // Store current scroll state before loading
        const container = containerRef.current;
        if (container) {
          setScrollState({
            scrollTop: container.scrollTop,
            scrollHeight: container.scrollHeight,
          });
        }
        
        onLoadMore();
      }
    }, debounceMs);
  }, [hasMore, isLoading, onLoadMore, debounceMs]);

  // Intersection Observer for efficient scroll detection
  useEffect(() => {
    const sentinel = sentinelRef.current;
    const container = containerRef.current;
    
    if (!sentinel || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsNearTop(entry.isIntersecting);
        
        if (entry.isIntersecting && hasMore && !isLoading) {
          debouncedLoadMore();
        }
      },
      {
        root: container,
        rootMargin,
        threshold,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [hasMore, isLoading, debouncedLoadMore, threshold, rootMargin]);

  // Reset loading flag when loading state changes
  useEffect(() => {
    if (!isLoading) {
      isLoadingRef.current = false;
    }
  }, [isLoading]);

  // Maintain scroll position after loading new content
  const maintainScrollPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container || !scrollState) return;

    requestAnimationFrame(() => {
      const newScrollHeight = container.scrollHeight;
      const heightDifference = newScrollHeight - scrollState.scrollHeight;
      
      if (heightDifference > 0) {
        container.scrollTop = scrollState.scrollTop + heightDifference;
      }
      
      setScrollState(null);
    });
  }, [scrollState]);

  // Smooth scroll to bottom function
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;
    if (!container) return;

    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
    });
  }, []);

  // Performance-optimized scroll position tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let lastScrollTop = 0;

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const currentScrollTop = container.scrollTop;
        
        // Only update if scroll position changed significantly
        if (Math.abs(currentScrollTop - lastScrollTop) > 10) {
          lastScrollTop = currentScrollTop;
          
          // Check if user is near the top for loading more
          const isAtTop = currentScrollTop <= 100;
          if (isAtTop !== isNearTop) {
            setIsNearTop(isAtTop);
          }
        }
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isNearTop]);

  return {
    sentinelRef,
    containerRef,
    isNearTop,
    scrollToBottom,
    maintainScrollPosition,
  };
}

export default useInfiniteScroll;