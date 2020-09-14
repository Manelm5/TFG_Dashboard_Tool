from jiraClient import JIRA
import log
import libtools
import libfile
import settings
import glob

###############################################################
# Common 3D Dashboard funciton library
###############################################################
# Author: Manel Muñiz (initial version 30/01/2020)
# Last updated: 05/02/2020 (Manel Muñiz)
###############################################################

# Client Config definitions
fixVersionsIDLabel = 'fixVersions'


def doConnection():
    JIRA_SERVER = 'https://jira.cso-hp.com'
    JIRA_SERVICE_ACCOUNT_USER = 'BCN_RD_3D_API'
    JIRA_SERVICE_ACCOUNT_PASS = 'WFS&*AfeH6e8%U'
    jira_connection = JIRA(options={'server': JIRA_SERVER},
                           basic_auth=(JIRA_SERVICE_ACCOUNT_USER, JIRA_SERVICE_ACCOUNT_PASS))
    return jira_connection


def prepareJSFile(outputFile):
    log.logDebug('Writing ' + outputFile)
    libfile.writeVarsToFile(outputFile, jsVarList)


def addVarToList(nom, valor):
    singleElement = [nom, valor]
    jsVarList.append(singleElement)
    log.logDebug('Adding to list ' + nom + ' = ' + valor)


def writeOutputFile():
    libfile.createPath(settings.outputPath)
    log.logDebug('Creating output file in ' + settings.outputPath)
    prepareJSFile(settings.outputPath + settings.outputJSFilename)


def processRelease(release, frameArray):
    aux = str(release.description)
    if "CS:" not in aux:
        frameArray.append("CS:N/A")
    description = aux.split("|")
    for param in description:
        frameArray.append(param)


MonthDict = {'01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
             '09': 'Sept', '10': 'Oct', '11': 'Nov', '12': 'Dec'}


def processIdArray(arrayDate):
    if arrayDate[1] in MonthDict.keys():
        Month = MonthDict[arrayDate[1]]

    year = str(arrayDate[0])
    idResult = arrayDate[2] + "/" + str(Month) + "/" + year[2:]
    return idResult


def processFixVersions(connection, arrayVersions):
    allFixVersions = connection.project_versions("MJF3DP")  # Jira request to get all allFixVersions for this project
    resultReleases = []
    auxDict = dict()
    resultDict = dict()

    listArrayVersions = arrayVersions.split(",")
    for version in allFixVersions:
        for item in listArrayVersions:
            if str(version) == str(item):
                resultReleases.append(version)
    for release in resultReleases:
        frameFixVersionArray = []
        try:
            arrayDate = release.releaseDate.split("-")
            frameFixVersionArray.append(str("ID: " + processIdArray(arrayDate)))
            log.logDebug('Transforming date: ' + str(arrayDate) + ' to ' + processIdArray(arrayDate))

        except:
            frameFixVersionArray.append("ID: N/A")
            log.logDebug('Transforming date: [Null] to ID:N/A')
        processRelease(release, frameFixVersionArray)
        auxDict[str(release.name)] = frameFixVersionArray
        resultDict.update(auxDict)

    return resultDict


def processIncomingReleases(connection, fileContent):
    resultFixVersions = libtools.extractValue(fileContent, fixVersionsIDLabel)
    fixVersionsDict = processFixVersions(connection, resultFixVersions)
    addVarToList(str(fixVersionsIDLabel), libtools.dictToString(fixVersionsDict))


def processClientCommonPage(connection, fileContent):
    processIncomingReleases(connection, fileContent)


def processCommonFile(configurationFile):
    global jsVarList
    jsVarList = []
    log.logDebug('Processing ' + configurationFile)
    xmlDom = libfile.readXMLFile(configurationFile)
    connection = doConnection()
    processClientCommonPage(connection, xmlDom)
    log.logDebug('Found ' + str(len(jsVarList)) + ' vars to be dumped to file')
    writeOutputFile()
