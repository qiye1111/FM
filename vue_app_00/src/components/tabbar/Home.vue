<template>
    <div class='app-home'>
        <!--轮播图-->
        <mt-swipe :auto='3000'>
            <mt-swipe-item v-for='item in list' :key='item.id'>
                <img :src="item.img_url">
            </mt-swipe-item>
        </mt-swipe>
        <!--九宫格-->
        <div class="mui-content">
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/booklist">
		                    <img src="../../img/youshengshu.png" alt="有声书">
		                    <div class="mui-media-body">有声书</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/diantai.png" alt="电台">
		                    <div class="mui-media-body">电台</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/yinyue.png" alt="音乐">
		                    <div class="mui-media-body">音乐</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/yingshi.png" alt="影视">
		                    <div class="mui-media-body">影视</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/erciyuan.png" alt='二次元'>
		                    <div class="mui-media-body">二次元</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/ertong.png" alt="儿童">
		                    <div class="mui-media-body">Phone</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/qinggan.png" alt="情感">
		                    <div class="mui-media-body">情感</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/xiqu.png" alt="戏曲">
		                    <div class="mui-media-body">戏曲</div></a></li>
		           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../img/xiangsheng.png" alt="相声">
		                    <div class="mui-media-body">相声</div></a></li>
		        </ul> 
		</div>
    </div>
</template>
<script>
    export default {        
        data(){
            return {
                list:[]
            }
        },
        methods:{
            getImage(){                
                this.$http.get('image').then(result=>{
                    this.list=result.body;
                })
            }
        },
        created(){
            this.getImage();
        },

    }

</script>
<style >
    .app-home .mint-swipe {      
      height:140px;
  }  
  .app-home  .mint-swipe img{
      width:100%;
  }
  .app-home .mui-grid-view.mui-grid-9{
      background:#fff;
  }
  .app-home .mui-grid-view.mui-grid-9 li{
      border:0
  }
  .app-home .mui-grid-view.mui-grid-9 img{
      width:60px;
      height:60px;
  }
</style>