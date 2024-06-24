import { createContext } from "react";
import { Api } from "telegram";

export interface ITelegramContext {
  user: Api.User;
  logout: () => Promise<void>;
}

export const TelegramContext = createContext<ITelegramContext>(
  {} as ITelegramContext
);
