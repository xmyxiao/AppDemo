var AppJs = {};
//绑定事件
AppJs.on = function(obj, event, func){
	$(document).off(event, obj).on(event, obj, func);
};

//mui框架中页面相关
AppJs.mu = {};
//对应样式
AppJs.mu.normalStyle = {top:'45px',bottom:0};
AppJs.mu.centerStyle = {top:'45px',bottom:'50px'};
//创建normalStyle类型的子页面
AppJs.mu.normalPage = function(id, options){
	var opt = $.extend({}, options, AppJs.mu.normalStyle);  //将后面的参数合并
	return AppJs.mu.page(id, {styles : opt});
};
//创建centerStyle类型的子页面
AppJs.mu.centerPage = function(id, options){
	var opt = $.extend({}, options, AppJs.mu.normalStyle);
	return AppJs.mu.page(id, {styles : opt});
};
//生成创建子页面参数
AppJs.mu.page = function(id, options){
	var url = id + '.html';
	
	options.id = id;
	options.url = url;
	return options;
};

/* 本地存储相关
 * plus.storage管理应用本地数据存储区，用于应用数据的保存和读取
*/
//获取应用存储区中保存的键值对的个数
AppJs.mu.length = function(){
	return plus.storage.getLength();
};
//获取键值对中指定索引值的key值
AppJs.mu.key = function(i){
	return plus.storage.key(i);
};
//通过键(key)检索获取应用存储的值
AppJs.mu.getItem = function(key){
	if(key){
		for(var i=0; i<AppJs.mu.length(); i++) {
			if(key == plus.storage.key(i)){
				return plus.storage.getItem(key);
			}
		};
	}
	
	return null;
};
//插入数据
AppJs.mu.insertItem = function(key, value){
	plus.storage.setItem(key, value);
};
//删除数据
AppJs.mu.delItem = function(key){
	plus.storage.removeItem(key);
};
//清除应用所有的键值对存储数据
AppJs.mu.clear = function(){
	plus.storage.clear();
};

// web sql
AppJs.mu.db = function(name, size){
	var db_name = name ? name : 'db_mu';
	var db_size = size ? size : 2;
	//打开一个已经存在的数据库，如果数据库不存在，创建数据库。
	return openDatabase(db_name, '1.0', 't_plan_day_todo', db_size * 1024 * 1024);
};
//更新数据
AppJs.mu.update = function(db, sql){
	if(db &&sql){
		db.transaction(function(tx){tx.executeSql(sql);});	
	}
};
//查询数据
AppJs.mu.query = function(db, sql, func){
	if(db && sql){
		db.transaction(function(tx){
			tx.executeSql(sql, [], function(tx, results) {
				func(results);
			}, null);
		});
	}
};