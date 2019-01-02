<template>
    <div class='app-mine'>
        <div class="card"> 
            <router-link to='/login' class='card-header'>
                <img src="http://127.0.0.1:3000/img/avatar.png">                         
            </router-link>              
        </div> 
        <p class='divider'></p>      
        <ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right">						
					<div class="mui-media-body">我的积分</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media">
				<a class='mui-navigate-right' href="javascript:;">						
					<div class="mui-media-body">我的圈子</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right">					
					<div class="mui-media-body">知识大使</div>
				</a>
			</li>
            <li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right">					
					<div class="mui-media-body">金融专区</div>
				</a>
			</li>
		</ul>
        <p class='divider'></p>
        <ul class="mui-table-view mui-table-view-chevron">
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right">						
					<div class="mui-media-body">运营商服务</div>
				</a>
			</li>
			<li class="mui-table-view-cell mui-media">
				<router-link class='mui-navigate-right' to='/goodlist'>						
					<div class="mui-media-body active">商城</div>
				</router-link>
			</li>
			<li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right">					
					<div class="mui-media-body">帮助与反馈</div>
				</a>
			</li>
            <li class="mui-table-view-cell mui-media">
				<a class="mui-navigate-right">					
					<div class="mui-media-body">设置</div>
				</a>
			</li>
		</ul>
        <p class='divider'></p>
        <mt-button type="danger" size='large'>退出登录</mt-button>
	</div>
</template>
<script>
    export default {
        data(){
            return {

            }
        }
    }
</script>
<style>    
    .app-mine .card{ 
        background:#26a2ff;       
        height:150px;
        display:flex;
        flex-direction:column;        
        justify-content:center;
        align-items:center;
    }
    .app-mine .card .card-header{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .app-mine .card img{
        width:40%;        
        border:3px solid #2692ff;
        border-radius:50%;          
    }   
    p.divider{
        height:10px;
        background:#ddd;
        width:100%;
        margin:0
    }
   .app-mine .mui-table-view-cell .mui-navigate-right .mui-media-body{
       padding-left:20px;
   }
    .active{
        color:#2692ff;
    }
</style>