<script setup lang="ts">
import { useMessage, useNotification } from "naive-ui"


window.$notification = useNotification()
window.$message = useMessage()

onMounted(() => {
  window.$notification = useNotification()
  window.$message = useMessage()
})
</script>

<template>
  <RouterView></RouterView>
</template>

<style></style>
