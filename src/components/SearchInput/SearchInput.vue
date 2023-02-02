<template>
  <div class="search">
    <h1>Введите вашь запрос</h1>
    <p v-if="isFetching">Обработка запроса...</p>

    <input class="search__native-input" type="text" v-model="inputText" />

    <ul v-if="serverResponse.length" class="search__results">
      <SearchResult
        v-for="(item, id) in serverResponse"
        :dataObject="item"
        :key="id"
      />
    </ul>
    <p v-else-if="inputText && !isFetching">Ничего не надйено</p>
  </div>
</template>

<script lang="ts">
import SearchResult from "../SearchResult";
import { Data } from "../SearchResult/types";
import { ref, watch, defineComponent } from "vue";
export default defineComponent({
  components: { SearchResult },
  setup() {
    const inputText = ref<string>("");
    const serverResponse = ref([]);
    const timeoutId = ref();
    const isFetching = ref(false);

    function fetchData() {
      if (!inputText.value) return;
      isFetching.value = true;
      clearTimeout(timeoutId.value);

      timeoutId.value = setTimeout(async () => {
        const url = new URL("https://nominatim.openstreetmap.org/search");
        url.searchParams.append("city", String(inputText.value));
        url.searchParams.append("format", "json");
        url.searchParams.append("limit", "10");

        const res = await fetch(String(url));
        serverResponse.value = await res.json();

        isFetching.value = false;
      }, 500);
    }

    watch(inputText, async () => {
      await fetchData();
    });

    return { inputText, serverResponse, isFetching };
  },
});
</script>

<style lang="scss">
  .search {
    h1 {
      margin-bottom: 16px;
    }

    &__native-input {
      padding: 5px 10px;
      margin-bottom: 16px;
    }

    &__results {
      & > *:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
</style>