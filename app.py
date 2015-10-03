__author__ = 'Keech'

from flask import Flask, request
from Models.Session import Session
import os
import json
from suds.client import Client
from settings import APP_ROOT, openYaml
import yaml
from urllib import error


app = Flask(__name__)
Session = Session()
currentItemCount = 0
with openYaml() as stream:
    data = yaml.load(stream)['wsdlUrl']
aUrl = data["aUrl"]

while True:
    try:
        aClient = Client(aUrl)
        break
    except (TimeoutError, error.URLError) as e:
        pass
    print("Client has started successfully")
tUrl = data["tUrl"]
while True:
    try:
        tClient= Client(tUrl)
        break
    except (TimeoutError, error.URLError) as e:
        pass
    print("Client has started successfully")


@app.route('/')
def init():
    print("YAY")
    c = {'status': False}
    if aClient is not None:
        c['status'] = True
    return json.dumps(c)

@app.route('/login')
def login():
    user = Session.login(aClient)
    s = json.dumps(user.__dict__)
    return s

@app.route('/getMerchants')
def getMerchants():
    b = False
    if currentItemCount > 0:
        b = True
    merchants = Session.getMerchants(aClient, b)
    ms =[]
    s = None
    for m in merchants:
        print(m.__class__)
        s = json.dumps(m)
        ms.append(s)
    return json.dumps(ms)

@app.route('/addTransaction', methods=['POST'])
def addTransaction():
    print("addTransaction")
    byte = request.get_data()
    print(byte)
    data = byte.decode('ascii')
    print(data)
    print(data.__class__)
    rh = json.loads(data)[0]
    c = {'status': False}
    currentItemCount = len(rh.keys())
    if currentItemCount  > 0:
        c['status'] = True
    return json.dumps(c)

if __name__ == '__main__':
    app.debug = True
    app.run()