<template>
  <div class="grid">
    <div
      class="col-12 md:col-6 lg:col-4 xl:col-4 flex align-items-center justify-content-center"
      v-for="(beer, beerIndex) in beers"
      :key="beerIndex"
      @click="goToBeer(beer.id)"
    >
      <Card style="height: 10em; background-color: #edede9">
        <template #title> {{ beer.name }} </template>
        <template #content>
          <div class="flex align-items-center justify-content-center flex-row">
            <Tag class="mr-2" :value="'IBU: ' + beer.ibu"></Tag>
            <Tag
              class="mr-2"
              severity="success"
              :value="'Food Pairing: ' + beer.food_pairing.length"
            ></Tag>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import BeerInterface from "@/models/beer/Beer.interface";
import Tag from "primevue/tag";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "BeersList",
  components: { Tag },
  props: {
    beers: {
      required: true,
      type: Array as PropType<BeerInterface[]>,
    },
  },
  setup(props) {
    // const filteredData = () => {
    //   props.beers.forEach((item) => {
    //     const match = new RegExp(props.searchName);
    //   });
    // };
    const router = useRouter();
    const goToBeer = (id: number) => {
      router.push({ path: `/beer/${id}` });
    };
    return { goToBeer };
  },
});
</script>
<style lang="scss" scoped>
.grid {
  height: 100%;
  position: relative;
  top: 15%;
  @media screen and (max-width: 767px) {
    top: 25%;
  }
}
::v-deep(.p-card) {
 min-width: 20em;
 width: 30em;
 margin: 1em;
  .p-card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .p-card-title {
    font-size: 1.7em;
    font-family: 'Abril Fatface', cursive;
    flex: 1;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .p-tag:first-child {
    background-color: rgb(144, 97, 97)
  }
  .p-tag:nth-child(2) {
    background-color: rgb(106, 121, 52)
  }
  .p-tag:hover {
    animation: grow 0.5s;
  }
}
::v-deep(.p-card:hover) {
  animation: grow 0.5s;
}
</style>
