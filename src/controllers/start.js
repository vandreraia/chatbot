import vitals from "../utils/vitals.js";
import commands from "./commands.js";
import messageLog from "../utils/personas.js";

export default async function start(client) {
    client.onAnyMessage((message) => {
        vitals(message);
        commands(client, message, messageLog);
    })
    client.onStateChange(state => {
        console.log(state)
    });
}