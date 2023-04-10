import { create } from 'venom-bot'

create({
    session: 'chat-gpt',
    multidevice: true
})
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro)
    })

async function start(client) {
    client.onAnyMessage((message) => {
        console.log(message.sender);
        const dateObject = new Date(message.timestamp * 1000);
        const humanDateFormat = dateObject.toLocaleString(); // outputs "4/10/2023, 12:00:00 PM" on a US system
        console.log(humanDateFormat);
        if (message.body.toLowerCase() === "hello") {
            // message.from é o número do usuário que enviou a msg "hello"
            client.sendText(message.from, `Ola ${message.sender.verifiedName}, essa é uma mensagem automatizada`)
        }
        console.log("_________________________________________");
    })
}