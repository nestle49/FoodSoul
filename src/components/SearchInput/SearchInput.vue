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
import useFetchData from "./composables/useFetchData";
import SearchResult from "../SearchResult";
import { ref, defineComponent, onServerPrefetch } from "vue";
export default defineComponent({
  components: { SearchResult },
  setup() {
    const inputText = ref<string>("");

    const { isFetching, serverResponse } = useFetchData(inputText);

    onServerPrefetch(() => {});

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