/**
 * Created by 李冬杰 on 2017/3/10.
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
        self:null,
        select:document.getElementById('select-date')
    }
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
        current.self=table;
    }
    function showDate(){
        var td=document.getElementsByTagName('td')[current.firstDay+current.day+7];
        td.className='showDate';
        current.select.value=current.year+'-'+current.month+'-'+current.day;
        $(current.self).fadeOut(500);

    }
    function changeDate(e){
        var target=util.getTarget(e);
        document.getElementsByTagName('td')[current.firstDay+current.day+7].className='show';
        current.day=parseInt(target.innerHTML);
        showDate();
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
    }
    function init(){
        getCurrentTime();
        getMonthDays();
        getArr();
        createTable(current);
        current.self.className='table_hide';
    }
    init();
    //先做日历身
    $(document).delegate('.show', 'click', changeDate);
    $(document).delegate('#btn-next','click',nextMonth);
    $(document).delegate('#btn-previous','click',previousMonth);
    //显示当前日期的特殊，点击某个日期则给这个日期特殊
    //点击前进后退则日期改变。

    //点击文本框日历面板显示，再点击隐藏
    //选择日期则面板隐藏，日期出现再框中
    $(document).delegate('#select-date','click',function(){
        $('table').fadeToggle();
    });

})();
