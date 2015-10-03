import json
from Models import Customer

__author__ = 'Keech'
import os
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

def openYaml():
    return open(os.path.join(APP_ROOT,'Config.yaml'),'r')

def returnMerchantJSON():
    merchants = {"merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//6f2e002d-c6f1-4bc9-9f7d-d4f538c7058b_thumb.jpg",
   "merchantLongitude": "8.488552",
   "merchantName":"kkiosk",
   "merchantId":"V1",
   "merchantLatitude":"47.391478",
   "couponsAvailable":"24",
   "couponsGiven":"3"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//0ead5c3b-b5af-4e88-a916-c7334708d6a4_thumb.jpg",
   "merchantLongitude":"8.536542",
   "merchantName":"Avec",
   "merchantId":"V2",
   "merchantLatitude":"47.378991",
   "couponsAvailable":"3",
   "couponsGiven":"18"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//03be2fbc-8fb0-4d6b-929a-90dac8ea6e2d_thumb.png",
   "merchantLongitude":"8.539072",
   "merchantName":"Brezelk\u00f6nig",
   "merchantId":"V3",
   "merchantLatitude":"47.378950",
   "couponsAvailable":"10",
   "couponsGiven":"45"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//0c71a43c-3a54-47db-915c-2bf7bf6550ea_thumb.jpg",
   "merchantLongitude":"8.523853",
   "merchantName":"Caff\u00e8 Spettacolo",
   "merchantId":"V4",
   "merchantLatitude":"47.371149",
   "couponsAvailable":"14",
   "couponsGiven":"24"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//6f2e002d-c6f1-4bc9-9f7d-d4f538c7058b_thumb.jpg",
   "merchantLongitude":"8.549087",
   "merchantName":"kkiosk",
   "merchantId":"V1",
   "merchantLatitude":"47.386028",
   "couponsAvailable":"7",
   "couponsGiven":"12"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//6f2e002d-c6f1-4bc9-9f7d-d4f538c7058b_thumb.jpg",
   "merchantLongitude":"8.498772",
   "merchantName":"kkiosk",
   "merchantId":"V1",
   "merchantLatitude":"47.386663",
   "couponsAvailable":"2",
   "couponsGiven":"32"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//0ead5c3b-b5af-4e88-a916-c7334708d6a4_thumb.jpg",
   "merchantLongitude":"8.540334",
   "merchantName":"Avec",
   "merchantId":"V2",
   "merchantLatitude":"47.378232",
   "couponsAvailable":"19",
   "couponsGiven":"10"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//03be2fbc-8fb0-4d6b-929a-90dac8ea6e2d_thumb.png",
   "merchantLongitude":"8.548686",
   "merchantName":"Brezelk\u00f6nig",
   "merchantId":"V3",
   "merchantLatitude":"47.366703",
   "couponsAvailable":"23",
   "couponsGiven":"5"
},{
   "merchantLogoThumbnail":"http://www.axiomwebservices.com//MeritImages//0c71a43c-3a54-47db-915c-2bf7bf6550ea_thumb.jpg",
   "merchantLongitude":", 8.498515",
   "merchantName":"Caff\u00e8 Spettacolo",
   "merchantId":"V4",
   "merchantLatitude":"47.385907",
   "couponsAvailable":"14",
   "couponsGiven":"48"
}

    return merchants