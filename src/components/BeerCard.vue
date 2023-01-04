<template>
  <div class="beer-card">
    <button class="back" @click="goBack">Back</button>
    <div class="card-container">
      <div class="img-container">
        <img :src="results.image_url" :alt="results.name" />
      </div>
      <div class="card-details">
        <h3 class="beer name">{{ results.name }}</h3>
        <div class="more-info">
          <p>
            <span>{{ results.tagline }}</span>
          </p>
          <p><span>IBU: </span>{{ results.ibu }}</p>
          <p><span>ABV: </span>{{ results.abv }}</p>
        </div>
        <h3 class="beer description">{{ results.description }}</h3>
      </div>
      <div class="beer-details-more">
        <h4 class="pairing">Food Pairing:</h4>
        <ul class="foor-pairing-list">
          <li v-for="(el, index) in results.food_pairing" :key="index">{{ el }}</li>
        </ul>
        <h4 class="author">Author: {{ author }}</h4>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import axios from 'axios';
import BeerType from '../types/Beer';
import { useRouter } from 'vue-router';

type BeerCardProps = { beerId: number };

export default defineComponent({
  name: 'BeerCard',
  props: {
    beerId: {
      type: Number,
      required: true,
    },
  },
  setup(props: BeerCardProps) {
    const results = ref<BeerType>({});
    const router = useRouter();
    const author = ref('');
    const goBack = () => {
      router.push({ path: '/' });
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
.beer-card {
  width: 100vw;
  height: 100vh;
  background-image: radial-gradient(circle farthest-side, #fceabb, #f8b500);
  .back {
    position: absolute;
    top: 2%;
    right: 2%;
    background: rgb(48, 48, 45);
    color: white;
    border-radius: 30px;
    padding: 15px;
    font-size: 1.3em;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    z-index: 1;
  }
  .back:hover {
    animation: grow 0.5s;
  }
  .card-container {
    position: relative;
    text-align: left;
    height: 100%;
    // padding: 4%;
    display: grid;
    grid-template-columns: 30% 70%;
    grid-template-rows: 60% 40%;
    .img-container {
      margin: auto;
      img {
        width: 100%;
        height: 100%;
        max-height: 500px;
      }
    }
    .card-details {
      .name {
        font-family: 'Abril Fatface', cursive;
        font-size: 4em;
        animation-name: rotateRight;
        animation-duration: 1s;
        animation-iteration-count: 1;
        transform-origin: center;
        animation-fill-mode: forwards;
        opacity: 0;
        margin: 8% 0;
        animation-fill-mode: forwards;
      }
      .more-info {
        display: flex;
        flex-direction: row;
        font-size: 1.4em;
        p {
          padding: 15px;
          border: 1px solid black;
          margin: 10px;
          border-radius: 30px;
          background: rgba(0, 0, 0, 0.5);
          color: rgb(214, 208, 208);
          transition: all 0.2s ease-in-out;
          span {
            font-weight: 700;
          }
        }
        p:hover {
          // transform: scale(1.05);
          animation: grow 0.3s;
        }
      }
      .description {
        font-size: 3em;
        line-height: 120%;
        padding-right: 7%;
      }
    }
    .beer-details-more {
      font-size: 1.4em;
      margin: 0 auto;
      padding: 0 14%;
      .pairing {
        margin: 0;
        font-size: 1.5em;
        margin: 15px;
        text-align: center;
      }
      ul {
        padding-bottom: 10px;
        margin: 0;
        li {
          padding: 8px;
        }
        li::marker {
          content: '\2023';
        }
      }
      .author {
        padding: 15px;
        text-align: center;
        border: 1px solid black;
        margin: 10px;
        border-radius: 30px;
        background: rgba(0, 0, 0, 0.7);
        color: rgb(214, 208, 208);
        transition: all 0.2s ease-in-out;
      }
      .author:hover {
        // transform: scale(1.05);
        animation: grow 0.3s;
      }
    }
  }
}
</style>
