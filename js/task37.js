/**
 * Created by 李冬杰 on 2017/2/20.
 */
/*
 重构为mvc模式
  控制器
  模型
  视图
 */

var btnFloat=document.getElementById('float-btn');
var btnClose=document.getElementsByClassName('close')[0];
var floatWrap=document.getElementById('float-wrap');
var body=document.body;
function autoCenter(el) {
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;

    var elW = el.offsetWidth;
    var elH = el.offsetHeight;

    el.style.left = (bodyW - elW)/2+ "px";
    el.style.top = (bodyH - elH)/2+ "px";
}

function getHover(divFloat){
    var box=divFloat.parentNode;
    var height=box.clientHeight;
    var width=box.clientWidth;
    var hover=document.createElement('div');
    hover.className='hover';
    hover.style.width=width+'px';
    hover.style.height=height+'px';
    box.insertBefore(hover,divFloat);
    hover.onclick=function(){
        divFloat.className='noShow';
        hover.className='noShow';
    };
}
btnFloat.onclick=function(){
    floatWrap.className='show';
    autoCenter(floatWrap);
    getHover(floatWrap);
};
btnClose.onclick=function(){
    floatWrap.className='noShow';
    floatWrap.previousElementSibling.className='noShow';
};







