import { ref, watch } from "vue";
import { Data } from "../../SearchResult/types";

interface refText {
  value: string | number
}

export default function useFetchData(text: refText) {
    const serverResponse = ref<Array<{} & Data>>([]);
    const timeoutId = ref();
    const isFetching = ref(false);

    function fetchData() {
      if (!text.value) return;
      isFetching.value = true;
      clearTimeout(timeoutId.value);

      timeoutId.value = setTimeout(async () => {
        try {
          const url = new URL("https://nominatim.openstreetmap.org/search");
          url.searchParams.append("city", String(text.value));
          url.searchParams.append("format", "json");
          url.searchParams.append("limit", "10");

          const res = await fetch(String(url));

          if (!res.ok) {
            throw new Error(res.statusText);
          }
          serverResponse.value = await res.json();
        } catch (error) {
          console.error(error);
        } finally {
          isFetching.value = false;
        }
      }, 200);
    }

    watch(text, async () => {
      await fetchData();
    });

    return { isFetching, serverResponse }
}
