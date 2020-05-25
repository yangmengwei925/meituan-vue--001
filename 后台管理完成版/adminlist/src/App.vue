<template>
  <div id="app">
	 <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  activated(){
    console.log('23')
  }
}
</script>

<style>

</style>
