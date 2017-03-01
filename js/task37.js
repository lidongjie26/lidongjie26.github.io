
var btnFloat=document.getElementById('float-btn');
var btnClose=document.getElementsByClassName('close')[0];
var floatWrap=document.getElementById('float-wrap');
var body=document.body;
//元素居中
function autoCenter(el) {
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;

    var elW = el.offsetWidth;
    var elH = el.offsetHeight;

    el.style.left = (bodyW - elW)/2+ "px";
    el.style.top = (bodyH - elH)/2+ "px";
}
//制作薄膜
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
//事件绑定
btnFloat.onclick=function(){
    floatWrap.className='show';
    autoCenter(floatWrap);
    getHover(floatWrap);
};

btnClose.onclick=function(){
    floatWrap.className='noShow';
    floatWrap.previousElementSibling.className='noShow';
};







