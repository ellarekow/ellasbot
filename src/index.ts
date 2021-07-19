import chalk from 'chalk';
import { Client, Message, MessageEmbed } from 'discord.js';
import { HttpCat } from './httpcat';

// Load the config from the .env file
require('dotenv').config();

const talk = console.log;

// Create a new client object
const client = new Client();

// Register a function to be excuted when the bot is 'ready'
client.on('ready', () => {
    console.log('Bot ready!');
});

// Execute the login procedure with the token provided
client.login(process.env.DISCORD_TOKEN);

// Function to grab a random item from the list
const ran = <K>(list: K[]): K => {
    return list[Math.floor(Math.random() * list.length)];
}

// When receiving message event
client.on("message", async (message: Message) => {
    // Make sure we arent listening to another bot or ourselves
    if(message.author.bot)
        return;
    
    // Log the cleanContent
    talk(message.cleanContent);
    
    //cat function
    if(message.cleanContent.startsWith("+cat")){
        await message.delete();
        message.channel.send(
            "https://http.cat/" + ran(HttpCat)
        )
        
    }

    
    // /[vf][u@]?c?[kc]/g
    //https://regexr.com/
});


// console.log(`The token is ${process.env.DISCORD_TOKEN}`)
// https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot
// https://discordjs.guide/creating-your-bot/
// https://discord.com/developers/applications
// https://discord.com/oauth2/authorize?client_id=865751851433590804&scope=bot&permissions=8

