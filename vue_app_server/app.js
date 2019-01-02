const express=require('express');
const pool=require('./pool');
const bodyParser=require('body-parser');
const session=require('express-session');
const cors=require('cors');
var app=express();
app.listen(3000);
app.use(cors({
    origin:["http://127.0.0.1:3001",
    "http://localhost:3001"],
    credentials:true
}));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(session({
    secret:'128位随机字符', //安全字符
    resave:false,         //请求保存
    saveUninitialized:true,  //初始化保存
    cookie:{
        maxAge:1000*60*60*24
    }
}))
//功能一、首页轮播图
app.get('/image',(req,res)=>{
    var sql='SELECT id,img_url FROM fm_image';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})
//功能二1：获取电子书的类别信息
app.get('/bookClass',(req,res)=>{
    var sql='SELECT cid,cll FROM fm_book_class';   
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })   
})
//功能二2：获取默认详情
app.get('/booklist',(req,res)=>{
    var sql='SELECT bid,cid,title,point,img_url,parts,label FROM fm_book WHERE cid=1 LIMIT 0,6';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//功能三：获取电子书列表，并进行分页
app.get('/bookslist',(req,res)=>{
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    var cid=req.query.cid;
    if(!pno){pno=1};
    if(!pageSize){pageSize=7};
    var reg=/^[0-9]{1,3}$/;
    if(!reg.test(pno)){
        res.send({code:-1,msg:'页码格式不正确！'})
        return 
    };
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:'页大小格式不正确'}) 
        return      
    }; 
    var progress=0;
    var obj={};   
    //查询总记录数
    var sql='SELECT count(bid) AS c FROM fm_book WHERE cid=?' ;
    pool.query(sql,cid,(err,result)=>{
        if(err) throw err;
        var pageCount=Math.ceil(result[0].c/pageSize);
        progress+=50;
        obj.pageCount=pageCount;
        if(progress==100){
            res.send(obj);
        }
    });
    //查询被选中的类别中的数据
    var sql='SELECT bid,cid,title,point,img_url,parts,label FROM fm_book WHERE cid=? LIMIT ?,?' ;
    var offset=parseInt((pno-1)*pageSize);
        pageSize=parseInt(pageSize);
    pool.query(sql,[cid,offset,pageSize],(err,result)=>{
        if(err) throw err;
        progress+=50;
        obj.data=result;
        if(progress==100){
            res.send(obj)
        }
    })
});
//功能四：获取电子书详情页信息
app.get('/bookinfo',(req,res)=>{
    var bid=req.query.bid;
    var sql='SELECT title,img_url,content FROM fm_book WHERE bid=?';
    pool.query(sql,bid,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//功能五，获取评论列表的评论
app.get('/comment',(req,res)=>{
    var bid=req.query.bid;
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;   
    if(!pno){pno=1};
    if(!pageSize){pageSize=7};
    var reg=/^[0-9]{1,3}$/;
    if(!reg.test(pno)){
        res.send({code:-1,msg:'页码格式不正确！'})
        return
    };
    if(!reg.test(pageSize)){
        res.send({code:-2,msg:'页大小格式不正确'})
        return       
    }; 
    var progress=0;
    var obj={};
      //查询总记录数
    var sql='SELECT count(comment_id) AS c FROM fm_comment WHERE bid=?' ;
    pool.query(sql,bid,(err,result)=>{
        if(err) throw err;
        var pageCount=Math.ceil(result[0].c/pageSize);
        progress+=50;
        obj.pageCount=pageCount;
        if(progress==100){
            res.send(obj);
        }
    });
    //查询被选中的类别中的数据
    var sql='SELECT comment_id,user_name,ctime,content FROM fm_comment WHERE bid=? ORDER BY comment_id DESC LIMIT ?,?' ;
    var offset=parseInt((pno-1)*pageSize);
        pageSize=parseInt(pageSize);
    pool.query(sql,[bid,offset,pageSize],(err,result)=>{
        if(err) throw err;
        progress+=50;
        obj.data=result;
        if(progress==100){
            res.send(obj)
        }
    })
})
//功能六 发表评论
app.post('/addComment',(req,res)=>{
    // 获取三个参数
    var user_name=req.session.uname;   
    var content=req.body.content;
    var bid=req.body.bid;
    // 创建SQL语句
    var sql='INSERT INTO `fm_comment`(`comment_id`, `bid`, `user_name`, `ctime`, `content`) VALUES (null,?,?,now(),?)'
     bid=parseInt(bid);
    // 返回添加结果
    pool.query(sql,[bid,user_name,content],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:'评论发表成功!'})
    })
})
//功能七，用户登陆验证
app.get('/login',(req,res)=>{
    var uname=req.query.uname;
    var upwd=req.query.upwd;
    var sql='SELECT count(uid) as c FROM fm_user WHERE uname=? ANd upwd=md5(?)';
    pool.query(sql,[uname,upwd],(err,result)=>{
        if(err) throw err;
        var obj=result[0].c;
        if(obj==1){
            //将用户名保存到session中
            req.session.uname=uname;           
            res.send({code:1,msg:'登陆成功'})
        }else{
            res.send({code:-1,msg:'用户名或密码错误！'})
        }
    })
})
//功能八 获取商城首页的轮播图
app.get('/getSwipe',(req,res)=>{
    var sql='SELECT index_id,img_url from fm_index_swipe';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//功能九  获取商城中的商品列表
app.get('/getGoodlist',(req,res)=>{
    var sql='SELECT pid,title,price,img_url from fm_product';
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//功能十  获取商城详情页的商品轮播图
app.get('/swipe',(req,res)=>{
    var pid=req.query.pid;
    var sql='SELECT swipe_id,img_url FROM fm_swipe WHERE pid=?';
    pool.query(sql,pid,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//功能11 获取商品详情页信息
app.get('/goodinfo',(req,res)=>{
    var pid=req.query.pid;   
    var sql='SELECT title,subtitle,price FROM fm_product WHERE pid=?';    
    pool.query(sql,pid,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//功能十二 添加购物车信息
app.get('/addCart',(req,res)=>{
    var uid=req.query.uid;   
    var count=req.query.count;
    var pid=req.query.pid;
    var sql='INSERT INTO `fm_shopcart`(`iid`, `pid`, `uid`, `count`, `is_cheecked`) VALUES (null,?,?,?,0)'
    pool.query(sql,[pid,uid,count],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:'购物车添加成功'})
    })
})

//功能十三 获取购物车详细信息
app.get('/getCart',(req,res)=>{
    var  uid=req.query.uid;
    var sql='SELECT p.title,p.price,p.img_url,c.count,c.iid FROM  fm_product p,fm_shopcart c WHERE p.pid=c.pid AND uid=?';
    pool.query(sql,uid,(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//功能十四  修改购物车信息
app.get('/updateCart',(req,res)=>{
    var count=req.query.count;
    var iid=req.query.iid;
    count=parseInt(count);
    var sql='UPDATE `fm_shopcart` SET `count`=? WHERE iid=?';
    pool.query(sql,[count,iid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:'购物车修改成功！'})
        }else{
            res.send({code:-1,msg:'购物车修改失败！'})
        }
    })
})
//功能十五 搜索功能
app.get('/search',(req,res)=>{
    var keyword=req.query.keyword;    
    var sql='SELECT `bid`, `cid`, `cll`, `title`, `label`, `img_url`,  `content` FROM `fm_book` WHERE title LIKE ? '    
    pool.query(sql,[`%${keyword}%`],(err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})



//功能十六  注册页面的效验--用户名
app.get('/checkUname',(req,res)=>{
    var uname=req.query.uname;
    var reg=/^[A-Za-z0-9]{1,8}$/
    if(!reg.test(uname)){
        res.send({code:-1,msg:'用户名格式不正确！'}); 
        return;             
    }
    var sql='SELECT count(uname) AS c FROM `fm_user` WHERE uname=?';
    pool.query(sql,uname,(err,result)=>{        
        if(err) throw err; 
        if(result[0].c==0){
            res.send({code:1,msg:'用户名输入正确！'})
        }else{
            res.send({code:-2,msg:'该用户名已注册！'})
        }
        
    })
})


//功能十七  注册页面的效验--邮箱
app.get('/checkEmail',(req,res)=>{
    var email=req.query.email;    
    var sql='SELECT count(email) AS c FROM `fm_user` WHERE email="?"';
    pool.query(sql,email,(err,result)=>{        
        if(err) throw err; 
        if(result[0].c==0){
            res.send({code:1,msg:'邮箱输入正确！'})
        }else{
            res.send({code:-1,msg:'该邮箱已注册！'})
        }        
    })
})

//功能十八  注册页面信息提交
app.post('/register',(req,res)=>{
    var uname=req.body.uname;
    var upwd=req.body.upwd;
    var email=req.body.email;
    console.log(uname,upwd,email)
    var sql='INSERT INTO `fm_user`(`uid`, `uname`, `upwd`, `email`) VALUES (null,?,md5(?),?)';
    pool.query(sql,[uname,upwd,email],(err,result)=>{
        if(err) throw err;
        res.send({code:1,msg:'注册成功'})
    })
})

