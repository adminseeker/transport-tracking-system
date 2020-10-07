#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>
#include <WiFiManager.h> 
#include <ESP8266WebServer.h>

//TODO: ESP32 MQTT user config
//const char* ssid = ".................."; // Wifi SSID
//const char* password = ".................."; // Wifi Password
const unsigned int writeInterval = 20000; // write interval (in ms)

const char* mqtt_server = "dbms2.aravindweb.in";
const char* mqtt_topic = "test";
const char* mqtt_username = "dbms";
const char* mqtt_password = "dbms123";
const char* clientID = "testid";

static const int RXPin = 4, TXPin = 5;
static const uint32_t GPSBaud = 9600;


// objects
WiFiClient askClient;
PubSubClient client(askClient);
TinyGPSPlus gps; // The TinyGPS++ object
SoftwareSerial ss(RXPin, TXPin); // The serial connection to the GPS device



// setup
void setup() {
Serial.begin(115200);
Serial.println("*****************************************************");
Serial.println("********** Program Start : ESP32 publishes NEO-6M GPS position over MQTT");
Serial.print("********** connecting to WIFI : ");



  WiFiManagerParameter custom_text1("<p>Your Tracking ID is</p>");
   
  String tracker = WiFi.macAddress();
  tracker.replace(":","");
  char text2[12];
  tracker.toCharArray(text2,13);
  Serial.print(text2);
  WiFiManagerParameter custom_text2(text2);
  
  
  WiFiManager wifiManager;
wifiManager.addParameter(&custom_text1);
wifiManager.addParameter(&custom_text2); 
  wifiManager.setAPStaticIPConfig(IPAddress(192,168,5,1), IPAddress(192,168,5,1), IPAddress(255,255,255,0));
  wifiManager.autoConnect("gps_tracker");
Serial.println("Connected to wifi");

while (WiFi.status() != WL_CONNECTED) {
delay(500);
Serial.print(".");
}
Serial.println("");
Serial.println("->WiFi connected");
Serial.println("->IP address: ");
Serial.println(WiFi.localIP());

client.setServer(mqtt_server, 1883);
client.setCallback(callback);
// GPS baud rate
ss.begin(GPSBaud);

}
// loop
void loop() {

if (!client.connected()) 
reconnect();
client.loop();
// This sketch displays information every time a new sentence is correctly encoded.
while (ss.available() > 0)
if (gps.encode(ss.read()))
displayInfo();

if (millis() > 5000 && gps.charsProcessed() < 10)
{
Serial.println(F("No GPS detected: check wiring."));
while(true);
}
}

// GPS displayInfo
void displayInfo() {

if (gps.location.isValid()) {
double latitude = (gps.location.lat());
double longitude = (gps.location.lng());

Serial.println("********** Publish MQTT data to aws6");
String tracker_id = WiFi.macAddress();
tracker_id.replace(":","");
int tracker_id_len = tracker_id.length()+1;
char tracker_id_char[tracker_id_len];
tracker_id.toCharArray(tracker_id_char,tracker_id_len);
char mqtt_payload[100] = "";
snprintf (mqtt_payload, 100, "%s;%lf;%lf",tracker_id_char, latitude, longitude);
Serial.print("Publish message: ");
Serial.println(mqtt_payload);
client.publish(mqtt_topic, mqtt_payload);
Serial.println("> MQTT data published");
Serial.println("********** End ");
Serial.println("*****************************************************");

delay(writeInterval);// delay 
} else {
Serial.println(F("INVALID"));
}

}

//MQTT callback
void callback(char* topic, byte* payload, unsigned int length) {
Serial.print("Message arrived [");
Serial.print(topic);
Serial.print("] ");
for (int i = 0; i < length; i++) {
Serial.print((char)payload[i]);
}
Serial.println();
}
//MQTT reconnect
void reconnect() {
// Loop until we're reconnected
while (!client.connected()) {
Serial.print("********** Attempting MQTT connection...");
// Attempt to connect
if (client.connect(clientID,mqtt_username, mqtt_password)) { 
Serial.println("-> MQTT client connected");
} else {
Serial.print("failed, rc=");
Serial.print(client.state());
Serial.println("-> try again in 5 seconds");
// Wait 5 seconds before retrying
delay(5000);
}
}
}
