"use client";

import { useTelegram } from "./telegram/hook";
import { Button } from "./ui/button";

export function Logout() {
  const { logout } = useTelegram();

  return (
    <Button onClick={logout} className="w-full" variant={"outline"}>
      Logout
    </Button>
  );
}
