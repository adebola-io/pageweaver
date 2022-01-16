module.exports = `\`import { createApp } from "vue";
import \${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)} from "./\${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)}.vue"\${args.vue_router? \`
import router from "./router.js"\` : ''};

createApp(\${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)})\${args.vue_router?'.use(router)':''}.mount("#app");\``;
