#!/usr/bin/python

###############################################################
# 3D Dashboard backend Jira library
###############################################################
# Author: Manel Muñiz (initial version 30/01/2020)
# Last updated: 15/06/2020 (Manel Muñiz)
###############################################################
import ast
from abc import ABC

from jiraClient import JIRA
import log
import libplotly as pl
import settingsjira as jiraSetting
import toolsjira as tools

from libabstractapi import apiAbstractLibrary

jira_connection = JIRA(options={'server': jiraSetting.JIRA_SERVER},
                       basic_auth=(jiraSetting.JIRA_SERVICE_ACCOUNT_USER, jiraSetting.JIRA_SERVICE_ACCOUNT_PASS))


class Jira(apiAbstractLibrary):

    def __init__(self, paginaId, moduleConfig):
        self.project = ""
        self.component = ""
        self.fixVersion = ""
        self.actualSprint = ""
        log.logDebug('Processing Jira module for ' + str(paginaId) + ' con config ' + str(moduleConfig))
        self.doRequest(moduleConfig)

    def doRequest(self, moduleConfig):
        global response
        moduleConfigDict = ast.literal_eval(moduleConfig)

        if jiraSetting.projectIdLabel not in moduleConfigDict:
            log.logError('Parameter ' + str(jiraSetting.projectIdLabel) + ' not found')
            self.project = ''
        else:
            projectId = moduleConfigDict[jiraSetting.projectIdLabel]
            self.project = jiraSetting.projectList[projectId]

        if jiraSetting.componentIdLabel not in moduleConfigDict:
            log.logError('Parameter ' + str(jiraSetting.componentIdLabel) + ' not found')
            self.component = ''
        else:
            self.component = moduleConfigDict[jiraSetting.componentIdLabel]

        if jiraSetting.fixVersionIdLabel not in moduleConfigDict:
            self.fixVersion = ''
        else:
            self.fixVersion = jiraSetting.fixVersion_filter + str(
                moduleConfigDict[jiraSetting.fixVersionIdLabel])

        if jiraSetting.actualSprintIdLabel not in moduleConfigDict:
            self.actualSprint = ''
        else:
            self.actualSprint = jiraSetting.actualSprint_filter

    def process(self, paginaId, modulConfig):
        log.logDebug('Processing Jira module for ' + str(paginaId) + ' con config ' + str(modulConfig))
        self.doRequest(modulConfig)


class getOpenDefectsByTeam(Jira, ABC):
    def __init__(self, paginaId, moduleConfig):
        super().__init__(paginaId, moduleConfig)
        self.fileName = ""

    def processPlugin(self):
        """
            Creates a grouped bar chart of issues for all fixVersions separated with their associated RC (Risk Criteria)

            :param project: Jira project
            :param componentId: Team to be analyzed. If empty, all project is counted
            :param fixVersion: If empty, all team issues are counted.
            :param actualSprint: If empty, all issues are counted. (Be careful, if all issues are counted it may a long time to run)
            :return: (str) Returns the filename of the generated image.
        """

        aboveRC_filter = jira_connection.filter(jiraSetting.aboveRCId)  # AboveRC Jira ID
        belowRC_filter = jira_connection.filter(jiraSetting.belowRCId)  # BelowRC Jira ID

        aboveRC = []
        belowRC = []

        for team in jiraSetting.firmwareTeams:
            component = jiraSetting.component_filters[team]
            above_JQL = str(aboveRC_filter.jql) + str(component) + self.fixVersion + self.actualSprint
            below_JQL = str(belowRC_filter.jql) + str(component) + self.fixVersion + self.actualSprint
            aboveRC.append(tools.countIssue(above_JQL, jira_connection))
            belowRC.append(tools.countIssue(below_JQL, jira_connection))

        otherAboveRCValue = 0
        otherBelowRCValue = 0

        for team in jiraSetting.otherTeams:
            component = jiraSetting.component_filters[team]
            above_JQL = str(aboveRC_filter.jql) + str(component) + self.fixVersion + self.actualSprint
            below_JQL = str(belowRC_filter.jql) + str(component) + self.fixVersion + self.actualSprint
            otherAboveRCValue += tools.countIssue(above_JQL, jira_connection)
            otherBelowRCValue += tools.countIssue(below_JQL, jira_connection)

        aboveRC.append(otherAboveRCValue)
        belowRC.append(otherBelowRCValue)

        self.fileName = pl.generateOpenDefectsByTeam("Open Defects by Team", self.project, self.fixVersion,
                                                     jiraSetting.firmwareTeams,
                                                     aboveRC,
                                                     belowRC)
        return self.fileName


class getSprintHealthBoard(Jira, ABC):
    def __init__(self, paginaId, moduleConfig):
        super().__init__(paginaId, moduleConfig)
        self.fileName = ""

    def processPlugin(self):
        """
            Create a graph for the specified component (or for all the project if is not defined)
            in which it shows the issues status (icebox, development, blocked and closed) in proportion

            :param project: Jira project
            :param componentId: Team to be analyzed. If empty, all project is counted
            :param fixVersion: If empty, all team issues are counted.
            :param actualSprint: If empty, all issues are counted. (Be careful, if all issues are counted it may a long time to run)
            :return: (str) Returns the filename of the generated image.
        """

        health_values = {}
        if self.component.__len__() == 0:
            component_jql = ''
        else:
            component_jql = jiraSetting.component_filters[str(self.component)]

        issue_type = jiraSetting.type_filters["Story_Spike"]

        for status, value in jiraSetting.status_filters.items():
            log.logDebug(
                "Executing request to get " + status + " issues for the team: " + component_jql + self.actualSprint)
            jql = 'project=' + str(self.project) + value + str(component_jql) + str(self.fixVersion) + str(
                self.actualSprint) + str(
                issue_type)
            res = tools.countIssue(jql, jira_connection)
            health_values[status] = res

        keys = list(health_values.keys())
        values = list(health_values.values())

        self.fileName = pl.generatePieChart("Sprint Health Board", self.project, self.component, self.fixVersion, keys,
                                            values)  # query ALL the project
        return self.fileName
