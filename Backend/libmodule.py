#!/usr/bin/python

###############################################################
# 3D Dashboard backend module processing library
###############################################################
# Author: Carmelo Garcia (initial version 21/10/2019)
# Last updated: 15/06/2020 (Manel Muñiz)
###############################################################
import ast

import log
import libsonarqube
import libjira
import libadict


pluginIdLabel = "plugin"

sonarqubeCache = {}
jiraCache = {}
adictCache = {}
moduleCache = {'SonarQube': sonarqubeCache, 'Jira': jiraCache, 'Adict': adictCache}


jiraPluginDict = {'HealthStatus': libjira.getSprintHealthBoard, 'OpenDefectsByTeam': libjira.getOpenDefectsByTeam}
adictPluginDict = {'isLocked': libadict.isLocked, 'getlastGoodBuild': libadict.getlastGoodBuild}
sonarqubePluginDict = {'getTeamInfo': libsonarqube.getTeamInfo}

apiClassInstance = {'SonarQube': sonarqubePluginDict, 'Jira': jiraPluginDict, 'Adict': adictPluginDict}


def processModuleRequest(moduleConfig, moduleType, paginaId):
    log.logDebug(
        'Checking processing for module ' + str(moduleType) + ' from ' + str(paginaId) + ': ' + str(moduleConfig))

    if moduleType not in apiClassInstance:
        log.logDebug('Module ' + str(moduleType) + ' not to be postprocessed')
        return

    if moduleType not in moduleCache:
        log.logError('Cache undefined for module type ' + str(moduleType))
        return

    log.logDebug('Checking cache for module ' + str(moduleType) + ' from ' + str(paginaId) + ': ' + str(moduleConfig))

    for key in moduleCache[moduleType].keys():
        if moduleConfig == key:
            log.logInfo('Request already stored in cache:  ' + str(moduleCache[moduleType][moduleConfig]))
            return moduleCache[moduleType].get(key)

    log.logDebug('Processing request not found in cache for ' + str(moduleType))

    moduleConfigDict = ast.literal_eval(moduleConfig)
    if pluginIdLabel not in moduleConfigDict:
        log.logError('Parameter ' + str(pluginIdLabel) + ' not found')
        return
    else:
        pluginType = moduleConfigDict[pluginIdLabel]
        # noinspection PyBroadException
        try:
            response = apiClassInstance[moduleType][pluginType](paginaId, moduleConfig)
            requestResponse = response.processPlugin()
            log.logDebug('Storing request in cache for ' + str(moduleType) + ': ' + str(requestResponse))
            moduleCache[moduleType][moduleConfig] = requestResponse
            return requestResponse
        except:
            log.logError('Error trying to make this plugin: ' + pluginType + ' from: ' + moduleType)
            return
