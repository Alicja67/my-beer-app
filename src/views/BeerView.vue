<template>
  <beer-card :beer-id="parseInt(beerId)"></beer-card>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent } from 'vue';
import BeerCard from '../components/BeerCard.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  components: { BeerCard },
  setup() {
    const router = useRoute();
    const beerId = computed(() => router.params.id) as ComputedRef<string>;
    return { beerId };
  },
});
</script>
<style lang=""></style>
