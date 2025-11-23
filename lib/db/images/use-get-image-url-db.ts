import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

export function useGetImageUrlDB(storageId: Id<"_storage"> | undefined) {
  const url = useQuery(
    api.queries.getImageUrl.getImageUrl,
    storageId ? { storageId } : "skip"
  );
  return url || null;
}
