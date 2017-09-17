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
]

def getDataEntry(data, id, type, update=""):
	for i in range(0,len(data)):
		if data[i]["_id"] == int(id):
			if type == "get":
				return data[i]
			if type == "put":
				data[i] = update
			if type == "delete":
				data.pop(i)

def getHighest(array):
	return max(array, key=lambda array:array['_id'])['_id']

def setDataEntry(data, update):
	next = getHighest(data)+1
	entry = {
		"_id" : next+1,
		"email" : update['email'],
		"age" : update['age'],
		"gender" : update['gender']
	}
	data.append(entry)


@route('/users',method='GET')
def users():
	response.content_type = mimeTypes['json']
	return json.dumps(data)

@route('/users',method='POST')
def postUsers():
	postdata = request.body.read()
	parJson = json.loads(postdata.decode('utf-8'))
	setDataEntry(data, parJson)
	return json.dumps({})

@route('/users/<id>',method="GET")
def getUsers(id):
	response.content_type = mimeTypes['json']
	re = getDataEntry(data,id,"get")
	return json.dumps(re)

@route('/users/<id>',method="PUT")
def putUsers(id):
	postdata = request.body.read()
	parJson = json.loads(postdata.decode('utf-8'))
	getDataEntry(data,id,"put",parJson)

@route('/users/<id>',method="DELETE")
def delUser(id):
	getDataEntry(data,id,"delete")

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