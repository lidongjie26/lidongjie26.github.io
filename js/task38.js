//兼容性事件绑定
var util={
    addEventHandler:function(element,type,handle){
        if(element.addEventListener){
            element.addEventListener(type,handle,false);
        }else if(element.attachEvent){
            element.attachEvent('on'+type,handle)
        }else{
            element['on'+type]=handle;
        }
    },
    getTarget:function(e){
        return e.target||e.srcElement;
    }
};
//新建table
function newTable(){
    var table=document.createElement('table');
    table.className='table';
    table.innerHTML='<tr><th>姓名</th><th>语文<span class="low">▲</span><span class="high">▼</span></th><th>数学<span class="low">▲</span><span class="high">▼</span></th><th>英语<span class="low">▲</span><span class="high">▼</span></th><th>总分<span class="low">▲</span><span class="high">▼</span></th></tr>';
    document.body.appendChild(table);
    return table;
}
//给table插入行数据
function insertRow(table,arr){
    var tr=document.createElement('tr')
    var src='';
    var count=0;
    if(arr.length<4){
        for(var j=0;j<4-arr.length;i++){
            arr.push('0');
        }
    }else if(arr.length>4){
        var len=arr.length;
        for(var j=0;j<len-4;j++){
            arr.pop();
        }
    }
    console.log(arr.length);
    for(var i=0;i<arr.length;i++){
        if(i!==0){
            count+=parseInt(arr[i]);
        }
        src+='<td>'+arr[i]+'</td>'
    }
    src+='<td>'+count+'</td>';
    tr.innerHTML=src;
    table.appendChild(tr)
}
//将文本框中数据根据空格分割成数组
function textSplit(str) {
    var arr=str.split(' ');
    for(var i=arr.length; i>0; i--) {
       if(arr[i-1]=='')
        {
            arr.splice(i-1, 1);
            continue;
        }
    }
    if(arr.length==0){
        alert('输入为空或全为空格！');
    }else{
        return arr;
    }
}
//获取文本框的文本
$("#btnInsertTable")[0].onclick=function(){
    var table=newTable();
}
$("#btnInsertRow")[0].onclick=function(){
    var arr=textSplit($('#textBox')[0].value);
    var tables=document.getElementsByTagName('table');
    var table=tables[tables.length-1];
    insertRow(table,arr);
}
$("#btnDeleteTable")[0].onclick=function(){
    var tables=document.getElementsByTagName('table');
    var table=tables[tables.length-1];
    table.parentNode.removeChild(table);
}
$('#btnDeleteRow')[0].onclick=function(){
    var trs=document.getElementsByTagName('tr');
    var tr=trs[trs.length-1];
    tr.parentNode.removeChild(tr);
}
//排序
function sortNumber(a,b){
    var aNumber=parseInt(a.firstElementChild.innerHTML);
    var bNumber=parseInt(b.firstElementChild.innerHTML);
    return aNumber-bNumber;
}
var range={
    low:function(e){
        var target=util.getTarget(e);
        var col=$(target.parentNode).index();
        var table=target.parentNode.parentNode.parentNode
        var rows=table.rows;
        rows.sort(sortNumber);
    },
    high:function(){

    }
};
util.addHandle('click',$('.low'),range.low);
$('.low').onclick=range.low;