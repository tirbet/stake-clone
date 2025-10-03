"use client";

import { useState, FormEvent } from "react";
import { LoaderCircle } from "lucide-react";

import InputError from "@/components/input-error";
import TextLink from "@/components/text-link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  currency_id: string;
  bonus_id: string;
};

export default function RegisterForm() {
  const [data, setData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    currency_id: "",
    bonus_id: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterForm>>({});
  const [processing, setProcessing] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    try {
      // Example API call – change to your actual endpoint
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrors(err.errors || {});
      } else {
        console.log("Registered successfully!");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const bonuses = [
    {
      id: "1",
      name: "Sports Welcome Bonus",
      description: "100% match up to $500 + 50 free spins",
      icon: "🏈",
      highlight: "bg-gradient-to-r from-green-500 to-green-700",
      terms: "Min. deposit $10. 8x wagering requirement.",
    },
    {
      id: "2",
      name: "Casino Welcome Package",
      description: "200% match up to $1000 + 100 free spins",
      icon: "🎰",
      highlight: "bg-gradient-to-r from-purple-500 to-purple-800",
      terms: "Min. deposit $20. 30x wagering requirement.",
    },
    {
      id: "3",
      name: "No Bonus",
      description: "I prefer to play without a welcome bonus",
      icon: "🚫",
      highlight: "bg-gradient-to-r from-gray-500 to-gray-700",
      terms: "No wagering requirements. Withdraw anytime.",
    },
  ];

  const currencies = [
    { id: "usd", name: "USD", description: "US Dollar" },
    { id: "eur", name: "EUR", description: "Euro" },
    { id: "bdt", name: "BDT", description: "Bangladeshi Taka" },
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">SIGN UP & GET BONUS</h2>
        <p className="text-yellow-400 text-sm">Limited time offers for new players only</p>
      </div>

      <form className="flex flex-col gap-6" onSubmit={submit}>
        {/* Bonus Section */}
        <div className="space-y-4">
          <Label htmlFor="bonus_id" className="text-white font-semibold">
            SELECT YOUR WELCOME BONUS
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bonuses.map((bonus) => (
              <div
                key={bonus.id}
                onClick={() => setData({ ...data, bonus_id: bonus.id })}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 
                  ${data.bonus_id === bonus.id
                    ? "border-yellow-400 ring-2 ring-yellow-400/50"
                    : "border-gray-600 hover:border-gray-400"
                  }`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${bonus.highlight}`}></div>
                <div className="flex items-start space-x-3 mt-2">
                  <span className="text-2xl">{bonus.icon}</span>
                  <div>
                    <h3 className={`font-bold ${data.bonus_id === bonus.id ? "text-yellow-400" : "text-white"}`}>
                      {bonus.name}
                    </h3>
                    <p className="text-sm text-gray-300">{bonus.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{bonus.terms}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <InputError message={errors.bonus_id} />
        </div>

        {/* Personal Details */}
        <div className="space-y-4 bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-white font-semibold border-b border-gray-600 pb-2">PERSONAL DETAILS</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">Full Name</Label>
              <Input
                id="name"
                type="text"
                required
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                disabled={processing}
                placeholder="John Doe"
                className="bg-gray-700 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400"
              />
              <InputError message={errors.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                disabled={processing}
                placeholder="john@example.com"
                className="bg-gray-700 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400"
              />
              <InputError message={errors.email} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency_id" className="text-gray-300">Preferred Currency</Label>
            <Select
              value={data.currency_id}
              onValueChange={(value) => setData({ ...data, currency_id: value })}
            >
              <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {currencies.map((currency) => (
                  <SelectItem key={currency.id} value={currency.id}>
                    {currency.name} ({currency.description})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <InputError message={errors.currency_id} />
          </div>
        </div>

        {/* Security Section */}
        <div className="space-y-4 bg-gray-700/50 p-4 rounded-lg">
          <h3 className="text-white font-semibold border-b border-gray-600 pb-2">SECURITY DETAILS</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                disabled={processing}
                placeholder="••••••••"
                className="bg-gray-700 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400"
              />
              <InputError message={errors.password} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation" className="text-gray-300">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                required
                value={data.password_confirmation}
                onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                disabled={processing}
                placeholder="••••••••"
                className="bg-gray-700 border-gray-600 text-white focus:ring-yellow-400 focus:border-yellow-400"
              />
              <InputError message={errors.password_confirmation} />
            </div>
          </div>
        </div>

        {/* Terms + Submit */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              required
              className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-600 rounded bg-gray-700"
            />
            <Label htmlFor="terms" className="text-gray-300 text-sm">
              I confirm that I am 18+ years old and accept the 
              <TextLink href="/terms" className="text-yellow-400 hover:text-yellow-300 ml-1">
                Terms & Conditions
              </TextLink>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full py-6 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold text-lg"
            disabled={processing}
          >
            {processing ? <LoaderCircle className="h-5 w-5 animate-spin text-black" /> : "CLAIM MY BONUS NOW"}
          </Button>
        </div>

        <div className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <TextLink href="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold">
            Log in here
          </TextLink>
        </div>
      </form>
    </div>
  );
}
