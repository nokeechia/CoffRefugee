__author__ = 'Keech'

from flask import Flask
from CoffRefugee.Models.Session import Session
import os
import json
from suds.client import Client
from CoffRefugee.settings import APP_ROOT, openYaml
import yaml

app = Flask(__name__)
Session = Session()
with openYaml() as stream:
    data = yaml.load(stream)['wsdlUrl']
url = data["url"]
client = Client(url)


@app.route('/')
def init():
    print("YAY")
    c = {'status': False}
    if client is not None:
        c['status'] = True
    return json.dumps(c)

@app.route('/login')
def login():
    user = Session.login(client)
    s = json.dumps(user.__dict__)
    return s

@app.route('/getMerchants')
def getMerchants():
    merchants = Session.getMerchants(client)
    ms =[]
    s = None
    for m in merchants:
        s = json.dumps(m.__dict__)
        ms.append(s)
    return json.dumps(ms)

if __name__ == '__main__':
    app.debug = True
    app.run()