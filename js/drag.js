/**
 * Created by 李冬杰 on 2017/2/25.
 */
var Util={
    addHandle:function(type,element,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+type]=handler;
        }
    },
    getTarget:function(e){
        return e.target||e.srcElement;
    }
};


var flag=false;
var cur={
    x:0,
    y:0
};
var dx,dy,nx,ny,x,y,target;
function down(){
    target=Util.getTarget(event);
    flag=true;
    cur.x=event.pageX;
    cur.y=event.pageY;
    dx=target.offsetLeft;
    dy=target.offsetTop;
    event.stopPropagation();
}
function move(){
    if(flag==true){
        nx=event.pageX-cur.x;
        ny=event.pageY-cur.y;
        x=dx+nx;
        y=dy+ny;
        pageWidth=document.documentElement.clientWidth;
        pageHeight=document.documentElement.clientHeight;
        var targetWidth=target.offsetWidth;
        var targetHeight=target.offsetHeight;
        var maxMoveX=pageWidth-targetWidth;
        var maxMoveY=pageHeight-targetHeight;
        x=Math.min(maxMoveX,Math.max(0,x));
        y=Math.min(maxMoveY,Math.max(0,y));
        target.style.left=x+'px';
        target.style.top=y+'px';
    }
    event.stopPropagation();
}
function stop(){
    flag=false;
    event.stopPropagation();
}
Util.addHandle('mousedown',floatWrap,down);
Util.addHandle('mousemove',floatWrap,move);
Util.addHandle('mouseup',floatWrap,stop);