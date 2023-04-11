import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';

dotenv.config()

const configuration = new Configuration({
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

export default openai;