import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { User } from "@prisma/client";

interface ProfileResponse {
  ok: boolean;
  profile: User;
}

// const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useUser() {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl("/api/users/me");
  }, []);
  const { data, error } = useSWR<ProfileResponse>(
    typeof window === "undefined" ? null : url
  );
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
}
