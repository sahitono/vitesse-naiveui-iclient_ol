<script setup lang="ts">
import { useCssVar } from "@vueuse/core"
import type { GlobalThemeOverrides } from "naive-ui"
import { NMessageProvider, NNotificationProvider } from "naive-ui"

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: useCssVar("--primary-color").value,
    primaryColorHover: useCssVar("--primary-color-hover").value,
    primaryColorPressed: useCssVar("--primary-color-pressed").value,
    borderRadius: "0.7rem",
    fontFamily: `"Inter Variable", sans-serif`
  },
  DataTable: {
    fontSizeSmall: "12px",
    thFontWeight: "500"
  },
  Menu: {},
  Spin: {
    color: useCssVar("--primary-color").value
  },
  Drawer: {
    titleFontSize: "1rem"
  },
  Message: {
    // maxWidth: ui.isDesktop ? undefined : mobileMaxWidthMessage,
    // fontSize: "16px"
  },
  Skeleton: {
    // color: "rgba(1, 123, 137, 0.2)",
    // colorEnd: "rgba(1, 123, 137, 0.99)"
  },
  Carousel: {
    dotColor: "rgba(112, 112, 112, 0.5)",
    dotColorFocus: "rgba(112, 112, 112, 0.5)",
    dotColorActive: "rgb(112, 112, 112)"
  }
}
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides">
    <NGlobalStyle />
    <NLoadingBarProvider>
      <NNotificationProvider>
        <NMessageProvider>
          <slot></slot>
        </NMessageProvider>
      </NNotificationProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
