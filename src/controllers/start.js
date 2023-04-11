import vitals from "../helpers/vitals.js";
import commands from "./commands.js";

export default async function start(client) {
    client.onAnyMessage((message) => {
        vitals(message);
        commands(client, message);
    })
    client.onStateChange(state => {
        console.log(state)
      });
}