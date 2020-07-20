
//爬取首页数据（待改善，需要双重for循环）

//算了，首页数据没多少，有写代码的时间早打完了

var arr=[]
    var data=document.querySelector(".new-home-content");
    var oDiv=data.querySelector(".mould-goods").children;
    for(var i=0;i<oDiv.length;i++){
        var o={};
        var item=oDiv[i];
        o.title=item.querySelector(".title").innerText;
        o.price=item.querySelector(".price").innerText;
        o.p=item.querySelector("p").innerText;
        o.goodsId=i+999
        arr.push(o)
    }
    var arr=JSON.stringify(arr);
    console.log(arr);



   //分类——蛋糕页面的数据
   var arr=[]
   var data=document.querySelector(".list-box");
   var oDiv=data.querySelector("ul").children;
   for(var i=0;i<oDiv.length;i++){
       var o={};
       var item=oDiv[i];
       o.img=item.querySelector(".lazy").src;
       o.h3=item.querySelector("h3").innerText;
       o.price=item.querySelector(".price").innerText;
    //    o.label=item.querySelector(".label img");
       if(item.querySelector(".label img")){
        o.label=item.querySelector(".label img").src;
       }
    //    o.label=o.label.src
    //未获取到label标签中的img链接
       o.goodsId=i+999
       arr.push(o)
   }
   
//    console.log(arr[0].label.src);
//    console.log(arr[0].img);
   // var arr=JSON.stringify(arr);
   console.log(arr);


//测试代码
//    var arr=[]
//    var data=document.querySelector(".list-box");
//    var oDiv=data.querySelector("ul").children;
//    var o={};
//    var item=oDiv[i];
//    o.img=item.querySelector(".lazy").src;
//    o.label=item.querySelector(".label img").src;
//    console.log(o.label);

//商品详情
var arr=[]
var data=document.querySelector(".swiper-container");
var oDiv=data.querySelector(".swiper-wrapper").children;
for(var i=0;i<oDiv.length;i++){
    var o={};
    var item=oDiv[i];
    o.img=item.querySelector("img").src;
   //  o.h3=item.querySelector("h3").innerText;
   //  o.price=item.querySelector(".price").innerText;
 //    o.label=item.querySelector(".label img");
    if(item.querySelector("a img")){
     o.label=item.querySelector("a img").src;
    }
 //    o.label=o.label.src
 //未获取到label标签中的img链接
    o.goodsId=i+999
    arr.push(o)
}

//    console.log(arr[0].label.src);
//    console.log(arr[0].img);
// var arr=JSON.stringify(arr);
console.log(arr);