import { type ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      {icon && <div className="text-warm-gray">{icon}</div>}
      <h3 className="text-lg font-semibold text-charcoal">{title}</h3>
      {description && (
        <p className="text-sm text-muted max-w-md">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export { EmptyState, type EmptyStateProps };
