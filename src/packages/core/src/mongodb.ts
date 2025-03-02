import mongoose, { Mongoose } from "mongoose";

import { 
  MONGO_URI, 
  MONGO_USER, 
  MONGO_PASS, 
  MONGO_DB_NAME 
} from "./constants";

let mongodbConn: Mongoose;
export const getMongoDBConnection = async () => {
  if (!mongodbConn) {
    try {
      mongodbConn = await mongoose.connect(MONGO_URI, {
        user: MONGO_USER,
        pass: MONGO_PASS,
        dbName: MONGO_DB_NAME,
        autoIndex: true,
      });
    } catch (e: any) {
      console.error(e);
    };
  };
};
