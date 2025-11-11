export const SidebarSkeleton = () => {
    return (
      <div className="space-y-2 px-4 py-2">
        {Array.from({ length: 15 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 animate-pulse"
          >
            <div className="h-6 w-6 bg-muted rounded-full" />
            <div className="h-4 w-32 bg-muted rounded-md" />
          </div>
        ))}
      </div>
    );
  };
  