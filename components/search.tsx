"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, SearchIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Search() {
  const [category, setCategory] = useState("Casino");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ["Casino", "Sports"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full max-w-full" ref={dropdownRef}>
      {/* Outer container */}
      <div
        className={cn(
          "flex items-center rounded",
          "border-[var(--input-border-width)_solid_var(--input-border)]",
          "shadow-[var(--input-box-shadow)]",
          "bg-[var(--grey-700)]"
        )}
        style={{
          color: "var(--input-color)",
          fontWeight: "var(--input-font-weight)",
        }}
      >
        {/* Dropdown button */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center px-[var(--space-4)] py-[var(--space-2)]"
          >
            {category}
            {open ? (
              <ChevronUp size={16} className="ml-1" />
            ) : (
              <ChevronDown size={16} className="ml-1" />
            )}
          </button>
          {open && (
            <div
              className="absolute left-0 top-full mt-1 w-28 rounded shadow-lg z-10"
              style={{
                background: "var(--white)",
                color: "var(--grey-700)",
              }}
            >
              {categories.map((cat) => (
                <div
                  key={cat}
                  className="px-3 py-2 hover:bg-[var(--grey-100)] cursor-pointer"
                  onClick={() => {
                    setCategory(cat);
                    setOpen(false);
                  }}
                >
                  {cat}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div
          className="h-5 w-px mx-[var(--space-2)]"
          style={{ backgroundColor: "var(--input-button-divider)" }}
        />

        {/* Search input */}
        <div className="relative flex-1">
          <SearchIcon
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: "var(--input-placeholder)" }}
          />
          <Input
            type="search"
            placeholder={`Search your ${category === "Casino" ? "game" : "event"}`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 border-none focus-visible:ring-0 bg-transparent"
            style={{
              color: "var(--input-color)",
              fontWeight: "var(--input-font-weight)",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--input-placeholder)" }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
