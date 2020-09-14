import plotly.graph_objects as go
import log
import os
import settings


###############################################################
# 3D Dashboard Plotly library
###############################################################
# Author: Manel Muñiz (initial version 11/02/2020)
# Last updated: 02/03/2020 (Manel Muñiz)
###############################################################

def makeFileName(chart_Title, project='', component='', fixVersion=''):
    chartName = chart_Title.split(' ')
    title = '_'.join(chartName)

    if project != '' and component != '' and fixVersion != '':
        filename = str(project) + '_' + str(component) + '_' + str(fixVersion) + '_' + str(
            title) + '.png'  # PR + COMP + FIXV

    if project != '' and component != '' and fixVersion == '':
        filename = str(project) + '_' + str(component) + '_' + title + '.png'

    if project != '' and component == '' and fixVersion != '':
        filename = str(project) + '_' + str(fixVersion) + '_' + title + '.png'

    if project != '' and component == '' and fixVersion == '':
        filename = project + '_' + title + '.png'

    return filename


def generatePieChart(chart_Title="", project="", component="", fixVersion="", labels=[], values=[]):
    if fixVersion != '':
        aux = fixVersion.split("=")
        fixVersionName = aux[1].replace(" ", "")
    else:
        fixVersionName = ''

    if component != '':
        componentName = ''
    else:
        componentName = component

    pie_colors = ['gray', 'green', 'red',
                  'rgb(253, 217, 0)', 'blue']

    fig = go.Figure(data=[go.Pie(labels=labels, values=values, hole=.3, marker_colors=pie_colors)])
    # orientation of the labels
    fig.update_layout(
        # legend=dict(x=1, y=1.2),
        # legend_orientation="h",
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)'
    )
    # general configuration of the table
    fig.update_layout(
        width=900,
        height=360,
        title=chart_Title + ":",
        font=dict(
            family="Arial",
            color="white",
            size=18,
        ),
        legend=dict(
            font=dict(
                size=24
            )
        )
    )
    fig.layout.template = 'plotly_dark'
    if not os.path.exists(settings.plotlyPath):
        os.mkdir(settings.plotlyPath)

    fileName = makeFileName(chart_Title, project, str(componentName), fixVersionName)
    fig.write_image(settings.plotlyPath + fileName)

    return fileName


def generateOpenDefectsByTeam(chart_Title="", project="", fixVersion="", teams=[], aboveRC=[],
                              belowRC=[]):  # values arrays of arrays

    array_image = []
    for team in teams:
        array_image.append(team)
    array_image.append("Others")

    # a list to append the totalValue of each stacked bar.
    totalList = []

    # getting length of list
    length = len(aboveRC)

    for i in range(length):
        totalValue = aboveRC[i] + belowRC[i]
        totalList.append(totalValue)

    fig = go.Figure(data=[
        go.Bar(name='Above RC', x=array_image, y=aboveRC, marker_color='red', text=aboveRC, textposition='auto'),
        go.Bar(name='Below RC', x=array_image, y=belowRC, marker_color='blue', text=belowRC, textposition='auto'),
    ])

    # Change the bar mode
    fig.update_layout(
        barmode='stack',
        yaxis=dict(
            dtick=1,  # range of y axes
            rangemode='nonnegative'
        )
    )

    # orientation of the labels
    fig.update_layout(
        width=900,
        height=700,  # 360 px before for four module structure
        legend=dict(x=0.7, y=1.4),
        legend_orientation="h",
        paper_bgcolor='rgba(0,0,0,0)',
        plot_bgcolor='rgba(0,0,0,0)',

    )

    if fixVersion != '':
        aux = fixVersion.split("=")
        fixVersionName = aux[1].replace(" ", "")
    else:
        fixVersionName = ''
    # general configuration of the table
    fig.update_layout(
        title=chart_Title + ":",
        font=dict(
            family="Arial",
            color="white",
            size=18
        ),
        legend=dict(
            font=dict(
                size=24
            )
        )
    )

    fig.layout.template = "plotly_dark"

    if not os.path.exists(settings.plotlyPath):
        os.mkdir(settings.plotlyPath)

    fileName = makeFileName(chart_Title, project, component="", fixVersion=fixVersionName)
    fig.write_image(settings.plotlyPath + fileName)

    return fileName
