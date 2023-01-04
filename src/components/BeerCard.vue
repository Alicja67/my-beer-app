<template>
  <div class="grid">
    <Button @click="goBack" class="cursor-pointer surface-800 back">Back</Button>
    <div class="col-3 pt-5">
      <Image
        :src="results.image_url"
        :alt="results.name"
        imageStyle="width: 8em; max-height: 30em"
      ></Image>
      <div class="grid-column">
        <h4 class="text-3xl">Food Pairing:</h4>
        <ul class="list-disc text-left pl-8">
          <li v-for="(el, index) in results.food_pairing" :key="index">
            {{ el }}
          </li>
        </ul>
        <Tag class="text-2xl p-2 mt-4 surface-700 pl-4 pr-4">Author: {{ author }}</Tag>
      </div>
    </div>
    <div class="col-9 text-left pt-8 pr-8 pb-8">
      <Card style="height: 100%">
        <template #title> {{ results.name }} </template>
        <template #subtitle>
          <div class="flex align-items-center justify-content-start flex-row">
            <Tag class="mr-3 text-xl" :value="results.tagline"></Tag>
            <Tag class="mr-3 text-xl" :value="'IBU: ' + results.ibu"></Tag>
            <Tag
              class="mr-3 text-xl"
              severity="success"
              :value="'ABV: ' + results.abv"
            ></Tag>
          </div>
        </template>
        <template #content> {{ results.description }}</template>
      </Card>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import axios from "axios";
import BeerType from "../types/Beer";
import { useRouter } from "vue-router";

type BeerCardProps = { beerId: number };

export default defineComponent({
  name: "BeerCard",
  props: {
    beerId: {
      type: Number,
      required: true,
    },
  },
  setup(props: BeerCardProps) {
    const results = ref<BeerType>({});
    const router = useRouter();
    const author = ref("");
    const goBack = () => {
      router.push({ path: "/" });
    };
    return { results, goBack, author };
  },
  methods: {
    getApiData() {
      axios
        .get(`https://api.punkapi.com/v2/beers/${this.beerId}`)
        .then((response) => {
          this.results = response.data[0];
          this.catchNickname(this.results.contributed_by);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    catchNickname(name: string) {
      const regex = /(?<=\<)(.*?)(?=\>)/;
      const myArray = [];
      const match = regex.exec(name)[0];
      console.log(match);
      this.author = match;
    },
  },
  // computed: {
  //     catchNickname(name: string) {
  //       const regex = new RegExp(/\[(.*?)\]/);
  //       const aaa = 'Autor <dasfsdaf>';
  //       const matched = aaa.match(regex);
  //       console.log(matched);
  //       return matched
  //     },
  //   },
  mounted() {
    this.getApiData();
  },
});
</script>
<style lang="scss" scoped>
.grid {
  background: rgb(239, 235, 235);
  height: 100%;
}
::v-deep(.p-card) {
  .p-card-title {
    font-family: "Abril Fatface", cursive;
    font-size: 3.5em;
    animation-name: rotateRight;
    animation-duration: 1s;
    animation-iteration-count: 1;
    transform-origin: center;
    animation-fill-mode: forwards;
    opacity: 0;
    margin: 6% 0;
    animation-fill-mode: forwards;
  }
  .p-card-subtitle {
    font-size: 1.3em;
    .p-tag:first-child {
      background-color: rgb(144, 97, 97);
    }
    .p-tag:nth-child(2) {
      background-color: rgb(106, 121, 52);
    }
    .p-tag:hover {
      animation: grow 0.5s;
    }
  }
  .p-card-content {
    font-size: 2.5em;
    line-height: 1.5;
  }
  
}
::v-deep(.p-button) {
  position: absolute;
  top: 1%;
  right: 1%;
  color: white;
  font-size: 1.3em;
  transition: all 0.5s ease-in-out;
  z-index: 1;
}
::v-deep(.p-button:hover) {
  animation: grow 0.5s;
}
::v-deep(.p-tag:hover) {
  animation: grow 0.5s;
}
</style>
