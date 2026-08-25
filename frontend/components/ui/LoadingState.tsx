function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-warm-gray border-t-terracotta" />
      <p className="text-sm text-muted">{message}</p>
    </div>
  );
}

export { LoadingState };
