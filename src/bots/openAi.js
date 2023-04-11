import openai from "../config/openAi.js";

const getGpt3Response = async (clientText) => {
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
          console.log(botResponse)
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

export {getGpt3Response, getDalleResponse}