<template>
    <div class='app-search'>
        <div class="mui-card">
			<div class="mui-card-header">
                <input type="text" name='keyword' value='' v-model="keyword" placeholder="关键字">
            </div>            
            <div class="mui-card-header">
                <mt-button type="danger" size='large' @click='getMore'>搜索</mt-button>
            </div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <ul  class="mui-table-view">
					    <li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.lid">
					        <a href="javascript:;">
						    <img class="mui-media-object mui-pull-left" :src="item.img_url">
						    <div class="mui-media-body">
							    <span class='title'>{{item.title}}</span>                                
							    <p class='mui-ellipsis'>{{item.label}}</p>
						    </div>
					        </a>
				        </li>
                    </ul>
				</div>
			</div>			
		</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list:[],
                keyword:''
            }
        },
        methods:{
            getMore(){
              var keyword=this.keyword;
              var url='search?keyword='+keyword;
              this.$http.get(url).then(result=>{
                  this.list=result.body;
              })   
            }
        }
    }
</script>
<style>
    .app-search .mui-card-content .mui-media-body{
        font-size:18px;
        font-weight:bold;
        display:flex;
        flex-direction:column        
    }
     .app-search .mui-card-content .mui-media-body .title{
         margin:0;
         padding:5px;
     }
</style>