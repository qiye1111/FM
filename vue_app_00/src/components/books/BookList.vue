<template>
    <div class='app-booklist'>        
        <header class="mui-bar mui-bar-nav">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">有声书</h1>
		</header>
		<div class="mui-content mui-row mui-fullscreen">
			<div class="mui-col-xs-3">
				<div id="segmentedControls" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-vertical" >
                	<a  class='mui-control-item' :data-index='(item.cid-1)' v-for='(item,i) in list' :key='item.cid' :data-id='item.cid'>{{item.cll}}</a>                          
				</div>
			</div>
			<div id="segmentedControlContents" class="mui-col-xs-9" style="border-left: 1px solid #c8c7cc;">
				<div class='mui-control-content'>
            		<ul class="mui-table-view">
						<li class="mui-table-view-cell mui-media" v-for='ob in obj' :key='ob.bid'>
				    		<router-link :to="'/bookinfo?bid='+ob.bid">
					    		<img class="mui-media-object mui-pull-left" :src="ob.img_url">
					    		<div class="mui-media-body">
					    			<span class='title'>{{ob.title}}</span>					
						    		<p class='mui-ellipsis'>{{ob.label}}</p>
						    		<span class='point'>播放次数 {{ob.point}} 次</span>
						    		<span class='parts'>选集 {{ob.parts}} 集</span> 
					    		</div>
				    		</router-link>
						</li>                       
           			 </ul>
					<mt-button type='primary' size='large' @click='getMore'>加载更多</mt-button>
        		</div>
		</div>
	</div>
</div>
</template>
<script>	
    /* mui.init({
		swipeBack: true //启用右滑关闭功能
	});
   */   
    export default {
        data(){
            return {
                list:[],
                obj:[],
				cid:1,
				pageSize:6,
				pno:1,
				pageCount:1,
				hasChange:0
            }
        },		
        methods:{
            getBooksClass(){
                this.$http.get('bookClass').then(result=>{
                    this.list=result.body;
                })
            },
			getBook(){				
				this.$http.get('booklist').then(result=>{
					this.obj=result.body;
				})
			},						
			getBooks(){	
					var pageSize=this.pageSize;
					var pno=this.pno; 
					var sge=document.querySelector('#segmentedControls');
					sge.onclick=(e,cid)=>{
						var a=e.target;
						cid=a.dataset.id;
						this.cid=cid;									
						var url='bookslist?cid='+cid+'&pno='+pno+'&pageSize='+pageSize;			
						this.$http.get(url).then(result=>{
						this.obj=result.data.data;
						this.pageCount=result.body.pageCount;										
					})
				};		
			},
			getMore(){
				var cid=this.cid;				
				var pno=this.pno;				
				this.pno=++pno;	
				var pno=this.pno;									
				var pageSize=this.pageSize;
				var pageCount=this.pageCount;
				var hasChange=this.hasChange;
				console.log(hasChange);
				console.log(cid);
				if(hasChange!=cid){this.pno=2}
				var pno=this.pno;
				var hasMore=(pno<=pageCount);
				console.log(hasMore)
				if(!hasMore){return}			
				var url='bookslist?cid='+cid+'&pno='+pno+'&pageSize='+pageSize;
				this.$http.get(url).then(result=>{
					console.log(result)
					var rows=this.obj.concat(result.body.data);
                	this.obj=rows;
					this.hasChange=cid;
					console.log(this.hasChange)				
				})
			}				
        },
        created(){
            this.getBooksClass();
			this.getBook();						
        },
		mounted(){			
			this.getBooks();
		}
    }

</script>

<style>
    .mui-row.mui-fullscreen>[class*="mui-col-"] {
				height: 92%;
			}
			
			.mui-col-xs-3,
			.mui-col-xs-9 {
				overflow-y: auto;
				height: 100%;

			}					
			.mui-control-content {
				display: block;
			}			
			.mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
				background-color: #fff;
			} 
            /*此样式显示不出，写在app.css文件中*/
            .mui-segmented-control .mui-control-item {
				line-height: 50px;
				width: 100%;
			} 
			.title {
				margin: 20px 15px 10px;
				color: #6d6d72;
				font-size: 15px;
			}		
		#segmentedControlContents .mui-table-view .mui-table-view-cell a img.mui-media-object{
			width:42px;
			height:42px;
			margin-right:10px;
			line-height:42px;
			
		}		
		#segmentedControlContents .mui-table-view .mui-media-body .title{
			font-size:14px;
			font-weight:bold;
			margin-left:0;
		}
		#segmentedControlContents .mui-table-view .mui-media-body .mui-ellipsis{
			font-size:10px;
			font-family:'黑体';
		}	
		 #segmentedControlContents .mui-table-view .mui-media-body .point{
			 font-size:10px;
			font-family:'黑体';
		 } 
		 #segmentedControlContents .mui-table-view .mui-media-body .parts{
			 font-size:10px;
			font-family:'黑体';
			float:right;
			padding-right:10px;
		 } 
		 .mint-button::after{
			 content:'';
			 position:absolute;
		 }    
</style>