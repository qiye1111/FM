<template>
    <div class='app-login' style='background:url(http://127.0.0.1:3000/img/ximalaya.jpg)'> 
        <table></table>               
        <div class="card">                   
            <img src="http://127.0.0.1:3000/img/fm_mao.png"  class='logo'>                      
		    <div class="card-content">							
                <input type="text"  placeholder="请输入用户名" v-model="uname" />
                <input type="password"  placeholder="请输入密码" v-model="upwd" />
                <mt-button size="large"type='primary' @click='handleLogin'>登录</mt-button>         
			</div>		
            <div class="card-cell">
                <router-link to="/register">立即注册</router-link>
                <a href="javascript:;">忘记密码</a>
            </div>
            <p class='other'>第三方登录</p>
            <hr>  
            <div class='card-footer'>
                <img src="http://127.0.0.1:3000/img/weixin.jpg">
                <img src="http://127.0.0.1:3000/img/weibo.jpg">
                <img src="http://127.0.0.1:3000/img/qq.jpg">
            </div>             
	    </div>        
    </div>
</template>
<script>
    import {Toast} from 'mint-ui'
    export default {
        data(){
            return{
                uname:'',
                upwd:'',
            }
        },
        methods:{
            handleLogin(){
            var uname=this.uname;
            var upwd=this.upwd;
            var url='http://127.0.0.1:3000/login?uname='+uname+'&upwd='+upwd;
            this.axios.get(url).then(result=>{                
                    var code=result.data.code;
                    var msg=result.data.msg;
                    if(code==1){
                        this.$router.push('/home');

                    }else{
                        Toast(msg)
                    }
                })
            }
        },        
        
    }
</script>
<style >    
   .app-login{
       width:100%;
        height:100%;       
   }
   .app-login .card{             
      margin:10% 10%;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      margin-bottom:180px;      
   }
   .app-login .card  .logo{
       width:20%;
       height:20%;
       margin:5% auto;
       border-radius:50%;
   }
   .app-login .card-centent{
       width:80%;
   }
   .app-login .card-content input{
       background:#000;
       opacity:0.5;
       color:#fff;
   }
   .app-login .card-cell {
       width:80%;
       display:flex;
       justify-content:space-between;
   }
   .app-login .card-cell a{
       color:#fff;
       padding-top:10px;
   }
   .app-login .other{
       font-size:14px;
       color:#fff;
       margin-top:20px;
   }
   .app-login hr{
       margin-top:10px;
       width:100%;
   }
   .app-login .card-footer{
       display:flex;
       justify-content:space-around;
       margin-top:20px;       
   }
   .app-login .card-footer img{       
       width:10%;
       height:10%;
       border-radius:50%;
   }
</style>