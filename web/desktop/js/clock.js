//画布
var canvas = document.getElementById('circleClock');
var clock = canvas.getContext('2d');

//弧长计算
function cal(degree){
	return (1.5+degree)*Math.PI;
}

//弧形作画
function draw(radius, start, end){
	clock.beginPath();
	clock.arc(150, 150, radius, cal(start), cal(end));
	clock.stroke();
}

//更新时钟
function run(){
	clock.clearRect(0, 0, canvas.width, canvas.height);
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds()+now.getMilliseconds()/1000;
	//
	draw(135, 0, hour/12);
	draw(140, 0, minute/30);
	draw(145, 0, second/30);
}

//更新文字
function time(){
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var text = now.toString().split(' ')[4].split(':')[0]+':'+now.toString().split(' ')[4].split(':')[1];
	clock.font = '70px Helvetica';
	clock.fillStyle = 'black';
	clock.fillText(text, 60, 175);
}

//重复
setInterval(function(){
	var count = 1;
	var repeat = setInterval(function(){
		run();
		time();
		count += 1;
		if(count == 150)
			clearInterval(repeat);
	});
}, 1000);