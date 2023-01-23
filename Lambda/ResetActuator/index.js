exports.handler = async (event) => {
    const body = {
        message: 'Hello World!',
        input: event
    };

    const ret = {
        statusCode: 200,
        body: JSON.stringify(body)
    };

    return ret;
};
