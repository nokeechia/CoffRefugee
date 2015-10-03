__author__ = 'Keech'

from suds.client import Client

url = 'http://merit.axiomwebservices.com/MeritEChannelsAccessZurich/service.svc?wsdl'

client = Client(url)

print(client)

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

balanceInq = client.factory.create('ns30:customerLoginParameters')
balanceInq.institutionID = 7010
balanceInq.instrumentType = 'R'
balanceInq.institutionPassword = '7010VALORA'
balanceInq.userProfile ='APPUSER'
balanceInq.instrumentNo = '4047934000052141'
balanceInq.password = 'axiom'
print(balanceInq)

balanceInqResult = client.service.customerLogin(balanceInq)
print(balanceInqResult)


