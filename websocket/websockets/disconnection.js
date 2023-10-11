const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.lambdaHandler = async (event) => {
    const connectionId = event.requestContext.connectionId;

    try {
        // Delete the connection ID record from DynamoDB
        const params = {
            TableName: 'WebSocketConnections', // Replace with your DynamoDB table name
            Key: {
                connectionId: connectionId
            }
        };

        await dynamodb.delete(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify('Disconnected.'),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Internal Server Error'),
        };
    }
};
