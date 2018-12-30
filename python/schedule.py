#2018.12.19 By cingkwing

import requests 				#requests库: http请求
from aip import AipOcr			#baidu-aip库: 验证码识别
from bs4 import BeautifulSoup	#beautifulsoup4库: html解析

#验证码识别函数
def recognize(img_bytes):
	config = {'appId':'15203164', 'apiKey':'l0WbzWBaRpSY37EEHhpK4vrP', 'secretKey':'efEGvZKP7wnO7Hqrtbsh26LFfGk79UDi'}
	ck = AipOcr(**config)
	result = ck.basicGeneral(img_bytes)
	print(result)
	if result['words_result_num'] is not 0:
		return result['words_result'][0]['words'].replace(' ','')

#获取验证码及对应Cookie函数
def get_vchart():
	url = 'http://219.244.71.113/validateCodeAction.do?random=0.7006780739149292'
	header = {'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8', 'Accept-Encoding': 'gzip, deflate', 'Accept-Language': 'zh-CN,zh;q=0.9', 'Connection': 'keep-alive', 'DNT': '1', 'Host': '219.244.71.113', 'Referer': 'http://219.244.71.113/login.jsp', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'}
	response = requests.get(url, headers=header, timeout=10)
	if response.status_code is 200:
		return recognize(response.content), response.cookies['JSESSIONID']
	else:
		print('vchart request failed!')

#模拟登录函数
def login(account, password, result, jsessionid):
	url = 'http://219.244.71.113/loginAction.do'
	datas = {'zjh': account, 'mm': password, 'v_yzm': result}
	header = {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8', 'Accept-Encoding': 'gzip, deflate', 'Accept-Language': 'zh-CN,zh;q=0.9', 'Cache-Control': 'max-age=0', 'Connection': 'keep-alive', 'Content-Length': '79', 'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'JSESSIONID='+jsessionid, 'DNT': '1', 'Host': '219.244.71.113', 'Origin': 'http://219.244.71.113', 'Referer': 'http://219.244.71.113/login.jsp', 'Upgrade-Insecure-Requests': '1', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'}
	response = requests.post(url, data=datas, headers=header, timeout=10)
	if response.status_code is 200 and response.text.count('frame') is not 0:
		return True;
	else:
		print('login request failed!')

#获取课表函数
def get_schedule(jsessionid):
	url = 'http://219.244.71.113/lnkbcxAction.do'
	datas = {'zxjxjhh': '2018-2019-1-1'}
	header = {'Accept': 'text/html, application/xhtml+xml, image/jxr, */*', 'Accept-Encoding': 'gzip, deflate', 'Accept-Language': 'zh-CN', 'Cache-Control': 'no-cache', 'Connection': 'Keep-Alive', 'Content-Length': '21', 'Content-Type': 'application/x-www-form-urlencoded', 'Cookie': 'JSESSIONID='+jsessionid, 'Host': '219.244.71.113', 'Referer': 'http://219.244.71.113/lnkbcxAction.do', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299'}
	response = requests.post(url, data=datas, headers=header, timeout=10)
	if response.status_code is 200:
		schedule = BeautifulSoup(response.text, 'html.parser').find('span', id='dayin')
		with open('schedule.html', 'w') as temp:
			temp.write('<html><head></head><body>'+schedule.prettify()+'</body></html>')
		return True
	else:
		print('schedule request failed!')

account = input('学号: ')
password = input('密码: ')
login_status = False
get_status = False
while not login_status:
	result, jsessionid = get_vchart()
	login_status = login(account, password, result, jsessionid)
while not get_status:
	get_status = get_schedule(jsessionid)