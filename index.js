import { create } from 'venom-bot';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

create({
    session: 'chat-gpt',
    multidevice: true
})
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro)
    })
    
const configuration = new Configuration({
    organization: process.env.ORGANIZATION_ID,
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

async function start(client) {
    client.onAnyMessage((message) => {
        vitals(message);
        commands(client, message);
    })
    client.onStateChange(state => {
        console.log(state)
      });
}

function vitals(message) {
    const dateObject = new Date(message.timestamp * 1000);
    const humanDateFormat = dateObject.toLocaleString(); // outputs "4/10/2023, 12:00:00 PM" on a US system
    console.log("###################################")
    console.log(humanDateFormat);
    console.log("___________________________________")
    console.log(message.sender.pushname);
    console.log("___________________________________")
    if (message.body.toLowerCase() === "hello") {
        client.sendText(message.from, `Ola ${message.sender.pushname}, essa é uma mensagem automatizada`)
    }
}
const getDavinciResponse = async (clientText) => {
    const options = {
        model: "gpt-3.5-turbo", // Modelo GPT a ser usado
        messages: [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": clientText}
        ],
        temperature: 1, // Nível de variação das respostas geradas, 1 é o máximo
        max_tokens: 4000 // Quantidade de tokens (palavras) a serem retornadas pelo bot, 4000 é o máximo
    }
    console.log(`text: ${clientText}`)
    try {
        const completion = await openai.createChatCompletion(options);
          let botResponse = completion.data.choices[0].message.content;
        return `Chat GPT 🤖:\n\n ${botResponse}`
    } catch (e) {
        return `❌ OpenAI Response Error: ${e}`
    }
}

const getDalleResponse = async (clientText) => {
    const options = {
        prompt: clientText, // Descrição da imagem
        n: 1, // Número de imagens a serem geradas
        size: "256×256", // Tamanho da imagem
    }

    try {
        const response = await openai.createImage(options);
        return response.data.data[0].url
    } catch (e) {
        return `❌ OpenAI Response Error: ${e.response.data.error.message}`
    }
}

const commands = (client, message) => {
    const iaCommands = {
        davinci3: "/bot",
        dalle: "/img"
    }
    let firstWord = message.body.substring(0, message.body.indexOf(" "));
    console.log(message.body)

    switch (firstWord) {
        case iaCommands.davinci3:
            const question = message.body.substring(message.body.indexOf(" "));
            getDavinciResponse(question).then((response) => {
                /*
                 * Faremos uma validação no message.from
                 * para caso a gente envie um comando
                 * a response não seja enviada para
                 * nosso próprio número e sim para 
                 * a pessoa ou grupo para o qual eu enviei
                 */
                client.sendText(message.from === process.env.BOT_NUMBER ? message.to : message.from, response)
            })
            break;

        case iaCommands.dalle:
            const imgDescription = message.body.substring(message.body.indexOf(" "));
            getDalleResponse(imgDescription, message).then((imgUrl) => {
                client.sendImage(
                    message.from === process.env.PHONE_NUMBER ? message.to : message.from,
                    imgUrl,
                    imgDescription,
                    'Imagem gerada pela IA DALL-E 🤖'
                )
            })
            break;
    }
}