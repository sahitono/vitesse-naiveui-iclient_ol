import path from "path"
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import Pages from "vite-plugin-pages"
import Layouts from "vite-plugin-vue-layouts"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import { viteExternalsPlugin } from "vite-plugin-externals"

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          ol: ["ol"],
          "iclient-ol": ["@supermap/iclient-ol"]
        }
      }
    }
  },
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`
    }
  },
  plugins: [
    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: true
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true
    }),

    // https://github.com/antfu/unocss
    viteExternalsPlugin(
      {
        echarts: "function(){try{return echarts}catch(e){return {}}}()",
        mapv: "function(){try{return mapv}catch(e){return {}}}()",
        elasticsearch: "function(){try{return elasticsearch}catch(e){return {}}}()",
        "@tensorflow/tfjs": "function(){try{return tf}catch(e){return {}}}()",
        "@turf/turf": "function(){try{return turf}catch(e){return {}}}()",
        "deck.gl": "(function(){try{return DeckGL}catch(e){return {}}})()",
        "luma.gl": "(function(){try{return luma}catch(e){return {}}})()",
        "webgl-debug": "(function(){try{return webgl-debug}catch(e){return {}}})()",
        xlsx: "function(){try{return XLSX}catch(e){return {}}}()",
        jsonsql: "function(){try{return jsonsql}catch(e){return {}}}()"
      },
      { useWindow: false }
    )
  ],

  optimizeDeps: {
    include: ["vue", "vue-router", "@vueuse/core"],
    exclude: ["vue-demi"]
  },

  test: {
    environment: "jsdom",
    deps: {
      inline: ["@vue", "@vueuse", "vue-demi"]
    }
  }
})
