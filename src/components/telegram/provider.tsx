"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { Api } from "telegram";
import { GramClient } from "@/lib/gram";
import { DisplayPhoneNumberInput } from "./display-phone-number-input";
import { DisplayPhoneCodeInput } from "./display-phone-code-input";
import { DisplayPasswordInput } from "./display-password-input";
import { TelegramContext } from "./context";
import { RabbleLoader } from "./rabble-loader";

// -------------------------------ENUMS--------------------------------- //

enum AuthState {
  IDLE,
  PHONE,
  CODE,
  PASSWORD,
  SUCCESS,
}

interface AuthInput {
  phoneNumber: string;
  phoneCodeHash: string;
  password: string;
  phoneCode: string;
}

// -------------------------------COMPONENTS--------------------------------- //

export function TelegramProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authState, setAuthState] = useState<AuthState>(AuthState.IDLE);
  const [client, setClient] = useState<GramClient>({} as GramClient);
  const [telegramUser, setTelegramUser] = useState<Api.User>({} as Api.User);
  const [authInput, setAuthInput] = useState<AuthInput>({
    phoneNumber: "",
    phoneCodeHash: "",
    password: "",
    phoneCode: "",
  });

  async function checkAuth(client: GramClient) {
    setIsLoading(true);
    // TODO: If connection fails, show an error message
    await client.connect();
    const isAuthorized = await client.isAuthorized();
    if (isAuthorized) {
      const user = await client.getMe();
      setTelegramUser(user);
      setAuthState(AuthState.SUCCESS);
    } else {
      setAuthState(AuthState.PHONE);
    }
    setIsLoading(false);
  }

  function init() {
    const gramClient = new GramClient();
    setClient(gramClient);
    checkAuth(gramClient);
  }

  useEffect(init, []);

  async function handleSubmitPhoneNumber(phoneNumber: string) {
    setIsLoading(true);
    const phoneNo = "91" + phoneNumber;
    const phoneCodeHash = await client.sendCode(phoneNo);
    setAuthInput({ ...authInput, phoneNumber: phoneNo, phoneCodeHash });
    setAuthState(AuthState.CODE);
    setIsLoading(false);
  }

  async function handleSubmitPhoneCode(phoneCode: string) {
    try {
      setIsLoading(true);
      const { phoneNumber, phoneCodeHash } = authInput;
      await client.signIn(phoneNumber, phoneCodeHash, phoneCode);
    } catch (error) {
      const err = error as { message: string };
      if (err.message === "SESSION_PASSWORD_NEEDED") {
        setAuthState(AuthState.PASSWORD);
      }
      //   TODO: Handle other errors here
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitPassword(password: string) {
    setIsLoading(true);
    await client.signInWithPassword(password);
    setAuthState(AuthState.SUCCESS);
    setIsLoading(false);
  }

  async function handleLogout() {
    setIsLoading(true);
    await client.logout();
    await client.connect();
    setAuthState(AuthState.PHONE);
    setIsLoading(false);
  }

  if (authState === AuthState.IDLE) {
    return <RabbleLoader />;
  }

  if (authState === AuthState.PHONE) {
    return (
      <DisplayPhoneNumberInput
        isLoading={isLoading}
        onSubmit={handleSubmitPhoneNumber}
      />
    );
  }

  if (authState === AuthState.CODE) {
    return (
      <DisplayPhoneCodeInput
        isLoading={isLoading}
        onSubmit={handleSubmitPhoneCode}
      />
    );
  }

  if (authState === AuthState.PASSWORD) {
    return (
      <DisplayPasswordInput
        isLoading={isLoading}
        onSubmit={handleSubmitPassword}
      />
    );
  }

  return (
    <TelegramContext.Provider
      value={{
        user: telegramUser,
        logout: handleLogout,
      }}
    >
      {children}
    </TelegramContext.Provider>
  );
}
