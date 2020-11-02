const Discord = require ("discord.js");
const { version, runnerPicture } = require('../config.json');

//exports whatever is below to the index.js file
module.exports = {
    //name of command
    name: 'ping',
    //other names that can call the ping command
    aliases: ['latency', 'ms'],
    //description of command
    description: 'Displays your ping.',
    //when called execute this message
	execute(message) {
        //what the message does
        const timeTaken = Date.now() - message.createdTimestamp;
        const pingEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Ping')
                .setAuthor( 'Runner', runnerPicture )
                .setDescription(`${timeTaken}ms`)
                .setTimestamp()
                .setFooter(version)
        message.channel.send(pingEmbed);

        //console letting me know the command is working
        console.log('Pong!');
    }
};
