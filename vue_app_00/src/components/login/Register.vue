<template>
    <div class='app-register' style='background:url(http://127.0.0.1:3000/img/ximalaya.jpg)'>
        <table></table>
        <div class="card">                   
            <img src="http://127.0.0.1:3000/img/logo.jpg"  class='logo'>
            <p class='label'>聆听世界的声音</p>                      
		    <div class="card-content">
                <div class='card-content-item'>							
                    <input type="text"  placeholder="请输入1-8位长度用户名" v-model="uname" @blur='checkUname'/>     
                    <img src="http://127.0.0.1:3000/img/true.png" v-show='this.unameCode==1'>    
                </div> 
                <div class='card-content-item'>	    
                    <input type="password"  placeholder="请输入3-6位数字密码" v-model="upwd" @blur='checkUpwd'/>
                    <img src="http://127.0.0.1:3000/img/true.png" v-show='this.upwdCode==1'>
                </div> 
                <div class='card-content-item'>	
                    <input type="password" placeholder='请再次确认密码' v-model='mupwd' @blur='checkMupwd'>
                    <img src="http://127.0.0.1:3000/img/true.png" v-show='this.mupwdCode==1'>
                </div> 
                <div class='card-content-item'>	
                    <input type="email" placeholder='请输入合法的邮箱' v-model='email' @blur='checkEmail'>
                    <img src="http://127.0.0.1:3000/img/true.png" v-show='this.emailCode==1'>
                </div>                 	               
                <mt-button size="large"type='danger' @click='postMsg'>立即注册</mt-button>         
			</div>           
        </div>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                uname:'',
                upwd:'',
                mupwd:'',
                email:'',
                phone:'',
                unameCode:'',
                upwdCode:'',
                mupwdCode:'',
                emailCode:''                               
            }
        },
        methods:{
            checkUname(){
                var uname=this.uname;
                var url='checkUname?uname='+uname;
                this.$http.get(url).then(result=>{                    
                    this.unameCode=result.body.code;                    
                    if(this.unameCode==-1){
                        Toast(result.body.msg)
                    }else if(this.unameCode==-2){
                        Toast(result.body.msg)
                    }
                })
            },
            checkUpwd(){
                var upwd=this.upwd;
                if(!upwd){
                    Toast('密码不能为空！')
                }
                var reg=/^[0-9]{3,6}$/;
                if(!reg.test(upwd)){
                    Toast('请检查密码格式！')
                }else{
                    this.upwdCode=1;
                }
            },
            checkMupwd(){
                var mupwd=this.mupwd;
                if(!mupwd){
                    Toast('密码位置不能为空')
                };
                var upwd=this.upwd;
                if(upwd==mupwd && upwd  && mupwd){
                    this.mupwdCode=1;
                }else{
                    Toast('两次密码输入不相同')
                }
            },
            checkEmail(){
               var email=this.email;
               var reg=/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/ig;
               if(!email){
                   Toast('邮箱不能为空')
                   return
               }
               if(!reg.test(email)){
                   Toast('邮箱格式不正确')
                   return
               }
                var url='checkEmail?email='+email;
                this.$http.get(url).then(result=>{                    
                    this.emailCode=result.body.code;                    
                    if(this.emailCode==-1){
                        Toast(result.body.msg)
                    }else{
                        this.emailCode=1;
                    }
                }) 
            },
            postMsg(){
                var uname=this.uname;
                var upwd=this.upwd;
                var email=this.email;
                var param=`uname=${uname}&upwd=${upwd}&email=${email}`
                var url='http://127.0.0.1:3000/register';
                this.axios.post(url,param).then(result=>{
                    console.log(result.data.code)
                    if(result.data.code==1){
                        this.$router.push('/login')
                    }else{
                        Toast('注册失败，请重新注册！')
                    }
                })
            }
        }
    }
</script>
<style>
  .app-register{
       width:100%;
        height:100%;       
   }
   .app-register .card{             
      margin:10% 10%;
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      margin-bottom:180px;      
   }
   .app-register .card  .logo{
       width:20%;
       height:20%;
       margin:5% auto;
       border-radius:50%;
   }
   .app-register .card p.label{
       font-size:18px;
       color:#e41a18;
       font-weight:bold;
   }
   .app-register .card-centent{
       width:80%;       
   }
   .app-register .card-content div.card-content-item{
       position:relative;
   }
   .app-register .card-content div.card-content-item img{
       position:absolute;
       left:260px;
       top:8px;
   }
   
   
   
   
   
</style>