import { getGpt3Response, getDalleResponse } from "../utils/bots/openAi.js";

function personaResponse(client, message, messageLog, temperature) {
    const question = message.body.substring(message.body.indexOf(" "));
    messageLog.push({ "role": "user", "content": question })
    getGpt3Response(messageLog, temperature).then((response) => {
        client.sendText(message.from === process.env.BOT_NUMBER ? message.to : message.from, response)
    })
}

const commands = (client, message, messageLog) => {
    let firstWord = message.body.substring(0, message.body.indexOf(" "));
    if (firstWord === "/gpt") {
        personaResponse(client, message, messageLog.assistant, 0.2)
    } else if (firstWord === "/rpg") {
        personaResponse(client, message, messageLog.rpg, 1.5)
    } else if (firstWord === "/anarchy") {
        personaResponse(client, message, messageLog.anarchy, 0.4)
    } else if (firstWord === "/localimg") {
        const imgDescription = message.body.substring(message.body.indexOf(" "));
        getDalleResponse(imgDescription, message).then((imgUrl) => {
            client.sendImage(
                message.from === process.env.PHONE_NUMBER ? message.to : message.from,
                imgUrl,
                imgDescription,
                'Imagem gerada pela IA DALL-E 🤖'
            )
        })
    }
}

export default commands;