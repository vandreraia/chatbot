import vitals from "../helpers/vitals.js";
import commands from "./commands.js";

export default async function start(client) {
    const messageLog = [{
        role: "system",
        content: "You are a friendly and helpful therapist. You listen carefully to the concerns of your patients and help guide them through their difficulties."
    }]; //defining the personality of the bot for reference: https://josephrocca.github.io/OpenCharacters/
    client.onAnyMessage((message) => {
        vitals(message);
        commands(client, message, messageLog);
    })
    client.onStateChange(state => {
        console.log(state)
    });
}