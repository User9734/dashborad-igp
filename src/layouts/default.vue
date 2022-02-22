<template>
  <div id="app">
    <div class="wrapper">
      <SideBar/>
      <Header/>
      <router-view />
      <Footer/>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/sidebar.vue'
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
export default {
  name: 'Default',
  components: {
    SideBar,
    Header,
    Footer
  }
}
</script>
