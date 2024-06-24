import { PropsWithChildren } from "react";

export function FormContainer({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-screen grid place-items-center">{children}</div>
  );
}
