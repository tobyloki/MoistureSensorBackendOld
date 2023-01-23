# Moisture Sensor Backend

Deploy cloudformation template to AWS from within root directory.

```cmd
sam deploy --template-file Cloudformation/cloudformation.yaml --capabilities CAPABILITY_NAMED_IAM --stack-name MoistureSensor --s3-bucket moisture-sensor-backend --s3-prefix cloudformation --profile aws-osuapp
```
