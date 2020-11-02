// fs is Node's file system module
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
//Collections are a class that extend JS's native Map
//class and include more extensive, useful functionality 
client.commands = new Discord.Collection();

//the fs.readdirSync() method will return an array of all
//the file names in that ('./commands') directory e.g ['ping.js', 'help.js']
//the .filter is there to make sure any non-JS files are 
//left out of the array. With that array, you can loop over it
//and dynamically set your commands to the Collection you made.
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//exporting whatever .js file is in ('./commands')
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

//Once bot is completely loaded let console know
client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', async message => {

    //If message does not start with prefix or if it's from another bot, do not listen
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    //when a user provides arguments .slice() the (prefix.length)
    //then .trim() the spaces out, then .split(/ +/) the arguments
    //into an array and add spaces in between each argument
    //then args.shift() will remove the first element in the first array
    //so that the command string will not return inside the args array
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    //If there is a command under the correct name
    //use the .get() command or find an alias that can also be used for
    //the command and the alias listed as such under the command
    const command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
    
    //If there isn't a correct command name, exit early
    if (!command) return;

    //argument checker. If no argument, let them know.
    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}.`);
    }

    //use the .get() command and call the
    //.execute() method while passing your (message, args)
    //variables as the method arguments.
    try {
        command.execute(message, args);
    } 
    //In case something
    //goes wrong, catch() the (error), log it, and report 
    //back to the member and let them know.
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command. Please try again.')
    }



    
	// other commands...
});

client.login(token);