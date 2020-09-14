#!/usr/bin/python

###############################################################
# 3D Dashboard backend config library
###############################################################
# Author: Carmelo Garcia (initial version 18/10/2019)
# Last updated: 20/2/2020 (Manel Muñiz)
###############################################################

import sys
import os
import string
import time
import glob
import settings
import log
import libfile


def setLogPath(valor):
    settings.logPath = valor


def setClientsPath(valor):
    settings.clientsPath = valor


def setOutputPath(valor):
    settings.outputPath = valor


def setOutputJSFilename(valor):
    settings.outputJSFilename = valor


def setCommonFilePath(valor):
    settings.commonFilePath = valor


def setCommonClientPath(valor):
    settings.commonClientPathPath = valor


def setCommonLogPath(valor):
    settings.commonLogPath = valor


def setOutputJSCommonPath(valor):
    settings.outputJSCommonPath = valor


def setPlotlyPath(valor):
    settings.plotlyPath = valor


configParamProcessors = {'logPath': setLogPath, 'clientsPath': setClientsPath, 'outputPath': setOutputPath,
                         'outputFilename': setOutputJSFilename, 'commonFilePath': setCommonClientPath,
                         'commonLogPath': setCommonLogPath,
                         'commonFilePath': setCommonFilePath, 'outputJSCommonPath': setOutputJSCommonPath,
                         'plotlyPath': setPlotlyPath}


def processConfigLine(linea):
    if linea[0] == '#':
        return
    param = linea.split('=')

    if param[0] not in configParamProcessors:
        log.logError('Unknown parameter ' + param[0])
        return

    if len(param) != 2:
        log.logError('Invalid parameter value for ' + param[0])
        return

    log.logDebug('Processing param ' + param[0])

    configParamProcessors[param[0]](param[1])


def loadConfig(configFile):
    fileContent = libfile.readTextFile(configFile)
    linees = fileContent.splitlines()
    result = map(processConfigLine, linees)
    log.logDebug(list(result))
