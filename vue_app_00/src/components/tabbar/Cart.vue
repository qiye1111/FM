<template>
  <div class="app-cart">     
     <div class="mui-card">	
        <div class="mui-card-header">
         购物车列表
        </div>	
		<div class="mui-card-content">
		    <div class="mui-card-content-inner">
		        <ul class="mui-table-view">
				    <li class="mui-table-view-cell mui-media" v-for='item in list' :key='item.iid'>
					    <a to="javascript:;">
						    <img class="mui-media-object mui-pull-left" :src="item.img_url">
						    <div class="mui-media-body">
							{{item.title}}
							    <div class='mui-ellipsis'>                               
                                    <span class="price">￥{{(Number(item.price)).toFixed(2)}}</span>       
                                    <span class="count">
                                        <div class="mui-numbox">
					                        <button class="mui-btn mui-btn-numbox-minus"type="button" @click='cartDel' :data-iid='item.iid'>-</button>
					                        <input class="mui-input-numbox" type="number" :value='item.count' />
					                        <button class="mui-btn mui-btn-numbox-plus" type="button" @click='cartAdd' :data-iid='item.iid'>+</button>
				                        </div>
                                    </span>
                                </div>
						    </div>
					    </a>
				    </li>
                </ul>
		    </div>
		</div>
		<div class="mui-card-footer">
           合计:￥{{getTotal}}
        </div>
	</div>
  </div>
     
</template>
<script>
  import {Toast} from "mint-ui"
  export default {
    data(){
      return {
        list:[]
      }
    },
    computed:{
        getTotal(){
            var sum=0;
            for(var item of this.list){
                sum+=item.price*item.count;                
            }
            return sum
        }
    },
    methods:{
        getCart(){
            var uid=2            ;
            var url='getCart?uid='+uid;
            this.$http.get(url).then(result=>{
                this.list=result.body               
            })
        },
        cartDel(e){
            var iid=e.target.dataset.iid;
            for(var item of this.list){
                if(item.iid==iid && item.count>1){
                    item.count--;
                    this.updateCart(iid,item.count)
                }
            }
        },
        cartAdd(e){
          var iid=e.target.dataset.iid;
            for(var item of this.list){
                if(item.iid==iid && item.count<999){
                    item.count++;
                    this.updateCart(iid,item.count)
                }
            }  
        },
        updateCart(iid,count){
            var url='http://127.0.0.1:3000/updateCart?iid='+iid+'&count='+count;           
            this.axios.get(url).then(result=>{               
                if(result.data.code==1){
                    Toast(result.data.msg)
                }else{
                    Toast(result.data.msg)
                }
            })
        }
    },
    created(){
        this.getCart();
    }
    
  }
</script>
<style>
  .app-cart   .mui-card-content .mui-media-body{
      font-size:18px;
      font-weight:bold;      
  }
  .app-cart .mui-card-content .mui-media-body  .mui-ellipsis{
      display:flex;
      justify-content:space-between;
  }
 .app-cart .mui-card-content .mui-card-content-inner .mui-table-view-cell .mui-ellipsis .price{
     color:red;
     font-size:16px;
     padding-top:15px;
 }
 .app-cart  .mui-card-footer{
     font-size:18px;
    font-weight:bold;
 }
</style>