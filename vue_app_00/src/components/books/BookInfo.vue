<template>
    <div class='app-booklist'>
        <div class="mui-card">
			<div class="mui-card-header mui-card-media" >               
               <span class='title'>{{list.title}}</span> 
            </div>            
			<div class="mui-card-content">                
                <div class="mui-card-content-inner">
					<img :src="list.img_url" style='width:100%;height:25%'>
				</div>
				<div class="mui-card-content-inner">
                    简介：					
					<p style="color: #333;">{{list.content}}</p>
				</div>
			</div>	
		</div>
        <comment-box :bid='bid'></comment-box>
    </div>
</template>
<script>
    import comment from '../sub/comment.vue'
    export default {
        data(){
            return {
                list:[],
                bid:this.$route.query.bid
            }
        },
        created(){
            this.getBookInfo();            
        },
        methods:{
            getBookInfo(){
                var bid=this.$route.query.bid;
                var url='bookinfo?bid='+bid;
                this.$http.get(url).then(result=>{                    
                    this.list=result.body[0]
                })
            }
            
        },
        components:{
            'comment-box':comment
        }
    }
</script>
<style> 
    
    .app-booklist div.mui-card-header {
        text-align:center;     
    }
    .app-booklist div.mui-card-header .title{
        font-size:25px;
        font-family: 'Helvetica Neue', Helvetica, sans-serif;
        font-weight:bold;             
    }
    .app-booklist .mui-card-content .mui-card-content-inner:first-child{
         padding:0;
     } 
     .app-booklist{
         margin-bottom:50px;
     }   
</style>