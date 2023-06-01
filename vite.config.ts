import path from "path"
import { defineConfig } from "vite"
import Vue from "@vitejs/plugin-vue"
import Pages from "vite-plugin-pages"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import { NaiveUiResolver } from "unplugin-vue-components/resolvers"
import { viteExternalsPlugin } from "vite-plugin-externals"
import Unocss from "unocss/vite"
import VueMacros from "unplugin-vue-macros/vite"
import VueDevTools from "vite-plugin-vue-devtools"

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
    VueDevTools(),
    VueMacros({
      defineOptions: false,
      defineModels: false,
      plugins: {
        vue: Vue({
          script: {
            propsDestructure: true,
            defineModel: true
          }
        })
      }
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ["vue", "vue-router", "@vueuse/core"],
      dts: "src/auto-imports.d.ts",
      dirs: ["./src/composables"],
      vueTemplate: true
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [NaiveUiResolver()],
      dts: "src/components.d.ts",
      dirs: ["./src/components/", "./src/layouts/"],
      deep: true
    }),
    Unocss(),

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
  }
})
