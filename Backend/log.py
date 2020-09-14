#!/usr/bin/python

###############################################################
# 3D Dashboard backend log library
###############################################################
# Author: Carmelo Garcia (initial version 16/10/2019)
# Last updated: 10/02/2020 (Manel Muñiz)
###############################################################

import sys
import os
import string
import logging
from datetime import datetime
import settings
import libfile

# Log levels
logLevel = logging.DEBUG
logFormat = '%(asctime)s - %(levelname)s - %(message)s'


def logInfo(cadena):
    logging.getLogger().info(str(cadena))


def logDebug(cadena):
    logging.getLogger().debug(str(cadena))


def logError(cadena):
    logging.getLogger().error(str(cadena))


def start(proceso):
    print('Start Logging')
    logOutput = "{0}/{1}.log".format(settings.logPath, str(proceso))
    libfile.createPath(settings.logPath)
    logging.basicConfig(level=logging.DEBUG,
                        format=logFormat,
                        handlers=[logging.FileHandler(logOutput),
                                  logging.StreamHandler()])
