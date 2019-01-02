<template>
    <div class='app-comment'>        
        <textarea placeholder='请吐槽最多120个字' maxlength='120' v-model="msg"></textarea>
        <mt-button size='large' @click='postComment'>发表评论</mt-button>
        <div class='cmt-list'>
            <div class='cmt-item' v-for="(item,i) in list" :key="item.id">
                <div class='cmt-info'>
                    第{{i+1}}楼:<br>
                    用户名:{{item.user_name}}发表时间:{{item.ctime | datatimeFilter}}
                </div>
                <div class='cmt-body'>
                    {{item.content}}
                </div>
            </div>
        </div>
        <mt-button size="large" @click='getMore' >加载更多</mt-button>
    </div>
</template>
<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return {
                msg:'',
                list:[],
                pno:0,
                pageSize:7,
                pageCount:1,
                
            }
        },
        props:['bid'],
        methods:{
            getMore(){
                var bid=this.bid;
                this.pno++;
                var pno=this.pno;                              
                var pageSize=this.pageSize;
                var pageCount=this.pageCount;                  
                var hasMore=(pno<=pageCount)               
                if(!hasMore){return}
                var url='comment?bid='+bid+'&pno='+pno+'&pageSize='+pageSize;
                console.log(url)
                this.$http.get(url).then(result=>{ 
                    console.log(result)                    
                    var rows=this.list.concat(result.body.data);
                    this.list=rows;
                    this.pageCount=result.body.pageCount;
                })
            },
            postComment(){                
                var bid=this.bid;
                var msg=this.msg;
                var size=msg.trim().length;
                if(size==0){
                    Toast('请输入评论信息！')
                    return;
                }
                var url='http://127.0.0.1:3000/addComment';    
                var param=`bid=${bid}&content=${msg}`;
                this.axios.post(url,param).then(result=>{                   
                    var obj=result.data;
                    if(obj.code==1){
                        Toast('评论发表成功！')
                        //显示最新一页的数据
                        this.pno=0;
                        this.list=[];
                        this.getMore();
                        this.msg='';
                    }else{
                        Toast('评论发表失败！')
                    }
                    
                })
            }
        },
        created(){
            this.getMore()
        }
    }
</script>
<style>
   .app-comment h3{
    font-size:18px;   /*标题*/
  }
  .app-comment textarea{/*评论组件多行文本框*/
    font-size:14px;   /*字体小一些*/
    height:68px;      /*高度*/
    margin:0;
  }
  .app-comment .cmt-list{/*显示评论列表*/
    margin:5px 0;
  }
  .app-comment .cmt-list .cmt-item{
    border:1px solid #aaa;/*评论项*/
    margin-top:15px;
    background:#ccc;
  }
  .app-comment .cmt-list .cmt-info{
    line-height:30px;    /*评论内容*/    
  }  
  .app-comment .mint-button{
      background:#007aff;
      color:#fff;
  }
  

</style>