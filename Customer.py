from suds.client import Client

import yaml
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

url = 'http://merit.axiomwebservices.com/MeritEChannelsAccessZurich/service.svc?wsdl'

client = Client(url)

# result = client.service.customerLogin("""<soap:Body>
#     <MeritEChannelsAccessSvc:customerLogin>
#       <MeritEChannelsAccessSvc:customerLoginParams xsi:type="tns1:customerLoginParameters">
#         <tns2:institutionID>7010</tns2:institutionID>
#         <tns2:institutionPassword>7010VALORA</tns2:institutionPassword>
#         <tns1:instrumentNo>sara.cicalissi@axiom.com</tns1:instrumentNo>
#         <tns1:password>axiom</tns1:password>
#         <tns1:instrumentType>E</tns1:instrumentType>
#       </MeritEChannelsAccessSvc:customerLoginParams>
#     </MeritEChannelsAccessSvc:customerLogin>
#   </soap:Body>""")

def login(): 
    with open('loginConfig.yaml','r') as stream: 
      data = yaml.load(stream)['login']
    customerLogin = client.factory.create(data["factory"])
    customerLogin.institutionID = data["institutionID"]
    customerLogin.instrumentType = data["instrumentType"]
    customerLogin.institutionPassword = data["institutionPassword"]
    customerLogin.userProfile = data["userProfile"]
    customerLogin.instrumentNo = data["instrumentNo"]
    customerLogin.password = data['password']
    return client.service.customerLogin(customerLogin)



