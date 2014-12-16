// section切换
$(function(){
    var $section = $("section");
    var len = $section.length;
    var current = 0;
    var index = 0;
    var $buttons = $("#v-button li");
    
    $buttons.click(function(){

            $(this).addClass("cur").siblings().removeClass("cur");
            index  = $("#v-button li").index(this);
            cutSlide(current,index);
            current = index;
           
    })
    function wheel(event){
        var delta = 0;
        if (!event) event = window.event;
        if (event.wheelDelta) {
            delta = event.wheelDelta/120; 
            if (window.opera) delta = -delta;
        } else if (event.detail) {
            delta = -event.detail/3;
        } //鼠标向上滚动，delta=1。鼠标向下滚动，delta=-1。
        if (delta==1){    
            if(current==0) {
                index = 0; 
            }
            else{
                index = current-1;              
            }         
        }
        else if(delta==-1){      
            if(current == len-1) {
                index = len-1;
            }
            else{
                index = current+1;
            }        
        }
        $buttons.eq(index).addClass("cur").siblings().removeClass("cur");
        cutSlide(current,index);     
        current = index;

    }

    if (window.addEventListener){
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    
    //head区按钮
    var $tumblr = $("#head h3");
    var $log = $("#head a").last();
    var $sign = $("#sign");
    //single page动画元素
    var $form1 = $("#home div").eq(0);
    var $bigT = $("#easy i");
    var $gallery = $("#blog div");
    var $picture = $("#how .picture");
    var $cube = $("#cube");
    var $oct = $("#oct");
    var $circle = $("#anything li i");
    var $form2 = $("#okay div").eq(0);

    function cutSlide(current,next){       //全屏切换
        if(current<next){
            var color = $section.eq(next).css("background-color");
            $sign.css("color",color);
            if(current==0){
                $tumblr.slideDown();
                $log.animate({left: "-=10px"},300);
                $sign.show(300);
                $form1.css("opacity",0);
            }
            clearPlay(next);
            $section.eq(current).css("z-index","1").slideUp(1000,function(){
                $(this).removeClass("current").css({"z-index":"","display":""});
                singlePlay(next);
            });
            $section.eq(next).addClass("current");
        }
        else if(current>next){
            var color = $section.eq(next).css("background-color");
            $sign.css("color",color);
            if(next==0){
                $tumblr.slideUp();
                $log.animate({left: "+=10px"},300);
                $sign.hide(300);             
            }
            if(current==len-1) {
                $form2.css("opacity",0);
            }
            clearPlay(next);
            $section.eq(next).css("z-index","1").slideDown(1000, function(){
                $section.eq(next).addClass("current").css("z-index","").css("display","");
                $section.eq(current).removeClass("current");
                singlePlay(next); 
            });
            
        }
        
        else return;
    }
    function clearPlay(num){
        switch (num) {
            case 0:
                $form1.css({"top":"400px","opacity":0.5});
                break;
            case 1:
                $bigT.css("opacity",0);
                break;
            case 2:
                $gallery.css({"left":"50vw","opacity":0});
                break;
            case 3:
                $cube.css({"top":"60vh","opacity":0});
                $oct.css({"top":"60vh","opacity":0});
                break;
            case 4:
                $circle.each(function(index) {
                    $(this).parent().css("opacity",0);
                    $(this).css({"width":"4vmax","height":"8vmax","line-height":"8vmax"});
                })
                break;
            case 5:
                $form2.css({"top":"200px","opacity": 0});
                break;
            default: return;
        }
    }
    function singlePlay(num){
        switch (num) {
            case 0:
                $form1.animate({top:"0px",opacity:"1.0"},500);
                break;
            case 1:
                $bigT.animate({opacity:"1.0"},500);
                break;
            case 2:
                $gallery.animate({left:"10vw",opacity:"1.0"},1000);
                break;
            case 3:
                $cube.animate({top:"10vh",opacity:"1.0"},300);
                $oct.animate({top:"10vh",opacity:"1.0"},600);
                break;
            case 4:
                circleLine();
                break;
            case 5:
                $form2.animate({top:"0px",opacity:"1.0"},500);
                break;
            default: break;
        } 
         
    }

    var obj1={opacity:"1.0"};
    var obj2={width: "8vmax",height: "8vmax","line-height": "8vmax"};
    var _slideFun=[
        //把要执行的动画依次放入一个数组
            function(){
                $circle.eq(0).parent().animate(obj1,300);
                $circle.eq(0).animate(obj2,300,_takeOne);
            },
            function(){
                $circle.eq(1).parent().animate(obj1,200);
                $circle.eq(1).animate(obj2,200,_takeOne);
            },
            function(){
                $circle.eq(2).parent().animate(obj1,200);
                $circle.eq(2).animate(obj2,200,_takeOne);
            },
            function(){
                $circle.eq(3).parent().animate(obj1,200);
                $circle.eq(3).animate(obj2,200,_takeOne);
            },
            function(){
                $circle.eq(4).parent().animate(obj1,200);
                $circle.eq(4).animate(obj2,200,_takeOne);
            },
            function(){
                $circle.eq(5).parent().animate(obj1,200);
                $circle.eq(5).animate(obj2,200,_takeOne);
            },
            function(){
                $circle.eq(6).parent().animate(obj1,200);
                $circle.eq(6).animate(obj2,200);
            },
        ];
    
    var _takeOne=function(){
        //取出第一个函数,并执行它
        $(document).dequeue('slideList');
    };
    function circleLine() {
        $(document).queue('slideList',_slideFun);
        _takeOne();
    }

    var $search = $("#head span div");
    var $explore = $("#head span a");
    $search.click(function(){
        $(this).addClass("highlight");
        $explore.show();
        $("#content").click(function(){
            $search.removeClass("highlight");
            $explore.hide();
        })
    });   
})
