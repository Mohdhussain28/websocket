const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event) => {
    const connectionId = event.requestContext.connectionId;
    const body = JSON.parse(event.body);

    try {
        // Store the WebSocket message in DynamoDB
        const message = body.message;

        const params = {
            TableName: 'WebSocketMessages', // Replace with your DynamoDB table name
            Item: {
                connectionId: connectionId,
                message: message,
                timestamp: Date.now()
            }
        };

        await dynamodb.put(params).promise();

        // Respond to the client if needed

        return {
            statusCode: 200,
            body: JSON.stringify('Message processed and sent.'),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Internal Server Error'),
        };
    }
};
