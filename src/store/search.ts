import {ref, computed} from 'vue'
import { defineStore } from 'pinia'
import { Data } from "@/components/SearchResult/types";

export type Response = Array<{} & Data>

export const useSearchStore = defineStore('search', () => {
  const serverResponse = ref([] as Response)

  async function getSearchByText(text: string) {
    try {
      const url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.append("city", String(text));
      url.searchParams.append("format", "json");
      url.searchParams.append("limit", "10");

      const res = await fetch(String(url));

      if (!res.ok) {
        throw new Error(res.statusText);
      }
      serverResponse.value = await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  return {
    getSearchByText,
    serverResponse
  }
})