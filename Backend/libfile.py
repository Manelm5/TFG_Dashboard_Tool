#!/usr/bin/python

###############################################################
# 3D Dashboard backend file helpers library
###############################################################
# Author: Carmelo Garcia (initial version 18/10/2019)
# Last updated: 18/10/2019 (Carmelo Garcia)
###############################################################

import sys
import os
import string
from bs4 import BeautifulSoup
import settings
import log


def createPath(pathToCreate):
    if not (os.path.exists(pathToCreate)):
        os.makedirs(pathToCreate)


def readXMLFile(filePath):
    xmlDom = BeautifulSoup(open(filePath, 'r'), 'xml')
    for elem in xmlDom.find_all():
        if elem.string is not None:
            elem.string = elem.string.strip()
    xmlDomString = str(xmlDom).replace('\n', '')
    print(xmlDomString)
    return BeautifulSoup(xmlDomString, 'xml')


def readTextFile(filePath):
    with open(filePath, 'r') as fitxer:
        return fitxer.read()


def writeJSVariable(fitxer, nom, valor):
    fitxer.write('var ' + str(nom) + ' = ' + str(valor) + ';\n')


def writeJSElement(fitxer, listElement):
    writeJSVariable(fitxer, str(listElement[0]), str(listElement[1]))


def writeVarsToFile(filePath, varList):
    with open(filePath, 'w') as fitxer:
        [writeJSElement(fitxer, p) for p in varList]
