import { RegisterForm } from "@/components/register-from";
import { GalleryVerticalEnd } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default async function RegisterPage() {

  return (
    <RegisterForm />
  );
}