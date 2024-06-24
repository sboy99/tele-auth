"use client";

import { Logout } from "./logout";
import { ProfileCard } from "./profile-card";
import { useTelegram } from "./telegram/hook";

export function Me() {
  const { user } = useTelegram();

  return (
    <div className="p-4 space-y-2">
      <ProfileCard
        name={user?.firstName as string}
        username={user?.username as string}
        phoneNumber={user?.phone as string}
      />
      <Logout />
    </div>
  );
}
