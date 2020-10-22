const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');
const token = 'seu token';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {

    const chatId = msg.chat.id;

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let textResponse = dfResponse.text;

    if (dfResponse.intent === 'Programação') {
        textResponse = await youtube.searchVideoURL(textResponse, dfResponse.fields.programming.stringValue);
    }

    bot.sendMessage(chatId, textResponse);
});