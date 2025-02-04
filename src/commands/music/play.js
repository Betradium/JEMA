const search = require("yt-search");
const queue = require("./queue/queue.js");

module.exports = {
    run: 
        async (client, message, args) => {

            const channel = message.member.voice.channel;
            var server_id = message.guild.id;

            if(!channel) {
                return message.channel.send(":woman_facepalming: You need to be in voice channel first");
            }

            const videoSearch = async (q) => {
                const result = await search(q);
                return result.videos.length > 1 ? result.videos[0] : null;
            }

            const video = await videoSearch(args.join("").toString());
           
            if(video != null) {
                await message.channel.send(`:musical_note:  \`${video.title}\` was added to queue`);
                await queue.playSong(message, channel.id, server_id,message.guild.voiceAdapterCreator, video);
            }
            else {
                message.channel.send(`:woman_facepalming: Nothing found`);
            }

        },
    help:
    {
        name:"play",
        description:":microphone2: Plays music from youtube"
    }
}