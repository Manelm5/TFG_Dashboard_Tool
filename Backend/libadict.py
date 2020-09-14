#!/usr/bin/python

###############################################################
# 3D Dashboard backend adict library
###############################################################
# Author: Manel Muñiz (initial version 17/04/2020)
# Last updated: 15/06/2020 (Manel Muñiz)
###############################################################
from abc import ABC

import settingsadict as adictSetting
import ast
import log
import requests
from libabstractapi import apiAbstractLibrary
import toolsadict as tools


class Adict(apiAbstractLibrary, ABC):

    def __init__(self, paginaId, moduleConfig):
        self.product = ""
        self.name = ""
        self.project = ""
        self.branch = ""
        log.logDebug('Processing Adict module for ' + str(paginaId) + ' con config ' + str(moduleConfig))
        self.doRequest(moduleConfig)

    def doRequest(self, moduleConfig):
        global response
        moduleConfigDict = ast.literal_eval(moduleConfig)

        if adictSetting.productIdLabel not in moduleConfigDict:
            log.logError('Parameter ' + str(adictSetting.productIdLabel) + ' not found')
        else:
            self.product = moduleConfigDict[adictSetting.productIdLabel]

        if adictSetting.nameIdLabel not in moduleConfigDict:
            log.logError('Parameter ' + str(adictSetting.nameIdLabel) + ' not found')
        else:
            self.name = moduleConfigDict[adictSetting.nameIdLabel]

        if adictSetting.projectIdLabel not in moduleConfigDict:
            log.logError('Parameter ' + str(adictSetting.projectIdLabel) + ' not found')
        else:
            self.project = moduleConfigDict[adictSetting.projectIdLabel]

        if adictSetting.branchIdLabel not in moduleConfigDict:
            log.logError('Parameter ' + str(adictSetting.branchIdLabel) + ' not found')
        else:
            self.branch = moduleConfigDict[adictSetting.branchIdLabel]


class getlastGoodBuild(Adict, ABC):

    def __init__(self, paginaId, moduleConfig):
        super().__init__(paginaId, moduleConfig)
        self.globalResult = {}

    def processPlugin(self):
        # noinspection PyBroadException
        try:
            productId = tools.getIdByProduct(self.product)
        except:
            log.logError("Error getting the Id of the product specified:" + self.product)
            return False
        # noinspection PyBroadException
        try:
            results = tools.getTestSuites(self.name, self.branch)
        except:
            log.logError(
                "Error getting last TestSuites for the specified name + branch:" + self.name + " " + self.branch)
            return False

        productResults = []  # Results with the id we want.
        revisions = []  # A list with all the revisions numbers

        # We iterate through the response to get all the test-suites for our product
        for result in results:
            if str(result["product"]) == str(productId):
                productResults.append(result)
                if result['revision'] not in revisions:
                    revisions.append(result['revision'])

        numTestSuitesByRevision = {}  # Number of tests suites for a product
        testSuitesByRevision = {}
        n_tests = 0  # value to put on dict numTestSuitesByRevision
        testSuites_values = []  # value to put on dict IdListsClean

        for re in revisions:
            for Id in productResults:
                if Id['revision'] == re:
                    n_tests = n_tests + 1
                    testSuites_values.append(Id)
            numTestSuitesByRevision[re] = n_tests
            testSuitesByRevision[re] = testSuites_values
            n_tests = 0
            testSuites_values = []

        countTests = 0  # Iterator to count number of tests finished inside a revision
        completedRevision = 0

        for r, testSuites in testSuitesByRevision.items():
            for testSuite in testSuites:
                if testSuite["revision"] == r and testSuite["status"] != "working":
                    countTests += 1
                else:
                    break  # If we found one testSuite working, we go for the next revision

            if countTests == numTestSuitesByRevision[r]:
                log.logDebug("The product has " + str(numTestSuitesByRevision[r]) + " for this revision.")
                completedRevision = r
                break  # If we just found the completedRevision we go out of the loop
            else:
                countTests = 0

        log.logDebug('The last completed revision for this Adict Product is ' + str(completedRevision))

        allTestSuitesData = {}
        TestSuiteData = {}  # refactor
        for result in productResults:
            if result['revision'] == completedRevision:
                TestSuiteData["percentage_test"] = result['success_tests_percentage']
                TestSuiteData["status"] = result['status']
                TestSuiteData["kind_type"] = str(result['kind']) + str(result['kind_level'])
                allTestSuitesData[result["name"]] = TestSuiteData
                TestSuiteData = {}

        # noinspection PyBroadException
        try:
            # Now that we have the completed revision, we get the last good build of a product
            productLastBuild = tools.getBuild(self.product, self.name, self.project, self.branch, completedRevision)
        except:
            log.logError(
                "Error getting the product (" + self.product + ") last build for the revision obtained as the last" + completedRevision)
            return False

        allProductBuildsData = {}
        for build in productLastBuild:
            allProductBuildsData[build['target']] = build['status']

        self.globalResult = {"Revision": str(completedRevision), "TestSuites": allTestSuitesData,
                             "ProductBuilds": allProductBuildsData}

        return self.globalResult


class isLocked(Adict, ABC):
    def __init__(self, paginaId, moduleConfig):
        super().__init__(paginaId, moduleConfig)
        self.result = {}

    def processPlugin(self):
        # example: https://api-adict.bcn.rd.hpicorp.net/branches/?name=trunk&project=ipg-atlas&kinds=branch,task
        url = adictSetting.restURL + adictSetting.branches + "?name=" + self.branch + '&' + 'project=' + self.project + '&kinds=branch,task'  # tag

        # noinspection PyBroadException
        try:
            response = requests.request("GET", url, headers=adictSetting.headers, data=adictSetting.payload)
        except:
            log.logError("Error executing the following request: " + url)
            return False

        jsonResult = response.json()
        results = jsonResult["results"]

        if len(results) > 1:
            log.logError('Found more than one item with this specification.')
        else:
            branchId = results[0]["id"]

            # http://api-adict.bcn.rd.hpicorp.net/branches/1/is-locked/

            idURL = '/' + str(branchId) + "/"
            isLockedURL = adictSetting.restURL + adictSetting.branches + idURL + 'is-locked/'
            response = requests.request("GET", isLockedURL, headers=adictSetting.headers, data=adictSetting.payload)

            r = response.json()
            self.result = {}
            if r["is_locked"] == 'yes':
                self.result["is_locked"] = "locked"
            else:
                self.result["is_locked"] = "no-locked"

        return self.result
