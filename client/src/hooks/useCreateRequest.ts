import { useState } from "react";
import {
  createRequestRequest,
  type CreateRequestInput,
} from "../lib/request-api";

export function useCreateRequest() {
  const [isCreating, setIsCreating] = useState(false);
  const [createErrorMessage, setCreateErrorMessage] = useState("");

  async function submitCreateRequest(input: CreateRequestInput) {
    setIsCreating(true);
    setCreateErrorMessage("");

    try {
      const result = await createRequestRequest(input);
      return result;
    } catch {
      setCreateErrorMessage("Creating the request failed.");
      return null;
    } finally {
      setIsCreating(false);
    }
  }

  return {
    isCreating,
    createErrorMessage,
    submitCreateRequest,
  };
}
