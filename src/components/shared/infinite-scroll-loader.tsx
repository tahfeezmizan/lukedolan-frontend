"use client";

import React from "react";
import { Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InfiniteScrollLoaderProps {
  isLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  showNoMoreData?: boolean;
  noMoreDataMessage?: string;
  variant?: "default" | "minimal" | "pulse";
  size?: "sm" | "md" | "lg";
}

export function InfiniteScrollLoader({
  isLoading = false,
  hasError = false,
  errorMessage = "Failed to load more data",
  onRetry,
  showNoMoreData = false,
  noMoreDataMessage = "No more data to load",
  variant = "default",
  size = "md",
}: InfiniteScrollLoaderProps) {
  // Size configurations
  const sizeConfig = {
    sm: {
      spinner: "h-4 w-4",
      text: "text-xs",
      padding: "py-2",
      button: "text-xs px-2 py-1",
    },
    md: {
      spinner: "h-5 w-5",
      text: "text-sm",
      padding: "py-4",
      button: "text-sm px-3 py-1.5",
    },
    lg: {
      spinner: "h-6 w-6",
      text: "text-base",
      padding: "py-6",
      button: "text-sm px-4 py-2",
    },
  };

  const config = sizeConfig[size];

  // Loading state
  if (isLoading) {
    return (
      <div className={`flex justify-center ${config.padding}`}>
        <div className="flex items-center space-x-3">
          {variant === "pulse" ? (
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
            </div>
          ) : variant === "minimal" ? (
            <div className={`${config.spinner} border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin`}></div>
          ) : (
            <Loader2 className={`${config.spinner} animate-spin text-blue-500`} />
          )}
          
          <span className={`${config.text} text-gray-600 font-medium`}>
            Loading more messages...
          </span>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError) {
    return (
      <div className={`flex justify-center ${config.padding}`}>
        <div className="flex flex-col items-center space-y-2 max-w-sm">
          <div className="flex items-center space-x-2 text-red-500">
            <AlertCircle className={config.spinner} />
            <span className={`${config.text} font-medium`}>
              {errorMessage}
            </span>
          </div>
          
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="outline"
              size="sm"
              className={`${config.button} border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors duration-200`}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  // No more data state
  if (showNoMoreData) {
    return (
      <div className={`flex justify-center ${config.padding}`}>
        <div className="relative">
          <div className={`${config.text} text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 shadow-sm`}>
            {noMoreDataMessage}
          </div>
          
          {/* Subtle decorative elements */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-gray-300 rounded-full opacity-50"></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gray-300 rounded-full opacity-50"></div>
        </div>
      </div>
    );
  }

  // Default: no state to show
  return null;
}

// Preset configurations for common use cases
export const InfiniteScrollLoaderPresets = {
  Chat: (props: Partial<InfiniteScrollLoaderProps>) => (
    <InfiniteScrollLoader
      variant="default"
      size="md"
      noMoreDataMessage="No more messages"
      {...props}
    />
  ),
  
  Feed: (props: Partial<InfiniteScrollLoaderProps>) => (
    <InfiniteScrollLoader
      variant="pulse"
      size="lg"
      noMoreDataMessage="You've reached the end"
      {...props}
    />
  ),
  
  List: (props: Partial<InfiniteScrollLoaderProps>) => (
    <InfiniteScrollLoader
      variant="minimal"
      size="sm"
      noMoreDataMessage="No more items"
      {...props}
    />
  ),
};

export default InfiniteScrollLoader;