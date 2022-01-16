module.exports = `\`
<template>
  <div>
    \${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)} Page Component.\${args.vue_router? \`
      <router-view></router-view>\`:''}
  </div>
</template>

<script>
import './styles/\${mainParam}.css'
export default {
  name: "\${mainParam.charAt(0).toUpperCase()+mainParam.slice(1)}",
};
</script>

<style scoped></style>
\``;
