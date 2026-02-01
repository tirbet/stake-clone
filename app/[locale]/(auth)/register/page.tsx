import { RegisterForm } from "@/components/register-from";
import { currencyService } from "@/lib/services/currency.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default async function RegisterPage() {
  const items = await currencyService.listActive();
  return (
    <RegisterForm currencies={items}/>
  );
}