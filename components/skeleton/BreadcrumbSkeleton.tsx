import React from "react";

type BreadcrumbSkeletonProps = {
  count?: number;
};

export const BreadcrumbSkeleton: React.FC<BreadcrumbSkeletonProps> = ({ count = 1 }) => {
  return (
    <div className="flex mb-2">
      {/* Back button skeleton */}
      <div className="mr-1 bg-sidebar max-h-11 rounded-sm flex items-center justify-center px-5 py-3.5">
        <div className="w-4 h-4 rounded-full bg-gray-700 animate-pulse" />
      </div>

      {/* Breadcrumb items skeleton */}
      <div className="flex items-center justify-center p-1 max-h-11 rounded-sm bg-sidebar">
        {Array.from({ length: count }).map((_, index) => (
          <React.Fragment key={index}>
            <div className="h-6 w-16 rounded-sm bg-gray-700 animate-pulse" />
            {index < count - 1 && (
              <span className="inline-flex w-0.5 h-[3.2em] m-1 bg-[rgb(26,44,56)] skew-x-[-20deg]"></span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
