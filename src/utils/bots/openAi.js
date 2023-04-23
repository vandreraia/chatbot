import openai from "../../config/openAi.js";

const getGpt3Response = async (messageLog, temperature = 0.8) => {
    const options = {
        model: "gpt-3.5-turbo", // Modelo GPT a ser usado
        messages: messageLog,
        temperature, // Nível de variação das respostas geradas, 2 é o máximo, mas que 1.5 começa a vim palavras que não existem
    }
    try {
        const completion = await openai.createChatCompletion(options);
        messageLog.push(completion.data.choices[0].message)
        let botResponse = completion.data.choices[0].message.content;
        console.log(messageLog)
        return `Chat GPT 🤖:\n\n ${botResponse}`
    } catch (e) {
        console.log(e.response.data)
        if (e.response.data.error.code === "context_length_exceeded") {
            //how to reduce the length of the messages or completion
            return `Infelizmente chegou no meu limite de tokens, favor retornar amanha para continuarmos o chat.`
        }
        return `❌ OpenAI Response Error: ${e.data}`
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

export { getGpt3Response, getDalleResponse }