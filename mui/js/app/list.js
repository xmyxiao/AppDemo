//初始化
mui.init();
//所有方法都放到这里
mui.plusReady(function(){
	//初始化表格
	initHelp();
});
function initHelp(){
	//通过键检索获取应用存储的值
    var help = AppJs.mu.getItem('help');
    if(help == 'first'){
        AppJs.mu.update(AppJs.mu.db(), getSql(1, '事项5', '待办事项5'));
        AppJs.mu.update(AppJs.mu.db(), getSql(2, '事项4', '待办事项4'));
        AppJs.mu.update(AppJs.mu.db(), getSql(3, '事项3', '待办事项3'));
        AppJs.mu.update(AppJs.mu.db(), getSql(4, '事项2', '待办事项2'));
        AppJs.mu.update(AppJs.mu.db(), getSql(5, '事项1', '待办事项1'));
        AppJs.mu.update(AppJs.mu.db(), getSql(6, '功能8', '退出程序'));
        AppJs.mu.update(AppJs.mu.db(), getSql(7, '功能7', '右滑菜单'));
        AppJs.mu.update(AppJs.mu.db(), getSql(8, '功能6', '左上角查看完成事项'));
        AppJs.mu.update(AppJs.mu.db(), getSql(9, '功能5', '右上角添加待办事项'));
        AppJs.mu.update(AppJs.mu.db(), getSql(10, '功能4', '长按待办事项可以删除'));
        AppJs.mu.update(AppJs.mu.db(), getSql(11, '功能3', '右滑待办事项可以完成'));
        AppJs.mu.update(AppJs.mu.db(), getSql(12, '功能2', '点击待办事项可以查看详情'));
        AppJs.mu.update(AppJs.mu.db(), getSql(13, '功能1', '首页显示待办事项列表'));
         
        AppJs.mu.insertItem('help','notfirst');
    }
     
    initList();
}
//插入数据
function getSql(index, title, content){
    return 'insert into t_plan_day_todo (id, plan_title, plan_content) values (' + index + ', "' + title + '", "' + content + '")';
}
 
//初始化列表
function initList(){
    var $ul = $('#todolist').empty();//置空列表
    AppJs.mu.query(AppJs.mu.db(), 'select * from t_plan_day_todo order by id desc', function(res){//查询本地数据库
        for (i = 0; i < res.rows.length; i++) {
            $ul.append(genLi(res.rows.item(i)));
        }
        showList($ul);//展示列表
    });
}
//生成单行列表
function genLi(data){
    var id = data.id;
    var title = data.plan_title;
    var content = data.plan_content;
     
    var li = 
        '<li class="mui-table-view-cell" id="todoli_' + id + '" data-id="' + id + '">' +
            '<div class="mui-slider-right mui-disabled">' + 
                '<a class="mui-btn mui-btn-red doneBtn">完成</a>' +
            '</div>' + 
            '<div class="mui-slider-handle">' + 
                '<div class="mui-media-body">' + 
                    title + 
                    '<p class="mui-ellipsis">'+content+'</p>' + 
                '</div>' + 
            '</div>' +
        '</li>';
         
    return li;
}
//如果没有列表项则隐藏列表
function showList(ul){
    if(ul.find('li').size() > 0 &&  ul.is(':hidden')) ul.show();    
}