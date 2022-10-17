#!/bin/bash

dataform install

echo "{\"projectId\": \"${PROJECT_ID}\", \"location\": \"${BQ_LOCATION}\"}" > .df-credentials.json

printf """
Executing the following dataform command:
************************************************************
dataform run  --tags=${TAG} --vars=subjectArea=${SA}
************************************************************
"""
DATE1=201712
DATE2=201801

function dateDiffMonth() {
    local y1=$(date -d "$1""01" '+%Y') # extract the year from your date1
    local y2=$(date -d "$2""01" '+%Y') # extract the year from your date2
    local m1=$(date -d "$1""01" '+%m') # extract the month from your date1
    local m2=$(date -d "$2""01" '+%m') # extract the month from your date2
    echo $(( ($y2 - $y1) * 12 + (10#$m2 - 10#$m1) )) #compute the months difference 12*year diff+ months diff -> 10# force the shell to interpret the following number in base-10
}

RESULT=`dateDiffMonth $DATE1 $DATE2`
echo "there is a gap of $RESULT months betwen $DATE2 and $DATE1"

# dataform run --tags=${TAG} --vars=subjectArea=${SA}