import { Schema, model } from 'mongoose';
import { Snowflake } from 'discord.js';

export type IMember = {
    discord_id: Snowflake;
    pot: number;
    strikes: number;
};

const MemberSchema = new Schema<IMember>({
    discord_id: String,
    pot: Number,
    strikes: Number
});

export const Member = model<IMember>("Member", MemberSchema);



// import { Snowflake } from 'discord.js';

// // Defines a user object
// export type User = {

//     discord_id: Snowflake;
//     strikes: number;
//     currency: number;

// };

// const findUser = (id: Snowflake): User => {

//     // TODO: Connect to database / filesystem

//     return {
//         id: "1234",
//         strikes: 0,
//         currency: 0
//     };
// };



// Example code
// example: profile command

// const user = await findUser(msg.author.id);
// msg.channel.send("Hey there " + msg.author.username + " you have " + user.currency + " pot");