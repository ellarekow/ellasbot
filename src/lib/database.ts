import { Member } from "../types/user";

import mongoose from 'mongoose';

export const connectToDB = async () => {
    // @ts-ignore
    const res = await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
        if (err) {
            console.log("error connecting to DB")
        }
    });
    console.log("res of mongoose connect:", res)

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Db connected")
    });
}

export const checkUser = async (user_id: string) => {
    let userInfo = await Member.findOne({
        discord_id: user_id
    });
    if (userInfo == null) {
        // User doesnt exist, lets go add em
        console.log('Adding ' + user_id + ' to DB');
        userInfo = await Member.create({
            discord_id: user_id,
            pot: 10,
            strikes: 0
        })
    }
    return userInfo;
}

// export const findMemberById = async (discord_id: Number) => Member.findOne({ discord_id: discord_id });