export default function vitals(message) {
    const dateObject = new Date(message.timestamp * 1000);
    const humanDateFormat = dateObject.toLocaleString(); // outputs "4/10/2023, 12:00:00 PM" on a US system
    console.log("###################################")
    console.log(humanDateFormat);
    console.log("___________________________________")
    console.log(message.sender.pushname);
    console.log(message.body);
    console.log("___________________________________")
    if (message.body.toLowerCase() === "hello") {
        client.sendText(message.from, `Ola ${message.sender.pushname}, essa é uma mensagem automatizada`)
    }
}