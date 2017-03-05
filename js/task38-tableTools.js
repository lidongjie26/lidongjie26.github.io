
(function(){
    var util = {
        addEventHandler: function (element, type, handle) {
            if (element.addEventListener) {
                element.addEventListener(type, handle, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handle)
            } else {
                element['on' + type] = handle;
            }
        },
        getTarget: function (e) {
            return e.target || e.srcElement;
        }
    };
    var config={
        tdWidth:'200px',
        tdHeight:'50px',
        rowNum:5,
        colNum:5,
        thBgc:'#333',
        border:'1px solid #000',
        thContent:['姓名','语文','数学','英文','总分'],
        tdContent:[
            ['小明',80,90,70,240],
            ['小红',90,60,90,240],
            ['小强',60,100,70,230],
            ['小张',100,70,80,250]
        ]
    };
    var tb= addTh(document.body);
    addTr(tb);
    function addTh(element){
        var tb=document.createElement('table');
        var tr=document.createElement('tr');
        tb.appendChild(tr);
        for(var i=0;i<config.colNum;i++){
            var th=document.createElement('th');
            tr.appendChild(th);
            th.style.width=config.tdWidth;
            th.style.height=config.tdHeight;
            th.style.border=config.border;
            if(i==0){
                th.innerHTML=config.thContent[i];
            }else{
                th.innerHTML=config.thContent[i]+'<div class="low">▲</div><div class="high">▼</div>';
            }
        }
        element.appendChild(tb);
        return tb;
    }
    function addTr(element){
        console.log(element);
        for(var i=0;i<config.rowNum-1;i++){
            var tr=document.createElement('tr');
            element.appendChild(tr);
            for(var j=0;j<config.colNum;j++){
                var td=document.createElement('td');
                tr.appendChild(td);
                td.innerHTML=config.tdContent[i][j];
                td.style.width=config.tdWidth;
                td.style.height=config.tdHeight;
                td.style.border=config.border;
            }
        }
    }
    //插入数据功能
    function insertRow(table, arr) {
        var tr = document.createElement('tr')
        var src = '';
        var count = 0;
        if (arr.length < config.colNum) {
            for (var j = 0; j < config.colNum - arr.length-1; i++) {
                arr.push('0');
            }
        } else if (arr.length+1 > config.colNum) {
            var len = arr.length;
            for (var j = 0; j < len - config.colNum; j++) {
                arr.pop();
            }
        }
        for (var i = 0; i < arr.length; i++) {
            if (i !== 0) {
                count += parseInt(arr[i]);
            }
        }
        arr.push(count);
        for(var i=0;i<arr.length;i++){
            var td=document.createElement('td');
            td.innerHTML=arr[i];
            tr.appendChild(td);
            td.style.width=config.tdWidth;
            td.style.height=config.tdHeight;
            td.style.border=config.border;
        }
        table.appendChild(tr)
    }
    function textSplit(str) {
        var arr = str.split(' ');
        for (var i = arr.length; i > 0; i--) {
            if (arr[i - 1] == '') {
                arr.splice(i - 1, 1);
                continue;
            }
        }
        if (arr.length == 0) {
            alert('输入为空或全为空格！');
        } else {
            return arr;
        }
    }function lowSort(a, b) {
        return a - b;
    }

    function hightSort(a, b) {
        return b - a;
    }
    var range = {
        low: function (e) {
            var target = util.getTarget(e);
            var col = $(target.parentNode).index();//获得表格的列数
            var table= target.parentNode.parentNode.parentNode;
            var rows = table.rows;//获得表格每一行的数组
            var temp_arr = [];
            var temp_tr_arr = [];
            for (var i = 1; i < rows.length; i++) {
                temp_arr.push(parseInt(table.rows[i].cells[col].innerHTML));
                temp_tr_arr.push(table.rows[i]);
            }
            for (var j = 1; j < rows.length; j++) {
                table.removeChild(table.lastElementChild)
            }
            temp_arr.sort(lowSort);
            for (var x = 0; x < temp_arr.length; x++) {
                for (var y = 0; y < temp_tr_arr.length; y++) {
                    if (parseInt(temp_tr_arr[y].cells[col].innerHTML) == temp_arr[x]) {
                        table.appendChild(temp_tr_arr[y]);
                    }
                }
            }
        },
        high: function (e) {
             var target = util.getTarget(e);
            var col = $(target.parentNode).index();//获得表格的列数
            var table= target.parentNode.parentNode.parentNode;
            var rows = table.rows;//获得表格每一行的数组
            var temp_arr = [];
            var temp_tr_arr = [];
            for (var i = 1; i < rows.length; i++) {
                temp_arr.push(parseInt(table.rows[i].cells[col].innerHTML));
                temp_tr_arr.push(table.rows[i]);
            }
            for (var j = 1; j < rows.length; j++) {
                table.removeChild(table.lastElementChild)
            }
            temp_arr.sort(hightSort);
            for (var x = 0; x < temp_arr.length; x++) {
                for (var y = 0; y < temp_tr_arr.length; y++) {
                    if (parseInt(temp_tr_arr[y].cells[col].innerHTML) == temp_arr[x]) {
                        table.appendChild(temp_tr_arr[y]);
                    }
                }
            }
        }
    };
//jquery事件绑定，为当前或未来的元素绑定事件
    $(document).delegate('.low', 'click', range.low);
    $(document).delegate('.high', 'click', range.high);

    $("#btnInsertRow")[0].onclick = function () {
        var arr = textSplit($('#textBox')[0].value);
        var tables = document.getElementsByTagName('table');
        var table = tables[tables.length - 1];
        insertRow(table, arr);
        $('#textBox')[0].value = '';
        $('#textBox')[0].focus();
    }
    $("#btnDeleteTable")[0].onclick = function () {
        var tables = document.getElementsByTagName('table');
        var table = tables[tables.length - 1];
        table.parentNode.removeChild(table);
    }
    $('#btnDeleteRow')[0].onclick = function () {
        var trs = document.getElementsByTagName('tr');
        var tr = trs[trs.length - 1];
        tr.parentNode.removeChild(tr);
    }

})();
