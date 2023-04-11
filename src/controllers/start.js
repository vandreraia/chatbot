async function start(client) {
    client.onAnyMessage((message) => {
        vitals(message);
        commands(client, message);
    })
    client.onStateChange(state => {
        console.log(state)
      });
}