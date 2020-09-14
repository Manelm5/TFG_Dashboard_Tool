#!/usr/bin/python

###############################################################
# 3D Dashboard backend function library
###############################################################
# Author: Carmelo Garcia (initial version 16/10/2019)
# Last updated: 15/6/2020 (Manel Muñiz)
###############################################################


import json
import settings
import log
import libfile
import libtools
import libmodule
import settingsclient as setting
from datetime import datetime


class Client:

    def __init__(self):
        self.frameIdArray = []
        self.frameConfigArray = []
        self.frameTimeoutArray = []
        self.moduleTypesArray = dict()
        self.moduleLocationsArray = dict()
        self.moduleConfigsArray = dict()
        self.moduleDatasArray = dict()
        self.typesArray = []
        self.locationsArray = []
        self.configsArray = dict()
        self.datasArray = dict()

        self.jsVarList = []

    def processPageId(self, pagina):
        pageId = libtools.extractValue(pagina, setting.pageIdLabel)
        self.frameIdArray.append(pageId)
        return pageId

    def processPageType(self, pagina):
        pageType = libtools.extractValue(pagina, setting.pageTypeLabel)
        self.frameConfigArray.append(pageType)

    def processPageTimeout(self, pagina):
        pageTimeout = libtools.extractValue(pagina, setting.pageTimeoutLabel)
        self.frameTimeoutArray.append(pageTimeout)

    def processModuleType(self, modul):
        moduleType = libtools.extractValue(modul, setting.moduleTypeLabel)
        self.typesArray.append(str(moduleType))
        return moduleType

    def processModuleLocation(self, modul):
        moduleLocation = libtools.extractValue(modul, setting.moduleLocationLabel)
        log.logDebug('Appending location: ' + str(moduleLocation))
        self.locationsArray.append(str(moduleLocation))
        return moduleLocation

    def processModuleConfig(self, modul, modulLocation):
        moduleConfig = libtools.extractXMLContents(modul, setting.moduleConfigLabel)
        log.logDebug('Appending config: ' + str(moduleConfig))
        if not moduleConfig:
            moduleConfig = ""
        self.configsArray[modulLocation] = moduleConfig
        return moduleConfig

    def processModuleData(self, modulConfig, modulLocation, modulType, paginaId):

        moduleData = libmodule.processModuleRequest(modulConfig, modulType, paginaId)
        if not moduleData:
            moduleData = ''
        log.logDebug('Appending data: ' + str(moduleData))
        self.datasArray[modulLocation] = json.dumps(moduleData)
        return moduleData

    def processModule(self, modul, paginaId):
        modulType = self.processModuleType(modul)
        modulLocation = self.processModuleLocation(modul)
        modulConfig = self.processModuleConfig(modul, modulLocation)
        log.logDebug('module types: ' + str(list(self.typesArray)))
        log.logDebug('module locations: ' + str(list(self.locationsArray)))
        log.logDebug('module configs: ' + str(self.configsArray))

        modulData = self.processModuleData(modulConfig, modulLocation, modulType, paginaId)
        log.logDebug('module datas: ' + str(self.datasArray))

    def processPageModules(self, pagina, paginaId):

        moduls = pagina.find_all(setting.moduleLabel)
        result = [self.processModule(modul, paginaId) for modul in moduls]
        log.logDebug(list(result))

        self.moduleTypesArray[paginaId] = self.typesArray
        self.moduleLocationsArray[paginaId] = self.locationsArray
        self.moduleConfigsArray[paginaId] = self.configsArray
        self.moduleDatasArray[paginaId] = self.datasArray

    def processPage(self, pagina):
        log.logDebug('Processing page...')
        paginaId = self.processPageId(pagina)
        self.processPageType(pagina)
        self.processPageTimeout(pagina)
        self.processPageModules(pagina, paginaId)

    def processClientId(self, fileContent):
        clientId = fileContent.find(setting.clientIDLabel)
        if len(clientId) == 0:
            log.logError('Bad xml syntax: clientId missing')
            exit(1)
        return clientId.get_text()

    def processFooterText(self, fileContent):
        footerText = fileContent.find(setting.footerTextLabel)
        if len(footerText) == 0:
            footerText = ''
        return '"' + footerText.get_text() + '"'

    def processDateTime(self):
        now = datetime.now()
        time = '"' + now.strftime("%m/%d/%Y, %H:%M:%S") + '"'
        return time

    def addVarToList(self, nom, valor):
        singleElement = [nom, valor]
        self.jsVarList.append(singleElement)
        log.logDebug('Adding to list ' + nom + ' = ' + valor)

    def processClientPages(self, fileContent):

        pages = fileContent.find_all(setting.pageLabel)
        result = map(self.processPage, pages)
        log.logDebug(list(result))

        self.addVarToList(setting.frameIdVar, libtools.arrayToString(self.frameIdArray))
        self.addVarToList(setting.frameConfigVar, libtools.arrayToString(self.frameConfigArray))
        self.addVarToList(setting.frameTimeoutVar, libtools.arrayToString(self.frameTimeoutArray))
        self.addVarToList(setting.moduleTypesVar, libtools.dictToQuotedString(self.moduleTypesArray))
        self.addVarToList(setting.moduleLocationsVar, libtools.dictToQuotedString(self.moduleLocationsArray))
        self.addVarToList(setting.moduleConfigsVar, libtools.dictToStringManual(self.moduleConfigsArray))
        self.addVarToList(setting.moduleDatasVar, libtools.dictToStringManual(self.moduleDatasArray))

    def prepareJSfile(self, outputFile):
        log.logDebug('Writing ' + outputFile)
        libfile.writeVarsToFile(outputFile, self.jsVarList)

    def writeOutputFile(self, clientId):
        clientOutputPath = settings.outputPath.format(clientId)
        libfile.createPath(clientOutputPath)
        log.logDebug('Creating output file in ' + clientOutputPath)
        self.prepareJSfile(clientOutputPath + settings.outputJSFilename)

    def processClientConfigFile(self, clientFile):
        log.logDebug('Processing ' + clientFile)
        xmlDom = libfile.readXMLFile(clientFile)
        clientID = self.processClientId(xmlDom)
        footerText = self.processFooterText(xmlDom)
        print(footerText)
        self.addVarToList(setting.footerTextLabel, footerText)
        time = self.processDateTime()
        self.addVarToList(setting.datetimeVar, time)
        self.processClientPages(xmlDom)
        log.logDebug('Found ' + str(len(self.jsVarList)) + ' vars to be dumped to file')
        self.writeOutputFile(clientID)
