"use client";

import { useState } from "react";
import { FormContainer } from "../container/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type DisplayPasswordInputProps = {
  isLoading: boolean;
  onSubmit: (password: string) => void;
};

export function DisplayPasswordInput({
  isLoading,
  onSubmit,
}: DisplayPasswordInputProps) {
  const [password, setPassword] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(password);
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} className="p-6 border space-y-2 rounded-md">
        <Label htmlFor="phoneCode">Passowrd</Label>
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-96"
          disabled={isLoading}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
    </FormContainer>
  );
}
