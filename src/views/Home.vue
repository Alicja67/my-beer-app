<template>
  <div class="app">
    <div class="header">
      <p>Beer index</p>
      <nav class="grid p-fluid">
        <div class="col-12 md:col-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText placeholder="Search by name" v-model="searchName" @keyup.enter="handleSearch" />
          </span>
        </div>

        <div class="col-12 md:col-3">
          <div class="p-inputgroup">
            <InputText placeholder="Search by IBU" v-model="searchIbu" @keyup.enter="handleSearch" />
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

        <div class="col-6 md:col-3">
          <Button
            class="form-button p-button-success p-button-rounded"
            icon="pi pi-check-circle"
            type="submit"
            @click="handleSearch"
            label="Search"
          ></Button>
        </div>

        <div class="col-6 md:col-3">
          <Button
            class="form-button p-button-warning p-button-rounded"
            icon="pi pi-times-circle"
            @click="handleReset"
            label="Clear"
          ></Button>
        </div>
      </nav>
    </div>
    <beers-list :beers="results" :searchName="searchName"></beers-list>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref, Ref } from "vue";
import axios from "axios";
import BeerType from "../types/Beer";
import BeersList from "../components/BeersList.vue";

export default defineComponent({
  name: "Home",
  components: { BeersList },
  setup() {
    let results = ref<BeerType[]>([]);
    let searchName = ref("");
    let searchIbu: Ref<number | null> = ref(null);
    let ibu_gt = ref(false);
    let url = ref("https://api.punkapi.com/v2/beers");

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
    };
  },
});
</script>
<style lang="scss" scoped>
.app {
  height: 100vh;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 12%;
    background: rgb(58, 56, 56);
    position: fixed;
    z-index: 1;

    p {
      font-size: 30px;
      color: white;
      z-index: 1;
      margin-left: 20px;
    }
  }
}
@media screen and (max-width: 850px) {
  .app {
    // width: 100%;
    .header {
      justify-content: center;
      align-items: center;

      p {
        display: none;
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .app {
    .header {
      height: 20%;
    }
  }
}
</style>
