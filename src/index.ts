import chalk from 'chalk';
import { Client, DiscordAPIError, Message, MessageEmbed } from 'discord.js';
import { HttpCat } from './lib/httpcat';
import { checkUser, connectToDB } from './lib/database';
import { Member } from './types/user';
import { userInfo } from 'os';
import { time } from 'console';

// Load the config from the .env file
require('dotenv').config();

const talk = console.log;

// Create a new client object
const client = new Client();

// Register a function to be excuted when the bot is 'ready'
client.on('ready', () => {
    console.log('Bot ready!');
    // setTimeout(function(){ // in leftToEight() milliseconds run this:
    //     sendMessage(); // send the message once
    //     var dayMillseconds = 1000 * 60 * 60 * 24;
    //     setInterval(function(){ // repeat this every 24 hours
    //         sendMessage();
    //     }, dayMillseconds)
    // }, eightam())
});

// function eightam(){
//     var d = new Date();
//     return (-d + d.setHours(8,0,0,0));
// }

// function sendMessage(){
//     var guild = client.guilds.cache.get('868880194340008006');
//     if(guild && guild.channels.cache.get('868880194340008010')){
//         const channel = guild.channels.cache.get("868880194340008010");
//         channel.message.send("Good Morning");
//     }
// }

// Function to grab a random item from the list
const ran = <K>(list: K[]): K => {
    return list[Math.floor(Math.random() * list.length)];
}

const lastUserMessageData: { [key: string]: Date } = {};




// When receiving message event
client.on("message", async (message: Message) => {
    // Make sure we arent listening to another bot or ourselves
    if (message.author.bot)
        return;
    if (message.member == null)
        return;

    // ==
    let userInfo = await checkUser(message.author.id);
    let potz = " 🌱";

    // If message does not start with our prefix
    // (optional) check time constraint
    // get user data
    // add one to pot count
    // save user data
    if (!message.cleanContent.startsWith("+")) {
        if (!lastUserMessageData[message.author.id] || ((new Date()).getTime() - lastUserMessageData[message.author.id].getTime() >= 15000)) {
            userInfo.pot += 1;
            await userInfo.save();
            console.log('+1 for ' + message.author.username);
            lastUserMessageData[message.author.id] = new Date();
        }
    }

    // Log the cleanContent
    talk(message.cleanContent);

    if (message.cleanContent.startsWith("+help")) {
        message.channel.send(
            "```\n" +
            "+help\t\t\tGet a list of commands this bot has\n" +
            "+profile\t\t\tShows you your server profile\n" +
            "```"
        )
    }

    //cat function
    if (message.cleanContent.startsWith("+cat")) {
        message.channel.send(
            "https://http.cat/" + ran(HttpCat)
        )
    }

    if (message.cleanContent.startsWith("+hi")) {
        message.channel.send(
            "hello!!"
        )
    }

    // https://discordjs.guide/popular-topics/embeds.html#embed-preview
    if (message.cleanContent.startsWith("+profile")) {
        message.channel.send(
            new MessageEmbed()
                .setTitle("This is your profile " + message.member.displayName + "!")
                .setThumbnail(message.author.avatarURL() || '')
                .addField("Pothos", userInfo.pot + potz, true)
        );
    };

    if(message.cleanContent.startsWith("+buy")){
        message.channel.send(
            "```\n" +
            "+server emoji slot\t\t\t200" + potz + "\n" +
            "+Minecraft server\t\t\tComing soon!\n" +
            "+Colored name\t\t\tComing soon!\n" +
            "+@ everyone ping\t\t\tComing soon!\n" +
            "```"
        )
    }

    if (message.channel.id == '856242566119030804') {
        if (message.cleanContent.startsWith("+whois")) {
            message.channel.send(
                new MessageEmbed()
                    .setTitle("This is your profile " + message.member.displayName + "!")
                    .addField("Pothos", 0 + potz, true)
                    .addField("strikes", 0 + " ❌", true)
            );
        }

        // if (message.cleanContent.startsWith("+addPot @") ){
        //     if (message.mentions.members.size !== 1) {
        //         message.channel.send('Please mention exactly 1 user');
        //         return;
        //     }
        //     if(message.mentions[0] == null)
        //         return;
        //     const user = message.mentions;
        //     // console.l
        //     console.log(user)
        //     // let userInfo = await checkUser(message.author.id);
        // }
    }
    // https://discordjs.guide/

    // /[vf][u@]?c?[kc]/g
    //https://regexr.com/
});


// console.log(`The token is ${process.env.DISCORD_TOKEN}`)
// https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot
// https://discordjs.guide/creating-your-bot/
// https://discord.com/developers/applications
// https://discord.com/oauth2/authorize?client_id=865751851433590804&scope=bot&permissions=8

// Execute the login procedure with the token provided
(async () => {
    await connectToDB();
    console.log(`Logging in with ${process.env.DISCORD_TOKEN}`)
    client.login(process.env.DISCORD_TOKEN);
})();