/**
 * Created by 李冬杰 on 2017/3/11.
 */
/*
 * 1.首先是日历组件框架
 * 2.日历组件中有一个头，头中有年 月
 * 3.身子是一个table，table中有7列，行数不确定
 * 4.首先功能是获取这个月的1号是星期几
 *
 * */
(function(){

    var current={
        year:0,//哪一年
        month:0,//哪一月
        day:0,//今天是几号
        week:0,//今天星期几
        monthDays:0,//这个月多少天
        lastMonthDays:0,//上个月多少天
        nextMonthDays:0,
        rows:0,//这个月日历多少行
        firstDay:0,//第一天星期几
        weekName:['日','一','二','三','四','五','六'],
        self:null,//table元素
        select:document.getElementById('select-date'),//显示元素
        method:true//选择哪种方式
    };
    var first=null;
    var second=null;
    var x=null;
    var util={
        addHandler:function(element,type,handle){
            if(element.addEventListener){
                element.addEventListener(type,handle,false);
            }else if(element.attachEvent){
                element.attachEvent('on'+type,handle);
            }else{
                element['on'+type]=handle;
            }
        },
        getTarget:function(e){
            return e.target||e.srcElement;
        }
    };
    function getCurrentTime(){
        var time=new Date();
        current.year=time.getFullYear();
        current.month=time.getMonth()+1;
        current.day=time.getDate();
        current.week=time.getDay();
    }
    function getDaysInMonth(year,month){
        if(month==2){
            if(year%400==0||(year%4==0&&year%100!=0)){
                return 29;
            }else{
                return 28;
            }
        }else if(month==4||month==6||month==9||month==11){
            return 30;
        }else{
            return 31;
        }
    }
    function getMonthDays(){
        current.monthDays=getDaysInMonth(current.year,current.month);
        if(current.month==1){
            current.lastMonthDays=getDaysInMonth(current.year-1,12);
            current.nextMonthDays=getDaysInMonth(current.year,2);
        }else if(current.month==12){
            current.nextMonthDays=getDaysInMonth(current.year+1,1);
            current.lastMonthDays=getDaysInMonth(current.year,11);
        }else {
            current.lastMonthDays=getDaysInMonth(current.year,current.month-1);
            current.nextMonthDays=getDaysInMonth(current.year,current.month+1);
        }
    }
    function getArr(){
        var week=current.week;
        var day=current.day;
        var monthDays=current.monthDays;
        var lastMonthDays=current.lastMonthDays;
        if(day%7>week+1){
            current.firstDay=8+week-day%7;
        }else{
            current.firstDay=week+1-day%7;
        }
        var y;
        if((current.firstDay+monthDays)%7==0){
            current.rows=parseInt((current.firstDay+monthDays)/7);
        }else {
            current.rows=parseInt((current.firstDay+monthDays)/7)+1;
        }
    }
    function createTable(current){
        var table = document.createElement('table');
        document.body.appendChild(table);
        var tr_title=document.createElement('tr');
        tr_title.className='tr-title';
        tr_title.innerHTML='<td colspan="7"><div id="btn-previous">◁</div>'+current.year+'年'+current.month+'月<div id="btn-next" >▷</div></td>';
        table.appendChild(tr_title);
        var x=0;
        var tr=document.createElement('tr');
        for(x=0;x<current.weekName.length;x++){
            tr.innerHTML+='<td class="week">'+current.weekName[x]+'</td>';
        }
        table.appendChild(tr);
        var lastWeek=(current.firstDay+current.monthDays)%7;
        for(var i=0;i<current.rows;i++){
            var tr = document.createElement('tr');
            if(i==0) {
                for (x = current.firstDay; x > 0; x--) {
                    tr.innerHTML += '<td class="no-show">' + (current.lastMonthDays+1 - x) + '</td>';
                }
                for (x = current.firstDay; x < 7; x++) {
                    tr.innerHTML += '<td class="show">' + (x + 1 - current.firstDay) + '</td>';
                }
            }
            if (i < current.rows - 1 && i > 0) {
                for (x = 0; x < 7; x++) {
                    tr.innerHTML += '<td class="show">' + ((x+1- current.firstDay) + i * 7 )+ '</td>';
                }
            }
            if(i==current.rows-1){
                if((current.firstDay+current.monthDays)%7==0){
                    for(x=0;x<7;x++){
                        tr.innerHTML += '<td class="show">' + ((x+1- current.firstDay) + i * 7 )+ '</td>';
                    }
                }else{
                    for(x=lastWeek;x>0;x--){
                        tr.innerHTML+='<td class="show">' + (current.monthDays-x+1)+ '</td>';
                    }
                    for(x=0;x<7-lastWeek;x++){
                        tr.innerHTML+='<td class="no-show">' + (x+1)+ '</td>';
                    }
                }
            }
            table.appendChild(tr);
        }
        var tr=document.createElement('tr');
        var td=document.createElement('td');
        tr.appendChild(td);
        td.colSpan='7';
        td.className='td-buttom';
        td.innerHTML='<td><input type="button" value="确定" class="btn" id="btn-confirm"/><input type="button" value="取消" class="btn" id="btn-cancel"/>';
        table.appendChild(tr);
        current.self=table;
    }

    function changeDate(e){
        var target=util.getTarget(e);
        document.getElementsByTagName('td')[current.firstDay+current.day+7].className='show';
        current.day=parseInt(target.innerHTML);
        var td=document.getElementsByTagName('td')[current.firstDay+current.day+7];
        td.className='showDate';
    }

    function selectConfirm(){
        if(current.method==true){
            current.select.value=current.year+'/'+current.month+'/'+current.day;
            $(current.self).fadeOut(500);
        }else{
            current.select.value=first.year+'/'+first.month+'/'+first.day+"~"+second.year+'/'+second.month+'/'+second.day;
            $(current.self).fadeOut(500);
        }

    }
    function selectCancel(){
        $(current.self).fadeOut(500);
    }
    function nextMonth(){
        current.self.parentNode.removeChild(current.self);
        current.self=null;
        if(current.month==12){
            current.year+=1;
            current.month=1;
        }else{
            current.month+=1;
        }
        if(current.nextMonthDays<current.day){
            current.day=current.nextMonthDays;
            var between=current.nextMonthDays+current.monthDays-current.day;
            if(current.week+between%7<7){
                current.week+=between%7;
            }else{
                current.week+=between%7-7;
            }
        }else{
            if(current.week+current.monthDays%7<7){
                current.week+=current.monthDays%7;
            }else{
                current.week+=current.monthDays%7-7;
            }
        }
        getMonthDays();
        getArr();
        createTable(current);
        renderTd(first,second);
    }
    function previousMonth(){
        current.self.parentNode.removeChild(current.self);
        current.self=null;
        if(current.month==1){
            current.month=12;
            current.year-=1;
        }else{
            current.month-=1;
        }
        if(current.day>current.lastMonthDays){
            var between=current.day;
            if(between%7<current.week){
                current.week-=between%7;
            }else{
                current.week=7+current.week-between%7;
            }
            current.day=current.lastMonthDays;
        }else{
            var between=current.lastMonthDays;
            if(between%7<current.week){
                current.week-=between%7;
            }else{
                current.week=7+current.week-between%7;
            }
        }
        getMonthDays();
        getArr();
        createTable(current);
        renderTd(first,second);
    }
    function getDays(e){
        var target=util.getTarget(e);
        current.day=parseInt(target.innerHTML);
        if(first!==null){
            var td=document.getElementsByTagName('td')[current.firstDay+current.day+7];
            td.className='showDate';
            second=deepClone(current);
            reorder();
            renderTd(first,second);
            //判断两点之间的间隔
        }else{
            first=deepClone(current);
            var td=document.getElementsByTagName('td')[current.firstDay+current.day+7];
            td.className='showDate';
        }
    }
    function renderTd(first,second){
        if(first!==null&&second!==null){
            if(first.year!==second.year){
                if(current.year==first.year&&current.month==first.month){
                    for(var i=first.firstDay+first.day+8;i<first.firstDay+first.monthDays+7;i++){
                        document.getElementsByTagName('td')[i].className='select';
                    }
                }else if(current.year==second.year&&current.month==second.month){
                    for(var i=8;i<second.firstDay+second.day+7;i++){
                        document.getElementsByTagName('td')[i].className='select';
                    }
                }
            }
            else if(first.year==second.year&&first.month==second.month){
                for(var i=first.firstDay+first.day+8;i<second.firstDay+second.day+7;i++){
                    document.getElementsByTagName('td')[i].className='select';
                }
            }

        }

    }
    //深拷贝
    function isClass(o){
        if(o===null) return "Null";
        if(o===undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8,-1);
    }
    function deepClone(obj){
        var result;
        var oClass=isClass(obj);
        if(oClass==="Object"){
            result={};
        }else if(oClass==="Array"){
            result=[];
        }else{
            return obj;
        }
        for(var key in obj){
            var copy=obj[key];
            if(isClass(copy)=="Object"){
                result[key]=arguments.callee(copy);//递归调用
            }else if(isClass(copy)=="Array"){
                result[key]=arguments.callee(copy);
            }else{
                result[key]=obj[key];
            }
        }
        return result;
    }
    //两个对象排序
    function reorder(){
        if((first.year>second.year)||(first.year==second.year&&first.month>second.month)||(first.year==second.year&&first.month==second.month&&first.day>second.day)){
            first = {first: second, second : first};
            second = first.second;
            first = first.first;
        }

    }
    function init(){
        getCurrentTime();
        getMonthDays();
        getArr();
        createTable(current);
        current.self.className='table_hide';
    }
    init();
    $('select#select-type').change(function(){
        current.select.value='';
        var options=$("#select-type option:selected");
        if(options.val()=='选择时间点'){
            current.method=true;
        }else{
            current.method=false;
        }
    });
    //先做日历身
    $(document).delegate('.show', 'click', function(){
        if(current.method==true){
            changeDate(event);
        }else{
            getDays(event);
        }
    });
    $(document).delegate('#btn-next','click',nextMonth);
    $(document).delegate('#btn-previous','click',previousMonth);
    //显示当前日期的特殊，点击某个日期则给这个日期特殊
    //点击前进后退则日期改变。

    //点击文本框日历面板显示，再点击隐藏
    //选择日期则面板隐藏，日期出现再框中
    $(document).delegate('#select-date','click',function(){
        $('table').fadeToggle();
    });
    $(document).delegate('#btn-confirm','click',selectConfirm);
    $(document).delegate('#btn-cancel','click',selectCancel)
    //选择日历日期的选择方式
    //1.日历单选模式，现在的方法不变
    //2.日历的日期间隔选择模式
    //需要增加的方法：日历的选择方法
    //改变选择方法，改变的show日期的方法
    //日历选择后弹出一个窗口
    //点击其中一个日期，再选中另外一个日期

})();
