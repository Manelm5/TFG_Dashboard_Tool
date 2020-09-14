#!/usr/bin/python

###############################################################
# 3D Dashboard backend sonarqube library
###############################################################
# Author: Jesus Alviarez (initial version 24/10/2019)
# Last updated: 24/10/2019 (Jesus Alviarez)
###############################################################

from typing import List, Dict, Tuple

import json
import requests
import warnings
import log


def getDataFromAPI(url: str, headers: Dict[str, str], querystring: Dict[str, str], payload: str) -> Tuple[int, Dict]:
    response = requests.get(url, headers=headers, params=querystring, data=payload, verify=False)
    log.logDebug('Request response ' + str(response.status_code) + ' with data ' + str(response.text))
    return (response.status_code, json.loads(response.text))


if __name__ == "__main__":
    from pprint import pprint

    sq_api_url_base = 'https://sonarqube.bcn.rd.hpicorp.net/api/'
    api_url = '{}measures/component'.format(sq_api_url_base)

    sq_project_uri = 'org.sonarqube:atlas_group_3dp_sw_data:lfp:main'  # 3D Common Firmware

    headers = {
        'Authorization': "Basic amVzdXMuYWx2aWFyZXpAaHAuY29tOkhQUkRDRlcyMDE5YSY=",
        'cache-control': "no-cache",
        'Postman-Token': "3cc38988-1c65-47b1-a05b-781f6333776e,a1ae1d3c-3834-4024-bb24-54094c98c709"
    }

    querystring = {'component': sq_project_uri, 'metricKeys': "bugs,vulnerabilities,code_smells,coverage"}

    payload = ''

    print(querystring)

    (result_status, result_data) = getDataFromAPI(url=api_url, headers=headers, querystring=querystring,
                                                  payload=payload)

    measures = dict()

    if result_status == 200:  # status_code
        if 'component' in result_data and 'key' in result_data['component'] and 'measures' in result_data['component']:
            for item in result_data['component']['measures']:
                if isinstance(item, dict):
                    measures[item['metric']] = float(item['value']) if '.' in item['value'] else int(item['value'])

    pprint(measures)

    print('END.')
