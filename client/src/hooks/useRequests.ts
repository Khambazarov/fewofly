import { useState } from "react";
import { getRequestsRequest, type RequestItem } from "../lib/request-api";

export function useRequests() {
  const [requests, setRequests] = useState<RequestItem[]>([]);

  async function loadRequests() {
    try {
      const result = await getRequestsRequest();
      setRequests(result);
      return result;
    } catch {
      setRequests([]);
      return [];
    }
  }

  return {
    requests,
    loadRequests,
  };
}
