//新建table
function newTable(){
    var table=document.createElement('table');
    table.className='table';
    document.body.appendChild(table);
    return table;
}
//给table插入行数据
function insertRow(table,arr){
    var tr=document.createElement('tr')
    var src='';
    for(var i=0;i<arr.length;i++){
        src+='<td>'+arr[i]+'</td>'
    }
    tr.innerHTML=src;
    table.appendChild(tr)
}
//将文本框中数据根据空格分割成数组
function textSplit(str) {
    str=str.replace(/^\s+|\s$/g,'');
    console.log(str)
    var arr=str.split(' ');
    console.log(arr);
    var len=arr.length;
    for(var i=0; i<len; i++) {
        console.log(len);
        if(arr[i] ==='') {
            arr.splice(i, 1);
            break;
        }
    }
    console.log(arr);
    if(arr.length==0){
        alert('输入为空或全为空格！');
    }else{
        return arr;
    }
}
//获取文本框的文本
$("#btnInsertTable")[0].onclick=function(){
    var arr=textSplit($('#textBox')[0].value);
    var table=newTable();
    insertRow(table,arr);
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

