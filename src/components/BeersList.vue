<template>
  <div class="beers-list-container">
    <div class="beer-card-container" v-for="(beer, beerIndex) in beers" :key="beerIndex" @click="goToBeer(beer.id)">
      <h1 class="name">{{ beer.name }}</h1>
      <div class="beer-details">
        <p>IBU: {{ beer.ibu }}</p>
        <p>Food Pairing: {{ beer.food_pairing.length }}</p>
      </div>
    </div>
    <!-- <pagination-page></pagination-page> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import BeerType from '../types/Beer';
import { useRouter } from 'vue-router';
import PaginationPage from './PaginationPage.vue';

export default defineComponent({
  name: 'BeersList',
  components: { PaginationPage },
  props: {
    beers: {
      required: true,
      type: Array as PropType<BeerType[]>,
    },
  },
  setup(props) {
    const filteredData = () => {
      props.beers.forEach((item) => {
        const match = new RegExp(props.searchName);
      });
    };
    const router = useRouter();
    const goToBeer = (id: number) => {
      router.push({ path: `/beer/${id}` });
    };
    return { goToBeer };
  },
});
</script>
<style lang="scss" scoped>
.beers-list-container {
  position: relative;
  top: 12%;
  // width: 100%;
  padding: 60px 100px;
  height: 100%;
  margin-bottom: 6%;
  padding: auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  overflow-y: scroll;
  font-family: 'Poppins', sans-serif;
  background-image: radial-gradient(circle farthest-side, #fceabb, #f8b500);

  .beer-card-container {
    border-radius: 30px;
    height: 200px;
    // border: 3px solid black;
    background: rgba(0, 0, 0, 0.5);
    color: rgb(219, 235, 218);
    -webkit-box-shadow: 0px 0px 8px -1px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 8px -1px rgba(66, 68, 90, 1);
    box-shadow: 0px 0px 8px -1px rgba(66, 68, 90, 1);
    .name {
      font-family: 'Abril Fatface', cursive;
      font-size: 1.8em;
      padding: 20px;
      text-align: center;
    }
    .beer-details {
      display: flex;
      font-size: 1.3em;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
  }
}
@media screen and (max-width: 850px) {
  .beers-list-container {
    width: 100%;
    top: 20%;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 30px;
    grid-row-gap: 30px;
    padding: 0;
    padding-top: 4%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .beer-card-container {
      width: 80%
    }
  }
}
</style>
