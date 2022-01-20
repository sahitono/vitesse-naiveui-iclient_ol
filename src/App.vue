<script setup lang="ts">
import { NConfigProvider, NLoadingBarProvider, NMessageProvider } from "naive-ui"
</script>

<template>
  <n-config-provider style="width: 100%; height: 100%">
    <n-message-provider style="width: 100%; height: 100%">
      <n-loading-bar-provider style="width: 100%; height: 100%">
        <router-view></router-view
      ></n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Poppins");

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  /* font-size: 14px; */
}

#app {
  width: 100%;
  height: 100%;
}
</style>
