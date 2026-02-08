import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

type SportResponseType = InferResponseType<typeof client.api.sports[':status']['$get']>;
