from suds.client import Client

import yaml
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

class Voucher:




    def __init__(self):
        with open('Config.yaml','r') as stream:
          data = yaml.load(stream)['login']
        self.institutionID = data["institutionID"]
        self.instrumentType = data["instrumentType"]
        self.institutionPassword = data["institutionPassword"]
        self.userProfile = data["userProfile"]







