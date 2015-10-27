from pyapp.bottle import route, run, request, response, redirect, static_file
import urllib.request
import json

rootPath = ""
mimeTypes = { 	'html':'text/html; charset=utf-8', 'js':'text/javascript; charset=utf-8', 'json':'application/javascript; charset=utf-8',
				'css':'text/css; charset=utf-8', 'png':'image/png',	'jpg':'image/jpeg', 'gif':'image/gif', 'ico':'image/x-icon',
				'ttf':'font/opentype','woff':'application/font-woff','woff2':'application/font-woff','eot':'application/vnd.ms-fontobject'}


data = [
    {"_id": 1, "email": "gaby@email.com", "age": 22, "gender": "female"},
    {"_id": 2, "email": "peter@email.com", "age": 24, "gender": "male"},
    {"_id": 3, "email": "caroline@email.com", "age": 23, "gender": "female"}
];










@route('/users')
@route('/users/')
def users():
	response.content_type = mimeTypes['json']
	return json.dumps(data)

@route('/')
@route('/index.html')
def index():
	return static_file('index.html', root='views', mimetype='text/html; charset=utf-8')

@route('/<path:path>')
def allStatic(path):
	fileType = ""
	for m in mimeTypes:
		fExt = ".%s"%m
		if path.find(fExt)!=-1:
			fileType = mimeTypes[m]
			break;
	# print(path)
	if fileType == "":
		print("some ERROR: %s"%path)
		return "404"
	return static_file(path, root=rootPath, mimetype=fileType)



run(host='0.0.0.0', port=9042, debug=True, reload=True)