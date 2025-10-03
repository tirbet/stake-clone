import RegisterForm from "@/components/register-from";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default function RegisterPage() {

  return (
    <RegisterForm />
  );
}