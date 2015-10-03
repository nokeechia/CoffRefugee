from CoffRefugee.Models import Merchant, Customer

__author__ = 'Keech'
import yaml
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper
from suds.client import Client
import json
#TODO: Remove as this is for debugging

class Session:

    user = None
    url = ""
    merchants =[]

    def __init__(self):
        with open('loginConfig.yaml','r') as stream:
            data = yaml.load(stream)['wsdlUrl']
        self.url = data["url"]

    def login(self):
        client = Client(self.url)
        with open('loginConfig.yaml','r') as stream:
          data = yaml.load(stream)['login']
        customerLogin = client.factory.create(data["factory"])
        customerLogin.institutionID = data["institutionID"]
        customerLogin.instrumentType = data["instrumentType"]
        customerLogin.institutionPassword = data["institutionPassword"]
        customerLogin.userProfile = data["userProfile"]
        customerLogin.instrumentNo = data["instrumentNo"]
        customerLogin.password = data['password']
        customerLoginResponse = client.service.customerLogin(customerLogin)
        print(customerLoginResponse)
        customer = Customer(customerLoginResponse.customerLoginOutputs.firstName, customerLoginResponse.customerLoginOutputs.lastName, customerLoginResponse.customerLoginOutputs.email, customerLoginResponse.customerLoginOutputs.internalCustomerNo)
        return customer


    def getMerchants(self):
        client = Client(self.url)
        merchantList = client.factory.create('merchantListParams')
        with open('loginConfig.yaml','r') as stream:
            data = yaml.load(stream)['login']
        merchantList.institutionID = data["institutionID"]
        merchantList.institutionPassword = data["institutionPassword"]
        merchantList.userProfile = data["userProfile"]
        with open('loginConfig.yaml','r') as stream:
            data = yaml.load(stream)['common']
        merchantList.userProfile = data["responseLanguage"]
        merchantListResponse = client.service.getMerchantList(merchantList)
        ms = []
        print(merchantListResponse)
        for m in merchantListResponse.merchantListSetList.merchantListSet:
            print(m)
            print(dir(m))
            currentMerch = Merchant(m.merchantId,m.merchantName, m.merchantLogoThumbnail, m.merchantLatitude, m.merchantLongitude)
            ms.append(currentMerch)
        return ms

if __name__ == "__main__":
    session = Session()
    session.user = session.login()
    s = json.dumps(session.user.__dict__)
    print(s)
    session.merchants = session.getMerchants()
    for m in session.merchants:
        s = json.dumps(m.__dict__)
        print(s)