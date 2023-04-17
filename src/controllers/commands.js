import { getGpt3Response, getDalleResponse } from "../bots/openAi.js";

const commands = (client, message, messageLog) => {
    const iaCommands = {
        gpt3: "/oraculo",
        dalle: "/img"
    }
    let firstWord = message.body.substring(0, message.body.indexOf(" "));

    switch (firstWord) {
        case iaCommands.gpt3:
            const question = message.body.substring(message.body.indexOf(" "));
            messageLog.push({ "role": "user", "content": question })
            getGpt3Response(messageLog).then((response) => {
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

export default commands;