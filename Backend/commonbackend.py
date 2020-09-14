#!/usr/bin/python

###############################################################
# Common 3D Dashboard processes
###############################################################
# Author: Manel Muñiz (initial version 30/01/2020)
# Last updated: 05/02/2020 (Manel Muñiz)
###############################################################


import commonlibClient as commonLib
import settings
import log
import os
import libconfig

#### MAIN ####

print("Starting common 3D Dashboard backend...")

if os.path.isfile(settings.configCommonFile):
    print("Loading configuration from file " + settings.configCommonFile)
    libconfig.loadConfig(settings.configCommonFile)

log.start("common")

log.logInfo('Settings log path in ' + settings.logPath)
log.logInfo('Settings clients path in ' + settings.clientsPath)
log.logInfo('Settings output path in ' + settings.configFile)
log.logInfo('Settings output filename is ' + settings.outputJSFilename)

configFile = str(settings.clientsPath + "common.cfg")

commonLib.processCommonFile(configFile)
