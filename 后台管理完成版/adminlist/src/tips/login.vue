<template>
  <div>

  </div>
</template>

<script>
  export default{
    methods: {
          open() {
            this.$confirm('请登录后再操作', '提示', {
              confirmButtonText: '确定',
              showCancelButton:false,
              type: 'warning',
              center: true,
              showClose:false,
              closeOnClickModal:false
            }).then(() => {
              console.log('去登陆')
              //跳转页面
              this.$router.push({name:'login'})
            }).catch(() => {
                
            });
          },

          init(){
             this.open()
          },
        }
  }
</script>

<style scoped="scoped">

</style>
