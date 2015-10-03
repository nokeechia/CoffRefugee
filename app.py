# -*- coding: utf-8 -*-
__author__ = 'Keech'

from flask import Flask
from Models.Session import Session
import os
import json
from suds.client import Client
from settings import APP_ROOT, openYaml
import yaml

app = Flask(__name__)
Session = Session()
with openYaml() as stream:
    data = yaml.load(stream)['wsdlUrl']
aUrl = data["aUrl"]
aClient = Client(aUrl)
tUrl = data["tUrl"]
tClient= Client(tUrl)


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
    merchants = Session.getMerchants(aClient)
    ms =[]
    s = None
    for m in merchants:
        s = json.dumps(m.__dict__)
        ms.append(s)
    return json.dumps(ms)

if __name__ == '__main__':
    app.debug = True
    app.run()
