const AWS = require('aws-sdk');
const iotdata = new AWS.IotData({
    endpoint: 'a3qga117xn0bd5-ats.iot.us-west-2.amazonaws.com'
});

exports.handler = async (event) => {
    console.log(JSON.stringify(event, null, 2));

    const request = {
        path: event.requestContext.http.path,
        method: event.requestContext.http.method,
        headers: event.headers,
        query: event.queryStringParameters,
        body: event.body
    };
    console.log(JSON.stringify(request, null, 2));

    const { deviceId, temperature } = request.query;

    if (deviceId === undefined || temperature === undefined) {
        return {
            statusCode: 400,
            body: 'Missing deviceId or temperature'
        };
    }

    const data = await updateShadow(deviceId, {
        reported: {
            temperature: Number(temperature)
        }
    });

    const ret = {
        statusCode: 200,
        body: JSON.stringify(data)
    };

    return ret;
};

function updateShadow(deviceId, shadow) {
    const params = {
        thingName: deviceId,
        payload: JSON.stringify({
            // payload is in string form according to docs
            state: shadow
        })
    };

    return new Promise((resolve, reject) => {
        iotdata.updateThingShadow(params, (err, data) => {
            if (err) {
                console.log(data);
                console.log(`[${deviceId}] - FAIL updateShadow`);
                reject(err);
            } else {
                console.log(`[${deviceId}] - SUCCESS updateShadow`);
                resolve(data);
            }
        });
    });
}
