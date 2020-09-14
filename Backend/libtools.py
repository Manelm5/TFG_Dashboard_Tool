#!/usr/bin/python

###############################################################
# 3D Dashboard backend tools library
###############################################################
# Author: Carmelo Garcia (initial version 21/10/2019)
# Last updated: 22/10/2019 (Carmelo Garcia)
###############################################################

import sys
import os
import string
import json
import ast
import log
from bs4 import NavigableString, Tag


def extractValue(pagina, paramName):
    paramString = pagina.find(paramName)
    if len(paramString) == 0:
        log.logError('Bad xml syntax: ' + paramName + ' missing')
        return ""
    log.logDebug('Page parameter ' + str(paramName) + ' = ' + str(paramString))
    return paramString.get_text()


def extractXMLContents(pagina, paramName):
    paramString = pagina.find(paramName)
    if len(paramString) == 0:
        log.logError('Bad xml syntax: ' + paramName + ' missing')
        return
    log.logDebug('Page parameter XML ' + str(paramName) + ' = ' + str(paramString))
    outputList = dict()
    result = []

    for param in paramString.contents:
        for subparam in param.children:
            if isinstance(subparam, NavigableString):
                paramValue = param.contents
                log.logDebug('Param: ' + str(param.name) + ' = ' + str(param.string))
                result = str(param.string)
            else:
                subparamValue = subparam.contents
                result += subparamValue
        outputList[param.name] = result
        result = []
        log.logDebug('Param: ' + str(param.name) + ' = ' + str(result))

    return dictToString(outputList)


def arrayToString(inputArray):
    return '["' + '","'.join([str(elem) for elem in inputArray]) + '"]'


def dictToString(inputDict):
    log.logDebug('Dict input: ' + str(inputDict))
    salida = json.dumps(inputDict)
    log.logDebug('Dict to String: ' + str(salida))
    return salida


def dictToQuotedString(inputDict):
    return "'" + dictToString(inputDict) + "'"


def dictToStringManual(inputDict):
    salida = "'{"
    log.logDebug('Found ' + str(len(inputDict)) + ' items in dictionary')
    subSalida1 = ""
    for key, value in sorted(inputDict.items()):
        if (len(subSalida1) > 0):
            subSalida1 = subSalida1 + ','
        subSalida1 = subSalida1 + '"' + key + '": '
        if str(value) == "{}":
            subSalida1 = subSalida1 + '{}'
            continue
        subSalida1 = subSalida1 + '{'
        valueDict = ast.literal_eval(str(value))
        subSalida2 = ''
        log.logDebug('Found ' + str(len(valueDict)) + ' items in subDictionary')
        for subKey, subValue in sorted(valueDict.items()):
            if (len(subSalida2) > 0):
                subSalida2 = subSalida2 + ','
            subSalida2 = subSalida2 + '"' + subKey + '": '
            if str(subValue) == "":
                subSalida2 = subSalida2 + '{""}'
                continue
            subSalida2 = subSalida2 + str(subValue)
        subSalida1 = subSalida1 + subSalida2 + '}'
    salida = salida + subSalida1
    return salida + "}'"
