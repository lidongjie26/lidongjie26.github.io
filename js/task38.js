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
    table.innerHTML='<tr><th>姓名</th><th>语文<div class="low">▲</div><div class="high">▼</div></th><th>数学<div class="low">▲</div><div class="high">▼</div></th><th>英语<div class="low">▲</div><div class="high">▼</div></th><th>总分<div class="low">▲</div><div class="high">▼</div></th></tr>';
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
    $('#textBox')[0].value='';
    $('#textBox')[0].focus();
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
/*实现思想很简单：

 1.为每一个表头绑定一个click事件，传入序列号i；

 2.click事件中，用临时数组temp_arr保存被点击的表头对应的列内容，temp_tr_arr保存临时tr数组；

 3.删掉原来的tr；

 4.对temp_arr中的数据排序；

 5.根据排序结果append(tr)；
*
* */
var target;
function lowSort(a,b){
    return a-b;
}
function hightSort(a,b){
    return b-a;
}
var range={
    low:function(e){
        target=util.getTarget(e);
        var col=$(target.parentNode).index();//获得表格的列数
        var tbody=target.parentNode.parentNode.parentNode;
        var table=tbody.parentNode//获得表格
        var rows=table.rows;//获得表格每一行的数组
        var temp_arr=[];
        var temp_tr_arr=[];
        for(var i=1;i<rows.length;i++){
            temp_arr.push(parseInt(table.rows[i].cells[col].innerHTML));
            temp_tr_arr.push(table.rows[i]);
        }
        for(var j=1;j<rows.length;j++){
            table.removeChild(table.lastElementChild)
        }
        temp_arr.sort(lowSort);
        for(var x=0;x<temp_arr.length;x++){
            for(var y=0;y<temp_tr_arr.length;y++){
                if(parseInt(temp_tr_arr[y].cells[col].innerHTML)==temp_arr[x]){
                    table.appendChild(temp_tr_arr[y]);
                }
            }
        }
    },
    high:function(e){
        target=util.getTarget(e);
        var col=$(target.parentNode).index();//获得表格的列数
        var tbody=target.parentNode.parentNode.parentNode;
        var table=tbody.parentNode//获得表格
        var rows=table.rows;//获得表格每一行的数组
        var temp_arr=[];
        var temp_tr_arr=[];
        for(var i=1;i<rows.length;i++){
            temp_arr.push(parseInt(table.rows[i].cells[col].innerHTML));
            temp_tr_arr.push(table.rows[i]);
        }
        for(var j=1;j<rows.length;j++){
            table.removeChild(table.lastElementChild)
        }
        temp_arr.sort(hightSort);
        for(var x=0;x<temp_arr.length;x++){
            for(var y=0;y<temp_tr_arr.length;y++){
                if(parseInt(temp_tr_arr[y].cells[col].innerHTML)==temp_arr[x]){
                    table.appendChild(temp_tr_arr[y]);
                }
            }
        }
    }
};
//jquery事件绑定，为当前或未来的元素绑定事件
$(document).delegate('.low','click',range.low);
$(document).delegate('.high','click',range.high);