__author__ = 'Keech'

from flask import Flask,send_from_directory,request
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

_coffeesOnHold = 7;

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
    print(merchants[merchants.keys()[0]])
    for m in merchants:
        print(m.__class__)
        s = json.dumps(m)
        ms.append(s)
    return json.dumps(ms)

@app.route('/addTransaction', methods=['POST'])
def addTransaction():
    data = json.loads(request.form['coffeeOnHold'])
    c = {'status':data}
    _coffeesOnHold = coffeesOnHold+1
    return str(_coffeesOnHold)

@app.route('/redeemCoffeeOnHold', methods=["POST"])
def redeemCoffee(): 
   global _coffeesOnHold
   _coffeesOnHold = _coffeesOnHold-1; 
   return str(_coffeesOnHold)

@app.route('/coffeesOnHold')
def coffeesOnHold(): 
   return str(_coffeesOnHold)

@app.route('/webapp/<path:path>')
def send_webapp(path):
   return send_from_directory('webapp', path)

@app.route('/frontend/<path:path>')
def send_frontend(path):
   return send_from_directory('frontend', path)

if __name__ == '__main__':
   app.debug = True
   app.run()
