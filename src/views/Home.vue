<template>
  <div class="grid">
    <div
      class="col-12 surface-900 p-4 flex flex-row justify-content-between align-content-center"
    >
      <p class="text-2xl text-white">Beer index</p>
      <nav class="grid p-fluid justify-content-end align-items-center mr-1">
        <div class="col-12 md:col-4">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              placeholder="Search by name"
              v-model="searchName"
              @keyup.enter="handleSearch"
            />
          </span>
        </div>

        <div class="col-12 md:col-3">
          <div class="p-inputgroup">
            <InputText
              placeholder="Search by IBU"
              v-model="searchIbu"
              @keyup.enter="handleSearch"
            />
            <div @click="toggleIbu">
              <div v-if="ibuOption">
                <Button icon="pi pi-caret-down"></Button>
              </div>
              <div v-else>
                <Button icon="pi pi-caret-up"></Button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6 md:col-2">
          <Button
            class="form-button p-button-success"
            icon="pi pi-check-circle"
            type="submit"
            @click="handleSearch"
            label="Search"
          ></Button>
        </div>

        <div class="col-6 md:col-2">
          <Button
            class="form-button p-button-warning"
            icon="pi pi-times-circle"
            @click="handleReset"
            label="Clear"
          ></Button>
        </div>
      </nav>
    </div>

    <beers-list
      class="col-12"
      :beers="results"
      :searchName="searchName"
    ></beers-list>
    <Paginator
      class="col-12 flex justify-content-end align-content-end"
      :rows="rows"
      :totalRecords="totalItemsCount"
      @page="onPage($event)"
    ></Paginator>
    <!-- <pagination-page class="pagination"></pagination-page> -->
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref } from "vue";
import axios from "axios";
import BeerType from "../types/Beer";
import BeersList from "../components/BeersList.vue";
// import PaginationPage from "../components/PaginationPage.vue";

export default defineComponent({
  name: "Home",
  components: { BeersList },
  setup() {
    let results = ref<BeerType[]>([]);
    let searchName = ref('');
    const totalItemsCount = ref(100);
    const rows = (25);
    let searchIbu: Ref<number | null> = ref(null);
    let ibu_gt = ref(false);
    let url = ref("https://api.punkapi.com/v2/beers");

    const onPage = (event: any) => {
      console.log(event);
      url.value = `https://api.punkapi.com/v2/beers?page=${
        event.page + 1
      }&per_page=25`;
      // console.log('url', url.value);
      getApiData();
    };

    function handleSearch() {
      if (searchName.value !== "" && searchIbu.value === null) {
        console.log("Podano tylko name");
        url.value = `https://api.punkapi.com/v2/beers?beer_name=${searchName.value}`;
        getApiData();
        searchName.value = "";
      } else if (searchIbu.value !== null && searchName.value === "") {
        console.log("Podano tylko ibu", ibu_gt);
        if (ibu_gt) {
          url.value = `https://api.punkapi.com/v2/beers?ibu_gt=${searchIbu.value}`;
        } else {
          url.value = `https://api.punkapi.com/v2/beers?ibu_lt=${searchIbu.value}`;
        }
        getApiData();
        searchIbu.value = null;
        searchName.value = "";
      } else if (searchIbu.value !== null && searchName.value !== "") {
        console.log("Podano name & ibu");
        if (ibu_gt) {
          url.value = `https://api.punkapi.com/v2/beers?beer_name=${searchName.value}&ibu_gt=${searchIbu.value}`;
        } else {
          url.value = `https://api.punkapi.com/v2/beers?beer_name=${searchName.value}&ibu_lt=${searchIbu.value}`;
        }
        getApiData();
        searchIbu.value = null;
        searchName.value = "";
      } else {
        console.log("Nic nie wybrano");
        url.value = "https://api.punkapi.com/v2/beers";
        getApiData();
        searchName.value = "";
        searchIbu.value = null;
      }
    }
    function handleReset() {
      url.value = "https://api.punkapi.com/v2/beers";
      getApiData();
    }
    function toggleIbu() {
      ibu_gt.value = !ibu_gt.value;
      console.log("ibu gt", ibu_gt.value);
    }
    const ibuOption = computed(() => {
      return ibu_gt.value ? true : false;
    });

    async function getApiData() {
      await axios
        .get(url.value)
        .then((response) => {
          if (response.data) {
            results.value = response.data;
            console.log("results", results);
          } else {
            alert("Network Error");
          }
        })
        .catch((error) => {
          console.log(error.message);
          alert(error.message);
        });
    }

    onMounted(() => {
      getApiData();
    });
    // const findByName = computed(() => {

    // });

    return {
      results,
      searchName,
      searchIbu,
      handleSearch,
      handleReset,
      getApiData,
      toggleIbu,
      ibu_gt,
      ibuOption,
      onPage,
      totalItemsCount,
      rows,
    };
  },
});
</script>
<style lang="scss" scoped>
p {
  @media screen and (max-width: 850px) {
    display: none;
  }
}
</style>
