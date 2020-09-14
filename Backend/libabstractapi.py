from abc import ABC, abstractmethod


class apiAbstractLibrary:

    @abstractmethod
    def doRequest(self, moduleConfig):
        pass

    @abstractmethod
    def process(self, paginaId, modulConfig):
        pass

    @abstractmethod
    def processPlugin(self):
        pass
