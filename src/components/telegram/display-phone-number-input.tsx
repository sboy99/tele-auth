"use client";

import { useState } from "react";
import { FormContainer } from "../container/form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type DisplayPhoneNumberInputProps = {
  isLoading: boolean;
  onSubmit: (phoneNumber: string) => void;
};

export function DisplayPhoneNumberInput({
  isLoading,
  onSubmit,
}: DisplayPhoneNumberInputProps) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneNumber(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(phoneNumber);
  }

  return (
    <FormContainer>
      <form onSubmit={handleSubmit} className="p-6 border space-y-2 rounded-md">
        <Label htmlFor="phoneNo">Phone Number</Label>
        <Input
          name="phoneNumber"
          type="text"
          placeholder="Phone number"
          onChange={handleChange}
          className="w-96"
          disabled={isLoading}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send OTP"}
        </Button>
      </form>
    </FormContainer>
  );
}
