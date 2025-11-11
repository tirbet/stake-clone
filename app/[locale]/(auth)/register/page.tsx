import { RegisterForm } from "@/components/register-from";
import { currencies } from "@/server/actions/currency.action";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default async function RegisterPage() {
  const items = await currencies(true);
  return (
    <RegisterForm currencies={items}/>
  );
}