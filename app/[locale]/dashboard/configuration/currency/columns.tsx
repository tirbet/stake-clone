"use client";

import { InferResponseType } from "hono";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Actions } from "./actions";
import { client } from "@/lib/hono";
import { Checkbox } from "@/components/ui/checkbox";

// ✅ Infer API response type
export type ResponseType = InferResponseType<
  typeof client.api.admin.currency.$get,
  200
>["currencies"][0];

export const columns: ColumnDef<ResponseType>[] = [
  // Checkbox column for multi-select actions (optional)
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Currency name
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.original.name}
      </span>
    ),
  },

  // Code
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => (
      <span className="uppercase text-muted-foreground">
        {row.original.code}
      </span>
    ),
  },

  // Symbol
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => <span>{row.original.symbol || "—"}</span>,
  },

  // Use Rate
  {
    accessorKey: "useRate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Use Rate
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    )    
  },

  // Status
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant={row.original.isActive ? "default" : "destructive"}
        className="capitalize"
      >
        {row.original.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },

  // Actions column
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
