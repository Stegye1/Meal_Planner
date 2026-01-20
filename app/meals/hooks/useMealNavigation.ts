"use client";

import { useRouter } from "next/navigation";

export function useMealNavigation() {
  const router = useRouter();

  const goToList = () => {
    router.push("/meals");
  };

  return { goToList };
}
