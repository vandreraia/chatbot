import * as dotenv from 'dotenv';
import start from './src/controllers/start.js';
import { create } from 'venom-bot'  

dotenv.config()

create({
    session: 'chat-gpt',
    multidevice: true
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro)
    })