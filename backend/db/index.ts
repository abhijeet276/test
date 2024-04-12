import mongoose from "mongoose";
const mongoPAth = process.env.DB_URL || "mongodb://127.0.0.1:27017/test";
const db = () => {
    mongoose.connect(mongoPAth).then(d => {
        console.log("database is connected successfully", d.connection.host);
    }).catch(err => {
        console.log(err)
    });
};

export default db;