from suds.client import Client

import yaml
try:
    from yaml import CLoader as Loader, CDumper as Dumper
except ImportError:
    from yaml import Loader, Dumper


class Customer:

    firstName = ""
    lastName = ""
    email = ""
    internalCustomerNo = 0

    def __init__(self,fName, lName, email, custNo):
        self.firstName = fName
        self.lastName = lName
        self.email = email
        self.internalCustomerNo = custNo






