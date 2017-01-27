from bottle import route, run, static_file

DEBUG = True

@route('/<filepath:path>')
def index(filepath):
	if(DEBUG): print "\nindex() = ",filepath
	return static_file(filepath, root='.')

if __name__ == "__main__":
    run(host='localhost', port=80, reloader=True)
