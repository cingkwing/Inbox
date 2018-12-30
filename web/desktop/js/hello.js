function changeHello(hour) {
	var text;
	if(hour<7 || hour>22) text = 'Good Night, cingkwing';
	else if(hour<12) text = 'Good Morning, cingkwing';
	else if(hour<14) text = 'Lunch Break, cingkwing';
	else if(hour<18) text = 'Good Afternoon, cingkwing';
	else if(hour<19) text = 'Dinner Time, cingkwing';
	else if(hour<23) text = 'Good Evening, cingkwing';
	document.getElementById('hello').innerHTML = text;
}

function spendHours(){
	var now = new Date();
	return parseInt((now.getTime()-Date.parse(now.toLocaleDateString()+' 0:00:00'))/1000/60/60);
}

function check(){
	setInterval(changeHello(spendHours()),1000*60*60);
}

changeHello(spendHours());
setTimeout("check()",parseInt(now.getTime()-Date.parse(now.toLocaleDateString()+' '+now.getHours()+':00:00')));