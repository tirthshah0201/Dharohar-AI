import { AlertCircle } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <AlertCircle className="h-10 w-10 text-destructive" />
      <h3 className="text-lg font-semibold text-charcoal">{title}</h3>
      <p className="text-sm text-muted max-w-md">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
}

export { ErrorState, type ErrorStateProps };
