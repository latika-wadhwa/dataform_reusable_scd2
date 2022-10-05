#!/bin/bash

dataform install

echo "{\"projectId\": \"${PROJECT_ID}\", \"location\": \"${BQ_LOCATION}\"}" > .df-credentials.json

printf """
Executing the following dataform command:
************************************************************
dataform run  --tags=${TAG} --vars=subjectArea=${SA}
************************************************************
"""

dataform run --tags=${TAG} --vars=subjectArea=${SA}