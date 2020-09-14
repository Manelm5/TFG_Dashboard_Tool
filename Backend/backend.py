#!/usr/bin/python

###############################################################
# 3D Dashboard backend
###############################################################
# Author: Carmelo Garcia (initial version 16/10/2019)
# Last updated: 18/10/2019 (Carmelo Garcia)
###############################################################

import sys
import os
import string
import glob
import settings
import log
import libconfig
import libclient

#### MAIN ####

print("Starting 3D Dashboard backend...")

if os.path.isfile(settings.configFile):
    print("Loading configuration from file " + settings.configFile)
    libconfig.loadConfig(settings.configFile)

log.start("backend")

log.logInfo('Settings log path in ' + settings.logPath)
log.logInfo('Settings clients path in ' + settings.clientsPath)
log.logInfo('Settings output path in ' + settings.outputPath)
log.logInfo('Settings output filename is ' + settings.outputJSFilename)
log.logInfo('Settings output plotly image path is ' + settings.plotlyPath)


clientList = glob.glob(settings.clientsPath + "/*.cfg")

for c in clientList:
    client_process = libclient.Client()
    result = client_process.processClientConfigFile(clientFile=c)
    # log.logDebug(list(result))
