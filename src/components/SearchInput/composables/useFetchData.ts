import { ref, watch } from "vue";
import { useSearchStore, Response} from '@/store/search'
import { storeToRefs } from 'pinia'
interface refText {
  value: string | number
}

export default function useFetchData(text: refText) {
    const store = useSearchStore()
    const timeoutId = ref();
    const isFetching = ref(false);

    const { serverResponse } = storeToRefs(store)
    const { getSearchByText } = store

    function fetchData(): Response | void {
      if (!text.value) return;
      isFetching.value = true;
      clearTimeout(timeoutId.value);

      timeoutId.value = setTimeout(() => {
        getSearchByText(String(text.value))
          .then(() => {
            isFetching.value = false
          })
      },200);
    }

    watch(text, async () => {
      await fetchData();
    });

    return { isFetching, serverResponse }
}
