#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// ─── WIFI SETTINGS ───────────────────────────
const char* ssid     = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

// ─── SERVER SETTINGS ─────────────────────────
const char* serverUrl = "http://YOUR_PC_IP:5000/api/slots";

// ─── SENSOR PINS (change as per wiring) ──────
// Each slot has one ultrasonic sensor
// TRIG and ECHO pins for 4 slots (expand as needed)
const int TRIG[4] = {5, 18, 19, 21};
const int ECHO[4] = {4, 17, 16, 20};

// ─── SLOT NAMES ──────────────────────────────
const char* slotNames[4] = {"A-01", "A-02", "A-03", "A-04"};

// ─── LOCK PINS (servo or relay) ──────────────
const int LOCK_PINS[4] = {25, 26, 27, 14};

// ─── THRESHOLD (cm) ──────────────────────────
const int THRESHOLD = 10;

// ─── PREVIOUS STATE ──────────────────────────
String prevStatus[4] = {"available", "available", "available", "available"};

void setup() {
  Serial.begin(115200);

  // Setup sensor pins
  for (int i = 0; i < 4; i++) {
    pinMode(TRIG[i], OUTPUT);
    pinMode(ECHO[i], INPUT);
    pinMode(LOCK_PINS[i], OUTPUT);
    digitalWrite(LOCK_PINS[i], LOW);
  }

  // Connect WiFi
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ WiFi Connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

// ─── MEASURE DISTANCE ────────────────────────
float measureDistance(int trigPin, int echoPin) {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH, 30000);
  float distance = duration * 0.034 / 2;
  return distance;
}

// ─── UPDATE SLOT ON SERVER ───────────────────
void updateSlot(const char* slotNumber, String status) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String url = String(serverUrl) + "/" + slotNumber;
    http.begin(url);
    http.addHeader("Content-Type", "application/json");

    String body = "{\"status\":\"" + status + "\"}";
    int responseCode = http.PUT(body);

    if (responseCode > 0) {
      Serial.print("✅ Slot ");
      Serial.print(slotNumber);
      Serial.print(" updated to: ");
      Serial.println(status);
    } else {
      Serial.print("❌ Error updating slot: ");
      Serial.println(responseCode);
    }
    http.end();
  }
}

// ─── CONTROL LOCK ────────────────────────────
void controlLock(int lockPin, bool lock) {
  digitalWrite(lockPin, lock ? HIGH : LOW);
  Serial.print("🔒 Lock pin ");
  Serial.print(lockPin);
  Serial.println(lock ? " LOCKED" : " UNLOCKED");
}

// ─── MAIN LOOP ───────────────────────────────
void loop() {
  for (int i = 0; i < 4; i++) {
    float distance = measureDistance(TRIG[i], ECHO[i]);
    String currentStatus = (distance < THRESHOLD && distance > 0) ? "occupied" : "available";

    Serial.print("Slot ");
    Serial.print(slotNames[i]);
    Serial.print(" — Distance: ");
    Serial.print(distance);
    Serial.print(" cm — Status: ");
    Serial.println(currentStatus);

    // Only update if status changed
    if (currentStatus != prevStatus[i]) {
      updateSlot(slotNames[i], currentStatus);
      controlLock(LOCK_PINS[i], currentStatus == "occupied");
      prevStatus[i] = currentStatus;
    }
  }

  delay(2000); // Check every 2 seconds
}