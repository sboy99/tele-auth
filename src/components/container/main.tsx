import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type MainContainerProps = ComponentProps<"div">;

export function MainContainer({ className, ...props }: MainContainerProps) {
  return <div className={cn("max-w-7xl m-auto", className)} {...props} />;
}
