__author__ = 'Keech'
import yaml
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper


class Merchant:
    merchantId = ""
    merchantName = ""
    merchantLogoThumbnail = ""
    merchantLatitude = ""
    merchantLongitude = ""

    def __init__(self, merchantId,merchantName,merchantLogoThumbnail, merchantLatitude,merchantLongitude ):
        self.merchantId = merchantId
        self.merchantName = merchantName
        self.merchantLatitude = merchantLatitude
        self.merchantLongitude = merchantLongitude
        self.merchantLogoThumbnail = merchantLogoThumbnail

# merchantList = client.factory.create('merchantListParams')
# merchantList.institutionID = 7010
# merchantList.institutionPassword = '7010VALORA'
# merchantList.userProfile ='APPUSER'
# merchantList.responseLanguage = 'en'

