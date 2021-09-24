import React, { useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
// import MQTTConnection from "./src/MQTTConnection";
import MQTT from "sp-react-native-mqtt";
import { AsyncStorage } from "react-native";
import { Buffer } from "buffer";
global.Buffer = Buffer;

export default function App() {
  useEffect(() => {
    MQTT.createClient({
      // uri: "ws://broker.mqttdashboard.com:8000",
      uri: "mqtt://test.mosquitto.org:1883",
      clientId: "gyBWfzHuG4",
    })
      .then(function(client) {
        client.on("closed", function() {
          console.log("mqtt.event.closed");
        });

        client.on("error", function(msg) {
          console.log("mqtt.event.error", msg);
        });

        client.on("message", function(msg) {
          console.log("mqtt.event.message", msg);
        });

        client.on("connect", function() {
          console.log("connected");
          client.subscribe("/data", 0);
          client.publish("/data", "test", 0, false);
        });

        client.connect();
      })
      .catch(function(err) {
        console.log(err);
      });
    // this.mqttConnect = new MQTTConnection();
    // this.mqttConnect.onMQTTConnect = this.onMQTTConnect;
    // this.mqttConnect.onMQTTLost = this.onMQTTLost;
    // this.mqttConnect.onMQTTMessageArrived = this.onMQTTMessageArrived;
    // this.mqttConnect.onMQTTMessageDelivered = this.onMQTTMessageDelivered;
    // this.mqttConnect.connect("broker.mqtt-dashboard.com", 8000);
    // onMQTTConnect = () => {
    //   console.log("App onMQTTConnect");
    //   this.mqttConnect.subscribeChannel("cartxyz");
    // };
    // onMQTTLost = () => {
    //   console.log("App onMQTTLost");
    // };
    // onMQTTMessageArrived = (message) => {
    //   console.log("App onMQTTMessageArrived: ", message);
    //   console.log(
    //     "App onMQTTMessageArrived payloadString: ",
    //     message.payloadString
    //   );
    // };
    // onMQTTMessageDelivered = (message) => {
    //   console.log("App onMQTTMessageDelivered: ", message);
    // };
    // return () => {
    //   this.mqttConnect.close();
    // };
  }, []);

  return (
    <View style={styles.container}>
      <Text>react_native_mqtt</Text>
      <Button
        title="Press me"
        onPress={() => MQTT.client.publish("/data", "test", 0, false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
