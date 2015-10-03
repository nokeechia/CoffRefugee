__author__ = 'Keech'

from flask import Flask
from CoffRefugee.Models.Session import Session
import os
import json
app = Flask(__name__)
Session = Session()


@app.route('/')
def init():
    print("YAY")
    return "SWAG"

@app.route('/login')
def login():
    user = Session.login()
    s = json.dumps(user.__dict__)
    return s

@app.route('/getMerchants')
def getMerchants():
    merchants = Session.getMerchants()
    ms =[]
    s = None
    for m in merchants:
        s = json.dumps(m.__dict__)
        ms.append(s)
    return json.dumps(ms)

if __name__ == '__main__':
    app.debug = True
    app.run()