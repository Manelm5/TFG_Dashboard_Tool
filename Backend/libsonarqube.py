#!/usr/bin/python

###############################################################
# 3D Dashboard backend sonarqube library
###############################################################
# Author: Jesus Alviarez (initial version 24/10/2019)
# Last updated: 15/06/2020 (Manel Muñiz)
###############################################################


import ast
from abc import ABC
from typing import Dict, Tuple
import log
import settingssonarqube as sonarqubeSetting
from getFromAPI import getDataFromAPI
from libabstractapi import apiAbstractLibrary


class Sonarqube(apiAbstractLibrary):

    def __init__(self, paginaId, moduleConfig):
        self.teamId = []
        self.sqStatus = ""
        self.sqKpis = ""
        log.logDebug('Processing Sonarqube module for ' + str(paginaId) + ' con config ' + str(moduleConfig))
        self.doRequest(moduleConfig)

    def doRequest(self, moduleConfig):
        moduleConfigDict = ast.literal_eval(moduleConfig)

        if sonarqubeSetting.teamIdLabel not in moduleConfigDict:
            log.logError('Parameter ' + sonarqubeSetting.teamIdLabel + ' not found')
            return

        teamName = moduleConfigDict[sonarqubeSetting.teamIdLabel]
        for team in teamName:
            log.logDebug('teamName: ' + team)
            if team not in sonarqubeSetting.teamIdList:
                log.logError('Team ' + team + ' not found')
                return
            else:
                self.teamId.append(sonarqubeSetting.teamIdList[team])

    def process(self, paginaId, modulConfig):
        log.logDebug('Processing SonarQube module for ' + str(paginaId) + ' con config ' + str(modulConfig))
        self.doRequest(modulConfig)


class getTeamInfo(Sonarqube, ABC):
    def __init__(self, paginaId, moduleConfig):
        super().__init__(paginaId, moduleConfig)
        log.logDebug('Processing Sonarqube module for ' + str(paginaId) + ' con config ' + str(moduleConfig))
        self.totalsqKpis = {}

    def getTeamInfo(self, team):

        api_url = '{}api/measures/component'.format(sonarqubeSetting.restURL)

        querystring = {
            'component': "",
            'metricKeys': sonarqubeSetting.dataRequested
        }
        sq_project_uri = 'org.sonarqube:{}:lfp:main'.format(team)
        querystring['component'] = sq_project_uri

        payload = ''

        (resultStatus, resultData) = getDataFromAPI(url=api_url, headers=sonarqubeSetting.headers,
                                                    querystring=querystring,
                                                    payload=payload)
        totalmeasures = dict()
        measures = dict()

        log.logDebug("Executing request to url: " + api_url)

        if resultStatus == 200:  # status_code
            if 'component' in resultData and 'key' in resultData['component'] and 'measures' in resultData['component']:
                for item in resultData['component']['measures']:
                    if isinstance(item, dict):
                        measures[item['metric']] = float(item['value']) if '.' in item['value'] else int(item['value'])
        for key, value in sonarqubeSetting.teamIdList.items():
            if value == team:
                totalmeasures[key] = measures

        return resultStatus, totalmeasures

    def processPlugin(self) -> dict:

        for team in self.teamId:
            (sqStatus, sqKpis) = self.getTeamInfo(team)

            log.logDebug("Request executed with code " + str(sqStatus) + " and content: " + str(sqKpis))
            self.totalsqKpis.update(sqKpis)

        return self.totalsqKpis
