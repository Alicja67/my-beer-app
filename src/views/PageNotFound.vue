<template>
  <img src="../assets/images/not-found.jpg" alt="Not Found" @click="goHome" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import router from '../router';

export default defineComponent({
  name: 'PageNotFound',
  setup(){
    const goHome = () => {
      router.push('/');
    }

    return {
      goHome,
    }
  }
});
</script>
<style>
  img {
    /* max-width: 1920px;
    max-height: 1080px; */
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
</style>
