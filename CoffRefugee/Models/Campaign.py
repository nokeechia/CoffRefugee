from suds.client import Client

import yaml
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper
#
#
# // REQUEST:
#   <soap:Body>
#     <MeritEChannelsAccessSvc:getCampaignList>
#       <MeritEChannelsAccessSvc:getCampaignListParams xsi:type="tns1:getCampaignListParameters">
#         <tns2:institutionID>7010</tns2:institutionID>
#         <tns2:institutionPassword>7010VALORA</tns2:institutionPassword>
#         <tns2:userProfile>APPUSER</tns2:userProfile>
#         <tns2:responseLanguage>en</tns2:responseLanguage>
#         <tns2:sortKeyName>EXPIRATION_DATE</tns2:sortKeyName>
#         <tns2:sortKeyDir>A</tns2:sortKeyDir>
#         <tns2:forceCount>N</tns2:forceCount>
#         <tns1:recordType>CAMP</tns1:recordType>
#         <tns1:campaignTypeList>DERV</tns1:campaignTypeList>
#         <tns1:campaignStatusList>A,PB</tns1:campaignStatusList>
#         <tns1:customerSpec>1000086M</tns1:customerSpec>
#         <tns1:sourceChannel>APP</tns1:sourceChannel>
#         <tns1:runOption>C</tns1:runOption>
#       </MeritEChannelsAccessSvc:getCampaignListParams>
#     </MeritEChannelsAccessSvc:getCampaignList>
#   </soap:Body>
class Campaign:

    def __init__(self):
        with open('Config.yaml','r') as stream:
          data = yaml.load(stream)['login']
        self.institutionID = data["institutionID"]
        self.instrumentType = data["instrumentType"]
        self.institutionPassword = data["institutionPassword"]
        self.userProfile = data["userProfile"]



    def login(self):
        with open('Config.yaml','r') as stream:
            data = yaml.load(stream)['wsdlUrl']
        url = data["url"]
        client = Client(url)
        with open('Config.yaml','r') as stream:
          data = yaml.load(stream)['campaignList']
        CampaignList = client.factory.create(data["factory"])
        CampaignList.sourceChannel = data["sourceChannel"]
        with open('Config.yaml','r') as stream:
          data = yaml.load(stream)['login']
        CampaignList.institutionID = data["institutionID"]
        CampaignList.instrumentType = data["instrumentType"]
        CampaignList.institutionPassword = data["institutionPassword"]
        CampaignList.userProfile = data["userProfile"]

        with open('Config.yaml','r') as stream:
            data = yaml.load(stream)['common']
        CampaignList.userProfile = data["responseLanguage"]
        return client.service.getCampaignList(CampaignList)



