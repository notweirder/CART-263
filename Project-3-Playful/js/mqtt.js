/*
MQTT template 
CART253, Creative Computation, Fall 2022
Concordia University
l wilkins



We are using the Eclipse Paho MQTT client library: https://www.eclipse.org/paho/clients/js/ to create an MQTT client that sends and receives messages. The client is set up for use on the shiftr.io test MQTT broker (https://shiftr.io/try)

*/

let isConnected = false;

let myName = "player1";
let nextName = "player2";

// MQTT client details. We are using a public server called shiftr.io. Don't change this.
let broker = {
  hostname: "public.cloud.shiftr.io",
  port: 443,
};
let client;
let creds = {
  clientID: Math.random().toString(16).slice(3),
  userName: "public",
  password: "public",
};
let topic = "CART253"; // This is the topic we are all subscribed to
// End of MQTT client details

// Sending a message like this:
function sendMQTTMessage(msg) {
  message = new Paho.MQTT.Message(String(msg)); // Make your message a string and send it
  message.destinationName = topic;
  //console.log("Message Sent!");
  client.send(message); // send message
}

// When a message arrives, do this:
function onMessageArrived(message) {
  let dataReceive = split(trim(message.payloadString), "/"); // Split the incoming message into an array deliniated by "/"
  //console.log("Message Received:");
  functionType = parseInt(dataReceive[0]);
  if (dataReceive[0] == 0) {
    //console.log(dataReceive[1])
    //console.log('hovering over')
    deck[parseInt(dataReceive[1])].hoverOver(); 
}
}
// Callback functions
function onConnect() {
  client.subscribe(topic);
  console.log("connected");
  // is working
  isConnected = true;
}
function onConnectionLost(response) {
  if (response.errorCode !== 0) {
    console.log("connection lost");
  }
}

function MQTTsetup() {
  client = new Paho.MQTT.Client(
    broker.hostname,
    Number(broker.port),
    creds.clientID
  );
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({
    onSuccess: onConnect,
    userName: creds.userName, // username
    password: creds.password, // password
    useSSL: true,
  });
}
