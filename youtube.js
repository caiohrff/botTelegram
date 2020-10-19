const { rejects } = require('assert');
const YouTube = require('youtube-node');
const config = require('./yt-config.json');
const youtube = new YouTube();
youtube.setKey(config.key);

function searchVideoURL(message, queryText) {
    return new Promise((resolve, rejects) => {
        youtube.search(`Programando em ${queryText}`, 2, function(error, result) {
            if (!error) {
                const videoIds = result.items.map((item) => item.id.videoId).filter(item => item);
                const youtubeLinks = videoIds.map(videoId => `https://www.youtube.com/watch?v=${videoId}`).join(', ');
                resolve(`${message} ${youtubeLinks}`);
            } else { 
                rejects('Deu erro')
            }
          });
    });
}

module.exports.searchVideoURL = searchVideoURL;
