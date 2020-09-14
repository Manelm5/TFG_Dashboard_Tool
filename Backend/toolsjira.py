import log


def countIssue(jql='', jira_connection=''):
    """
            Count the number issues with the jql passed by arg

            :param jira_connection: object Jira with the server connection
            :param jql: jql to be counted.
            :return: (int) number_of_issues
    """

    log.logDebug("Executing request with the following jql: " + jql)
    issues = jira_connection.search_issues(jql, maxResults=0)
    log.logDebug(("The number of issues matching this jql is: " + str(issues.total)))
    return issues.total
