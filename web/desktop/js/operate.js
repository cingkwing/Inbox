//2018.12.27 By cingkwing
//2018.12.28 By cingkwing

//--------------------------------------------------------初始化------------------------------------------------------

//初始化页面
function init(){
	var num = document.getElementById('taskNum');
	if(read('itemNum') != null){
		for(var i = 0; i<window.localStorage.length; i++){
			if(find(i) != 'itemNum')
				show(find(i), read(find(i)));
		}
	}
	else{
		store('itemNum', '0');
	}
	num.innerHTML = read('itemNum')+' task';
	numJudge();
	//alert('Init finished.\nTotal has '+read('itemNum')+' tasks.');
}
//数量判断
function numJudge() {
	if(document.getElementById('todoList').children.length > 8){
		if(parseInt(read('itemNum')) != 6)
			window.location.reload();
		else{
			var addButton = document.getElementById('add');
			addButton.style.color = '#dddddd';
			addButton.style.borderColor = '#dddddd';
			addButton.removeAttribute('onclick');
			document.getElementById('pro').addEventListener('transitionend', function(){
				window.location.reload();
			});
		}
	}
	document.getElementById('taskNum').innerHTML = read('itemNum')+' task';
}
//展示任务
function show(key, value) {
	var item = document.createElement('DIV');
	item.className = 'item';
	item.id = key;
	item.innerHTML = "<button class='complete' onclick='complete(this)'>&nbsp</button><span class='content'>"+value+"</span><button class='more' onclick='more(this)'><img src='images/list.png'></button>";
	document.getElementById('todoList').insertBefore(item,document.getElementById('todoList').children[2]);
}

//---------------------------------------------------onclick响应函数----------------------------------------------------

//新建任务
function newTask(){
	var taskname = prompt('Taskname:');
	if(taskname != null) {
		store('itemNum', parseInt(read('itemNum'))+1);
		var key = 'item'+taskname;
		store(key, taskname);
		show(key, taskname);
		numJudge();
	}
}

//标记任务已完成
function complete(element){
	element.style.borderColor = '#dddddd';
	element.nextElementSibling.style.color = '#dddddd';
	element.nextElementSibling.style.textDecoration = 'line-through';
	element.setAttribute('onclick','incomplete(this)');
	var modal = document.getElementById('informModal');
	modal.style.visibility = 'visible';
	var pro = document.getElementById('pro');
	pro.style.width = '100%';
	pro.addEventListener("transitionend", function(){
		modal.style.visibility = 'hidden';
		pro.style.width = '0px';
		del(element.parentNode.id);
	})
	var inform = document.getElementById('info');
	inform.innerText = 'Task marked completed!';
	setTimeout(function(){
		store('itemNum', parseInt(read('itemNum'))-1);
		numJudge();
	},1800);
}
//标记任务未完成
function incomplete(element){
	element.style.borderColor = '#999999';
	element.nextElementSibling.style.color = 'black';
	element.nextElementSibling.style.textDecoration = 'none';
	element.setAttribute('onclick','complete(this)');
	var modal = document.getElementById('informModal');
	modal.style.visibility = 'visible';
	var pro = document.getElementById('pro');
	pro.style.width = '100%';
	pro.addEventListener("transitionend", function(){
		modal.style.visibility = 'hidden';
		pro.style.width = '0px';
		store(element.parentNode.id, element.parentNode.innerText);
	})
	var inform = document.getElementById('info');
	inform.innerText = 'Task marked incompleted!';
	setTimeout(function(){
		store('itemNum', parseInt(read('itemNum'))+1);
		numJudge();
	},1800);
}
//任务的'更多选项'菜单
function more(element){
	alert('Task'+element.previousElementSibling.innerText+'\nclick more!');
}

//------------------------------------------------------localStorage封装----------------------------------------------

//本地存储
function store(key, value) {
	window.localStorage.setItem(key, value);
}
//本地读取
function read(key) {
	return window.localStorage.getItem(key);
}
function find(index) {
	return window.localStorage.key(index);
}
//本地删除
function del(key) {
	window.localStorage.removeItem(key);
}
//清除本地缓存
function clearAll() {
	window.localStorage.clear();
	//for(var i = 0; i<=window.localStorage.length; i++){
	//	window.localStorage.removeItem(window.localStorage.key(i));
	//}
	alert('Clear finished.');
	window.location.reload();
}
//查看本地缓存
function detail() {
	var details = '';
	for(var i = 0; i<window.localStorage.length; i++) {
		details += '\nkey : '+window.localStorage.key(i)+'    value : '+read(window.localStorage.key(i));
	}
	alert('details:\n'+details);
}