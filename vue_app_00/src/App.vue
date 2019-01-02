<template>
 <div class="app-container">
    <!--顶部导航栏-->
    <mt-header fix title='珠穆朗玛FM'></mt-header>
    <router-view></router-view>
    <!--底部导航栏-->
    <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" href="#tabbar">
				<span class="mui-icon mui-icon-home-filled"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item" href="#tabbar-with-chat">
				<span class="mui-icon mui-icon-star">
                    <span class="mui-badge"></span>
                </span>
				<span class="mui-tab-label">我听</span>
			</a>
            <a class="mui-tab-item" href="#tabbar-with-contact">
				<span class=" mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">
					 {{$store.getters.optCartCount}}
					</span></span>
				<span class="mui-tab-label">购物车</span>
            </a>			
			<router-link to='/mine' class="mui-tab-item" href="#tabbar-with-map">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">账号</span>
			</router-link>
		</nav>
 </div>
</template>

<style>
  
</style>
