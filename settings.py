from Models import Customer

__author__ = 'Keech'
import os
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

def openYaml():
    return open(os.path.join(APP_ROOT,'Config.yaml'),'r')

