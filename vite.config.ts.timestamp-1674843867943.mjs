// vite.config.ts
import { defineConfig } from "file:///C:/Users/poesh/Desktop/poe-blocklist/poe-blocklist/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/poesh/Desktop/poe-blocklist/poe-blocklist/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { crx } from "file:///C:/Users/poesh/Desktop/poe-blocklist/poe-blocklist/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.config.ts
import { defineManifest } from "file:///C:/Users/poesh/Desktop/poe-blocklist/poe-blocklist/node_modules/@crxjs/vite-plugin/dist/index.mjs";
var manifest = {
  name: "Path of exile blocklist",
  version: "0.6.2",
  manifest_version: 3,
  permissions: ["storage"],
  description: "Hide posts from unwanted users on PoE Forum",
  options_page: "src/options/index.html",
  action: {
    default_title: "Path of exile blocklist"
  },
  icons: {
    "16": "src/assets/logo-16x16.png",
    "32": "src/assets/logo-32x32.png",
    "64": "src/assets/logo-64x64.png",
    "128": "src/assets/logo-128x128.png"
  },
  background: {
    service_worker: "src/background.ts",
    type: "module"
  },
  content_scripts: [
    {
      js: ["src/content-scripts/main.ts", "node_modules/@webcomponents/custom-elements/custom-elements.min.js"],
      matches: ["https://*.pathofexile.com/*"]
    }
  ]
};
var manifest_config_default = defineManifest(manifest);

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            const tags = ["blocked-content", "my-tab", "my-tab-group", "my-tab-panel"];
            return tags.includes(tag);
          }
        }
      }
    }),
    crx({ manifest: manifest_config_default })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccG9lc2hcXFxcRGVza3RvcFxcXFxwb2UtYmxvY2tsaXN0XFxcXHBvZS1ibG9ja2xpc3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBvZXNoXFxcXERlc2t0b3BcXFxccG9lLWJsb2NrbGlzdFxcXFxwb2UtYmxvY2tsaXN0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9wb2VzaC9EZXNrdG9wL3BvZS1ibG9ja2xpc3QvcG9lLWJsb2NrbGlzdC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XHJcbmltcG9ydCB7IGNyeCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbic7XHJcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0LmNvbmZpZyc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG5cdHBsdWdpbnM6IFtcclxuXHRcdHZ1ZSh7XHJcblx0XHRcdHRlbXBsYXRlOiB7XHJcblx0XHRcdFx0Y29tcGlsZXJPcHRpb25zOiB7XHJcblx0XHRcdFx0XHRpc0N1c3RvbUVsZW1lbnQ6ICh0YWc6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0XHRjb25zdCB0YWdzID0gWydibG9ja2VkLWNvbnRlbnQnLCAnbXktdGFiJywgJ215LXRhYi1ncm91cCcsICdteS10YWItcGFuZWwnXTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRhZ3MuaW5jbHVkZXModGFnKTtcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0fSxcclxuXHRcdH0pLFxyXG5cdFx0Y3J4KHsgbWFuaWZlc3QgfSksXHJcblx0XSxcclxufSk7XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxccG9lc2hcXFxcRGVza3RvcFxcXFxwb2UtYmxvY2tsaXN0XFxcXHBvZS1ibG9ja2xpc3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXHBvZXNoXFxcXERlc2t0b3BcXFxccG9lLWJsb2NrbGlzdFxcXFxwb2UtYmxvY2tsaXN0XFxcXG1hbmlmZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvcG9lc2gvRGVza3RvcC9wb2UtYmxvY2tsaXN0L3BvZS1ibG9ja2xpc3QvbWFuaWZlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lTWFuaWZlc3QsIE1hbmlmZXN0VjNFeHBvcnQgfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nO1xyXG5cclxuY29uc3QgbWFuaWZlc3QgPSB7XHJcblx0bmFtZTogJ1BhdGggb2YgZXhpbGUgYmxvY2tsaXN0JyxcclxuXHR2ZXJzaW9uOiAnMC42LjInLFxyXG5cdG1hbmlmZXN0X3ZlcnNpb246IDMsXHJcblx0cGVybWlzc2lvbnM6IFsnc3RvcmFnZSddLFxyXG5cdGRlc2NyaXB0aW9uOiAnSGlkZSBwb3N0cyBmcm9tIHVud2FudGVkIHVzZXJzIG9uIFBvRSBGb3J1bScsXHJcblx0b3B0aW9uc19wYWdlOiAnc3JjL29wdGlvbnMvaW5kZXguaHRtbCcsXHJcblx0YWN0aW9uOiB7XHJcblx0XHRkZWZhdWx0X3RpdGxlOiAnUGF0aCBvZiBleGlsZSBibG9ja2xpc3QnLFxyXG5cdH0sXHJcblx0aWNvbnM6IHtcclxuXHRcdCcxNic6ICdzcmMvYXNzZXRzL2xvZ28tMTZ4MTYucG5nJyxcclxuXHRcdCczMic6ICdzcmMvYXNzZXRzL2xvZ28tMzJ4MzIucG5nJyxcclxuXHRcdCc2NCc6ICdzcmMvYXNzZXRzL2xvZ28tNjR4NjQucG5nJyxcclxuXHRcdCcxMjgnOiAnc3JjL2Fzc2V0cy9sb2dvLTEyOHgxMjgucG5nJyxcclxuXHR9LFxyXG5cdGJhY2tncm91bmQ6IHtcclxuXHRcdHNlcnZpY2Vfd29ya2VyOiAnc3JjL2JhY2tncm91bmQudHMnLFxyXG5cdFx0dHlwZTogJ21vZHVsZScsXHJcblx0fSxcclxuXHRjb250ZW50X3NjcmlwdHM6IFtcclxuXHRcdHtcclxuXHRcdFx0anM6IFsnc3JjL2NvbnRlbnQtc2NyaXB0cy9tYWluLnRzJywgJ25vZGVfbW9kdWxlcy9Ad2ViY29tcG9uZW50cy9jdXN0b20tZWxlbWVudHMvY3VzdG9tLWVsZW1lbnRzLm1pbi5qcyddLFxyXG5cdFx0XHRtYXRjaGVzOiBbJ2h0dHBzOi8vKi5wYXRob2ZleGlsZS5jb20vKiddLFxyXG5cdFx0fSxcclxuXHRdLFxyXG59IHNhdGlzZmllcyBNYW5pZmVzdFYzRXhwb3J0O1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdChtYW5pZmVzdCk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1YsU0FBUyxvQkFBb0I7QUFDalgsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsV0FBVzs7O0FDRndVLFNBQVMsc0JBQXdDO0FBRTdZLElBQU0sV0FBVztBQUFBLEVBQ2hCLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxFQUNULGtCQUFrQjtBQUFBLEVBQ2xCLGFBQWEsQ0FBQyxTQUFTO0FBQUEsRUFDdkIsYUFBYTtBQUFBLEVBQ2IsY0FBYztBQUFBLEVBQ2QsUUFBUTtBQUFBLElBQ1AsZUFBZTtBQUFBLEVBQ2hCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDUjtBQUFBLEVBQ0EsWUFBWTtBQUFBLElBQ1gsZ0JBQWdCO0FBQUEsSUFDaEIsTUFBTTtBQUFBLEVBQ1A7QUFBQSxFQUNBLGlCQUFpQjtBQUFBLElBQ2hCO0FBQUEsTUFDQyxJQUFJLENBQUMsK0JBQStCLG9FQUFvRTtBQUFBLE1BQ3hHLFNBQVMsQ0FBQyw2QkFBNkI7QUFBQSxJQUN4QztBQUFBLEVBQ0Q7QUFDRDtBQUNBLElBQU8sMEJBQVEsZUFBZSxRQUFROzs7QUR2QnRDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLElBQUk7QUFBQSxNQUNILFVBQVU7QUFBQSxRQUNULGlCQUFpQjtBQUFBLFVBQ2hCLGlCQUFpQixDQUFDLFFBQWdCO0FBQ2pDLGtCQUFNLE9BQU8sQ0FBQyxtQkFBbUIsVUFBVSxnQkFBZ0IsY0FBYztBQUN6RSxtQkFBTyxLQUFLLFNBQVMsR0FBRztBQUFBLFVBQ3pCO0FBQUEsUUFDRDtBQUFBLE1BQ0Q7QUFBQSxJQUNELENBQUM7QUFBQSxJQUNELElBQUksRUFBRSxrQ0FBUyxDQUFDO0FBQUEsRUFDakI7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
