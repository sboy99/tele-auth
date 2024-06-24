"use client";

import { useState } from "react";
import { FormContainer } from "../container/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type DisplayPhoneCodeInputProps = {
  isLoading: boolean;
  onSubmit: (phoneCode: string) => void;
};

export function DisplayPhoneCodeInput({
  isLoading,
  onSubmit,
}: DisplayPhoneCodeInputProps) {
  const [phoneCode, setPhoneCode] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneCode(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(phoneCode);
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} className="p-6 border space-y-2 rounded-md">
        <Label htmlFor="phoneCode">OTP</Label>
        <Input
          name="phoneCode"
          type="text"
          placeholder="OTP"
          onChange={handleChange}
          className="w-96"
          disabled={isLoading}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </FormContainer>
  );
}
