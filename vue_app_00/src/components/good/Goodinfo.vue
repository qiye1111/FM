<template>
    <div class='app-goodinfo'>        
        <swipe-box :pid='pid'></swipe-box>
        <div class="mui-card">
			<div class="mui-card-header">{{list.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
                    <p class='subtitle'>{{list.subtitle}}</p>
                    <p class="price">
                        ￥{{(Number(list.price)).toFixed(2)}}
                    </p>
                    购买数量:
                    <!--商品参数-->
                    <div class="mui-numbox">
			            <button class="mui-btn mui-btn-numbox-minus" type="button" @click='del'>-</button>
			            <input class="mui-input-numbox" type="number"  value="1" v-model="val"/>
			            <button class="mui-btn mui-btn-numbox-plus" type="button"  @click='add'>+</button>
		            </div>
				</div>
			</div>
			<div class="mui-card-footer">
                <mt-button size="small" type="primary">立即购买</mt-button>
                <mt-button size="small" type="danger" @click='addCart' >加入购物车</mt-button>
            </div>
		</div>
    </div>
</template>
<script>
    import swipe from '../sub/swipe.vue';
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return{
                list:[],
                pid:this.$route.query.pid,
                val:1
            }
        },
        components:{
            'swipe-box':swipe
        },
        methods:{
            getGoodinfo(){
                var pid=this.pid;                
                this.$http.get('goodinfo?pid='+pid).then(result=>{
                   this.list=result.body[0];                  
                })
            },
            del(){                
                if(this.val>1){this.val--; }
            },
            add(){                
                if(this.val<999){this.val++;}
            },
            addCart(){
                var pid=this.pid;
                var count=this.val; 
                var uid=3;               
                var url='addCart?pid='+pid+'&count='+count+'&uid='+uid;               
                this.$http.get(url).then(result=>{
                    if(result.body.code==1){
                        this.$store.commit("increment",count);
                        Toast('加入购物车成功！');
                    }else{
                        Toast('加入购物车失败！')
                    }
                })
            }

        },
        created(){
            this.getGoodinfo();
        }
    }
</script>
<style>
    .app-goodinfo{
        margin-bottom:50px;
    }
    .app-goodinfo  .mui-card-header{
        font-size:24px;
        font-weight:bold;
    }
    .app-goodinfo .subtitle{
        font-size:14px;
        font-weight:bold;
    }
    .app-goodinfo .price{
        color:red;
        font-size:24px;
    }
</style>