<template>
  <div id="app">
    <component :is="layout">
        <router-view/>
    </component>
  </div>
</template>

<script>
const default_layout="default"
export default {
  name: 'Home',
  computed:{
    layout(){
      return (this.$route.meta.layout || default_layout);
    }
  }
}
</script>
