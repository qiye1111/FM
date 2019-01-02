<template>
    <div class='app-swipe'>
        <mt-swipe :auto='3000'>
            <mt-swipe-item v-for='item in list' :key='item.swipe_id'>
                <img :src="item.img_url" >
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                list:[]
            }
        },
        props:['pid'],
        methods:{
            getSwipe(){
                var pid=this.pid;
                console.log(pid);
                this.$http.get('swipe?pid='+pid).then(result=>{
                   this.list=result.body;                   
                })
            },
            
        },
        created(){
            this.getSwipe();
        }
    }
</script>
<style>
    .app-goodinfo .mint-swipe {      
      height:350px;
   }  
  .app-goodinfo  .mint-swipe img{
      width:100%;
      height:350px;
  }
  .app-goodinfo .mint-swipe{
      margin:10px;
  }
  
</style>