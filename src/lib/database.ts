import mongoose from "mongoose";

import { Member } from "../types/user";

export const connectToDB = async () => {
    // @ts-ignore
    const response = await mongoose.connect(
        process.env.MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (error) => {
            if (error) {
                console.log("error connecting to DB");
            }
        }
    );

    console.log("res of mongoose connect:", response);

    const database = mongoose.connection;

    database.on("error", console.error.bind(console, "connection error:"));
    database.once("open", () => {
        console.log("Db connected");
    });
};

export const checkUser = async (user_id: string) => {
    let userInfo = await Member.findOne({
        discord_id: user_id,
    });

    if (userInfo == undefined) {
        // User doesnt exist, lets go add em
        console.log("Adding " + user_id + " to DB");
        userInfo = await Member.create({
            discord_id: user_id,
            pot: 10,
            strikes: 0,
        });
    }

    return userInfo;
};

// export const findMemberById = async (discord_id: Number) => Member.findOne({ discord_id: discord_id });
