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
    description: 'Lists all usable commands.',
    //alternative names the command can be called by
    aliases: ['commands'],
    //function that we are executing
    execute( message ){
        //if there are no arguments display this message
        const helpEmbed = new Discord.MessageEmbed()
                .setColor( '#0099ff' )
                .setTitle( 'Commands' )
                .setAuthor( 'Runner', runnerPicture )
                .setDescription(`
                    \`${prefix}ping\` - Displays your ping.
                    \`${prefix}help\` - Displays all commands.
                    \`${prefix}ub\` - Search something in Urban Dictionary. 
                
                `) 
                .addField( `Need help?`,`Check the [documentation](https://www.google.com) for more information` )
                .setTimestamp()
                .setFooter( version )


            return message.channel.send( helpEmbed );
    },
};