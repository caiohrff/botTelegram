const dialogFlow = require('dialogflow')
const { config } = require('process')
const configs = require('./AstoufoUlissesBot')

const sessionClient = new dialogFlow.SessionsClient({
    projectId: configs.project_id,
    credentials: { 
    private_key: configs.private_key,
    client_email: configs.client_email 
}
});

async function sendMessage(chatId, message) {
    const sessionPath = sessionClient.sessionPath(configs.project_id, chatId);

    const request = {
        session: sessionPath,
        queryInput: {}
    };
    const textQueryInput = { text: { text: message, languageCode: 'pt-BR' } };
    const eventQueryInput = { event: { name: 'start', languageCode: 'pt-BR' } }

    request.queryInput = message === '/start' ?  eventQueryInput : textQueryInput;
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    return { text: result.fulfillmentText,
             intent: result.intent.displayName,
             fields: result.parameters.fields 
            };
}

module.exports.sendMessage = sendMessage