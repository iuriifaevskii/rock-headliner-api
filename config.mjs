import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV;
const frontEndURL = process.env.FRONT_END_URL;
const mongoClientURL = process.env.MONGO_CLIENT_URL;
const port = process.env.PORT;

export { nodeEnv, frontEndURL, mongoClientURL, port };
