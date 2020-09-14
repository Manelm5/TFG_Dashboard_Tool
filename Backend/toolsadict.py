import settingsadict as adictSetting
import requests
import log


def getBuild(product, name, project, branch, revision):
    url = 'http://api-adict.bcn.rd.hpicorp.net/builds/?revision=' + str(
        revision) + '&project=' + project + '&branch=' + branch + '&product=' + product + '&round_name=' + name + '&branch=' + branch
    response = requests.request("GET", url, headers=adictSetting.headers, data=adictSetting.payload)
    jsonResult = response.json()
    results = jsonResult["results"]
    return results


def getIdByProduct(product):
    global productId
    url = adictSetting.restURL + '/products/?name=' + product
    response = requests.request("GET", url, headers=adictSetting.headers, data=adictSetting.payload)

    jsonResult = response.json()
    results = jsonResult["results"]

    if len(results) > 1:
        log.logError('Found more than one item with this specification.')
    else:
        productId = results[0]["id"]
    return productId


def getTestSuites(name, branch):
    url = 'http://api-adict.bcn.rd.hpicorp.net/test-suites/?page_size=' + str(
        adictSetting.pageSizeSetting) + '&round_name=' + name + '&branch=' + branch
    response = requests.request("GET", url, headers=adictSetting.headers, data=adictSetting.payload)
    jsonResult = response.json()
    result = jsonResult["results"]
    return result
