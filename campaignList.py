from suds.client import Client

import yaml
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper

url = 'http://merit.axiomwebservices.com/MeritEChannelsAccessZurich/service.svc?wsdl'

client = Client(url)

def login(): 
    with open('loginConfig.yaml','r') as stream: 
      data = yaml.load(stream)['login']
    getCampaignList = client.factory.create(data["factory"])
    getCampaignList.institutionID = data["institutionID"]
    getCampaignList.instrumentType = data["instrumentType"]
    getCampaignList.institutionPassword = data["institutionPassword"]
    getCampaignList.userProfile = data["userProfile"]
    getCampaignList.instrumentNo = data["instrumentNo"]
    getCampaignList.password = data['password']
    getCampaignList.recordType = data["CAMP"]
    getCampaignList.scheme = data[1]
    getCampaignList.campaignList = data[1000]
    #getCampaignList.campaignName = data['password']
    #getCampaignList.campaignTypeList = data['password']
    #getCampaignList.campaignCategory = data['password']
    #getCampaignList.campaignStatusList = data['password']
    #getCampaignList.effectiveDateFrom = data['password']
    #getCampaignList.effectiveDateTo = data['password']
    #getCampaignList.expirationDateFrom = data['password']
    #getCampaignList.expirationDateTo = data['password']
    #getCampaignList.effectiveOnDate = data['password']
    #getCampaignList.effectiveUntilDate = data['password']
    #getCampaignList.baseGroupSpecType = data['password']
    #getCampaignList.baseGroupSpec = data['password']
    #getCampaignList.customerSpec = data['password']
    #getCampaignList.merchantNumber = data['password']
    #getCampaignList.merchantSpecType = data['password']
    #getCampaignList.merchantList = data['password']
    #getCampaignList.sectorList = data['password']
    #getCampaignList.rewardType = data['password']
    #getCampaignList.rewardDeliveryMode = data['password']
    #getCampaignList.publicCampaignFlag = data['password']
    #getCampaignList.participationFlag = data['password']
    #getCampaignList.achievementFlag = data['password']
    #getCampaignList.hasActiveAnnouncementEvent = data['password']
    #getCampaignList.sourceChannel = data['password']
    #getCampaignList.runOption = data['password']

    return client.service.getCampaignList(getCampaignList)



