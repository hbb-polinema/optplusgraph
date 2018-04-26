# Lightweight OPT server that works on both Python 2 and 3

# NOTE that this is meant only for testing and not deployment, since
# there is no sandboxing

# to invoke, run 'python bottle_server.py'
# and visit http://localhost:8080/index.html
#
# external dependencies: bottle
#
# easy_install pip
# pip install bottle

from bottle import route, run, static_file

@route('/<filepath:path>')
def index(filepath):
    return static_file(filepath, root='.')

if __name__ == "__main__":
    run(host='0.0.0.0', port=8080, reloader=True) # host 0.0.0.0 --> allow access from outside
