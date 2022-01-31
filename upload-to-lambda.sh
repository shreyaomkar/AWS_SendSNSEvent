#!/bin/sh

FUNCTION_JS=sendSNSEventToFifoQueueLambda.js
FUNCTION_FILE=sendSNSEventToFifoQueueLambda.zip
FUNCTION_NAME=sendSNSEventToFifoQueueLambda
S3_BUCKET=miag-dev-lambdas

REGION=us-east-1
EXEC_ROLE='arn:aws:iam::118198795607:role/MIAG-LOCAL-QA-ENV-s3tosftpfiletransferlambdadevRol-XSAOXG0CA6RG'

7z $FUNCTION_FILE $FUNCTION_JS

  
aws s3api put-object --bucket $S3_BUCKET --key "./$FUNCTION_FILE" --body "./$FUNCTION_FILE"

aws lambda update-function-code --function-name $FUNCTION_NAME \
--role $EXEC_ROLE --handler "$ZipFileName.handler" \
--zip-file "fileb://./$FUNCTION_FILE" \
--runtime provided \
--description "test" \
