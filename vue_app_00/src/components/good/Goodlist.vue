<template>
    <div class='app-goodlist'>
        <!--轮播图-->
        <mt-swipe :auto='3000'>
            <mt-swipe-item v-for='item in list' :key='item.index_id'>
                <img :src="item.img_url">
            </mt-swipe-item>
        </mt-swipe>
        <div class='mini'>--更多声音伙伴--</div>
        <!--商品列表-->
        <div class='good'>
            <router-link :to="'/goodinfo?pid='+item.pid" class='good-item' v-for='item in goodlist' :key='item.pid'>
                <img :src="item.img_url">
                <div class='good-title'>{{item.title}}</div>
                <p class='good-price'>¥{{(item.price).toFixed(2)}}</p>
            </router-link>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                list:[],
                goodlist:[]
            }
        },
        methods:{
            getSwipe(){
                this.$http.get('getSwipe').then(result=>{                    
                    this.list=result.body;
                })
            },
            getGoodlist(){
                this.$http.get('getGoodlist').then(result=>{                   
                    this.goodlist=result.body;                    
                })
            }
        },
        created(){
            this.getSwipe();
            this.getGoodlist();
        }
    }
</script>
<style>
   .app-goodlist .mint-swipe {      
      height:155px;
   }  
  .app-goodlist  .mint-swipe img{
      width:100%;
  }
  .app-goodlist .mini{
      font-size:24px;
      font-weight:bold;
      text-align:center;
      margin-top:20px;
  }
.app-goodlist .good{
    display:flex;
    flex-wrap:wrap; 
    justify-content:space-between;
    margin-top:25px; 
    margin-bottom:50px;  
}
.app-goodlist .good-item{
    height:170px;
    width:49%;
    background:#fff;
    display:flex;
    flex-direction:column;
    margin-bottom:10px;
}
.app-goodlist .good .good-item img{
    height:75%;
    width:80%;
    margin:0 auto;   
}
.app-goodlist .good .good-item .good-title{
    font-size:20px;
    text-align:center;
    color:#000;
}
.app-goodlist .good .good-item .good-price{
    font-size:20px;
    color:red;
    text-align:center;
}

</style>