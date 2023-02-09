const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
    console.log('Hey there!');
    console.log(JSON.stringify(event, null, 2));
    const deviceId = event.payload.detector.keyValue;
    const { state } = event.payload;
    const { stateName } = state;

    console.log('deviceId:', deviceId);
    console.log('state:', JSON.stringify(state, null, 2));

    const body = {
        message: 'Hello World!',
        input: event
    };

    const ret = {
        statusCode: 200,
        body: JSON.stringify(body)
    };

    const arn =
        'arn:aws:sns:us-west-2:978103014270:MoistureSensorPushNotificationTopic';
    const message = `${deviceId} is now in ${stateName} state`;
    const data = await sendSNS(arn, message);
    console.log('response:', data);

    return ret;
};

function sendSNS(arn, message) {
    const params = {
        TargetArn: arn,
        Message: message
    };

    return new Promise((resolve, reject) => {
        sns.publish(params, (err, data) => {
            if (err) {
                console.log(err);
                console.log(`[${arn}] - FAIL sendSNS`);
                reject(err);
            } else {
                console.log(`[${arn}] - SUCCESS sendSNS`);
                resolve(data);
            }
        });
    });
}
