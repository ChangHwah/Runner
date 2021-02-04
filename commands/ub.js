const Discord = require ("discord.js");
const { version, runnerPicture } = require('../config.json');
const querystring = require('querystring');
const fetch = require("node-fetch");

//exports whatever is below to the index.js file
module.exports = {
    //name of command
    name: 'ub',
    //other names that can call the ping command
    aliases: [ 'urban' ],
    //description of command
    description: 'Searches for what you inputed in Urban Dictionary',
    //when called execute this message
	execute(message, args) {

        console.log("hello1")
        if (!args.length) {
            return message.channel.send('You need to give me something to search for. Example \`!ub Urban Dictionary\`.')
        }
        console.log("hello2")
        const query = querystring.stringify({ term: args.join(' ') });
        console.log("hello3")
        const { list } = fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        console.log(list)
        if (!list.length) {
            return message.channel.send(`No results found for **${args.join(' ')}**.`);
        }
        console.log("hello5")
        //what the message does
        const pingEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Urban')
                .setAuthor( 'Runner', runnerPicture )
                .setDescription(

                    list[0].definition

                )
                .setTimestamp()
                .setFooter(version)
        message.channel.send(pingEmbed);

        //console letting me know the command is working
        console.log('Pong!');
    }
};
