<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
#app {
  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box !important;
    -moz-box-sizing: border-box !important;
    -ms-box-sizing: border-box !important;
    box-sizing: border-box !important;
  }
  padding: 0;
  margin: 0;
  max-width: 1920px;
  height: 100%;
  width: 100vw;
  overflow: hidden;
  // overflow-y: auto;
}
</style>
