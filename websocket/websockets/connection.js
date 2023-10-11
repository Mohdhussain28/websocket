const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event) => {
    const connectionId = event.requestContext.connectionId;

    try {
        // Store the connection ID in DynamoDB
        const params = {
            TableName: 'WebSocketConnections', // Replace with your DynamoDB table name
            Item: {
                connectionId: connectionId,
                timestamp: Date.now()
            }
        };

        await dynamodb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify('Connected.'),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Internal Server Error'),
        };
    }
};
