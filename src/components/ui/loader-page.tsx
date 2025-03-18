import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
}

export function LoaderPage({ className }: LoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-secondary backdrop-blur-sm">
      <div className={cn("animate-pulse space-y-4 text-center", className)}>
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
        <h3 className="font-semibold tracking-tight text-primary text-xl">
          Harap Tunggu...
        </h3>
      </div>
    </div>
  );
}
