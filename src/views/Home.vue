<template>
  <div class="grid">
    <Toast position="top-left" group="tl" />
    <div
      class="col-12 surface-900 p-4 top-0 flex flex-row justify-content-between align-content-center"
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
                <Button icon="pi pi-caret-up"></Button>
              </div>
              <div v-else>
                <Button icon="pi pi-caret-down"></Button>
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
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref } from "vue";
import axios from "axios";
import BeerInterface from "@/models/beer/Beer.interface";
import BeersList from "@/components/BeersList.vue";
import { useToast } from "primevue/usetoast";

export default defineComponent({
  name: "Home",
  components: { BeersList },
  setup() {
    let results = ref<BeerInterface[]>([]);
    let searchName = ref("");
    const totalItemsCount = ref(100);
    const rows = 25;
    let searchIbu: Ref<number | null | any> = ref(null);
    let ibu_gt = ref(true);
    let url = ref("https://api.punkapi.com/v2/beers");

    const toast = useToast();

    const showInfo = (severity: string, summary: string, detail: string) => {
      toast.add({
        severity: `${severity}`,
        summary: `${summary}`,
        detail: `${detail}`,
        group: "tl",
        life: 3000,
      });
    };

    const onPage = (event: any) => {
      url.value = `https://api.punkapi.com/v2/beers?page=${
        event.page + 1
      }&per_page=25`;
      getApiData();
    };

    const handleSearch = () => {
      
      if (searchName.value !== "" && searchIbu.value === null ) {
        // console.log("Podano tylko name");
        url.value = `https://api.punkapi.com/v2/beers?beer_name=${searchName.value}`;
        getApiData();
        searchName.value = "";
      } else if (searchIbu.value !== null && searchName.value === "") {
        // console.log("Podano tylko ibu", ibu_gt.value);
        if (!validateIbu(searchIbu.value)){
          showInfo(
          "warn",
          "Zły IBU",
          "proszę o podanie liczby"
        );
        handleReset();
        }
        if (ibu_gt.value) {
          url.value = `https://api.punkapi.com/v2/beers?ibu_gt=${searchIbu.value}`;
        } else {
          url.value = `https://api.punkapi.com/v2/beers?ibu_lt=${searchIbu.value}`;
        }
        getApiData();
        // searchIbu.value = null;
        searchName.value = "";
      } else if (searchIbu.value !== null && searchName.value !== "") {
        // console.log("Podano name & ibu");
        if (ibu_gt) {
          url.value = `https://api.punkapi.com/v2/beers?beer_name=${searchName.value}&ibu_gt=${searchIbu.value}`;
        } else {
          url.value = `https://api.punkapi.com/v2/beers?beer_name=${searchName.value}&ibu_lt=${searchIbu.value}`;
        }
        getApiData();
        // searchIbu.value = null;
        searchName.value = "";
      } else {
        console.log("Nic nie wybrano");
        url.value = "https://api.punkapi.com/v2/beers";
        getApiData();
        searchName.value = "";
        // searchIbu.value = null;
        showInfo(
          "warn",
          "Brak danych",
          "Wpisz nazwę/IBU w celu filtrowania danych"
        );
      }
    }
    
    const handleReset = () => {
      url.value = "https://api.punkapi.com/v2/beers";
      getApiData();
      searchIbu.value = null;
      // showInfo("info", "Wyczyszczono filtry", "");
    }

    const toggleIbu = () => {
      ibu_gt.value = !ibu_gt.value;
      handleSearch();
      // console.log("ibu gt", ibu_gt.value);
    }

    const ibuOption = computed(() => {
      return ibu_gt.value ? true : false;
    });

    async function getApiData() {
      await axios
        .get(url.value)
        .then((response) => {
          if (response.data) {
            if (response.data.length === 0) {
              showInfo(
                "warn",
                "Brak danych",
                "Nie ma elementów o podanych parametrach"
              );
              handleReset();
            } else {
              results.value = response.data;
            }
          } else {
            showInfo("error", "Network Error", "");
          }
        })
        .catch((error) => {
          console.log(error.message);
          // alert(error.message);
          showInfo("error", "Brak lub błędne dane", error.message);
        });
    }

    const validateIbu = (ibu: any) => {
      const regex = new RegExp("^[0-9]");
      console.log(regex.test(ibu));
      if (regex.test(ibu)) return true;
      else return false;
    };

    onMounted(() => {
      getApiData();
    });

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
