//using my prefix variable a few times in this command
//so need to make sure to include this in the file
const { prefix, version, runnerPicture} = require('../config.json');
//this is required to create an embedded message in discord
const Discord = require ("discord.js");

//exports whatever is below to the index.js file
module.exports = {
    //name of command
    name: 'help',
    //explains what command does
    description: 'Lists all usable commands and info about a specific command',
    //alternative names the command can be called by
    aliases: ['commands'],
    //function that we are executing
    execute( message, args ){
        const { commands } = message.client;
        //if there are no arguments display this message
        if (!args.length) {
        const helpEmbed = new Discord.MessageEmbed()
                .setColor( '#0099ff' )
                .setTitle( 'Commands' )
                .setAuthor( 'Runner', runnerPicture )
                //creates an array with the names of each command and displays them in alphabetical order
                .setDescription( commands.map(command => `\`${prefix}${command.name}\`` ).sort().join('\n ') )
                .addField( '\u200b', `You can send \`${prefix}help [command name]\` to get info on a specific command.` )
                .addField( `Need help?`,`Check the [documentation](https://www.google.com) for more information` )
                .setTimestamp()
                .setFooter( version )
            return message.channel.send( helpEmbed );
        };
        //if a '!help' command is called with to arguments display this
            const name = args[0].toLowerCase;
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
            if (!command) {
            message.reply(' invalid command. Please try again.');
            };
    },
};