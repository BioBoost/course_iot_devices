# Command Receiver

```cpp
#include "mbed.h"
#include <string>

// Blinking rate in milliseconds
#define BLINKING_RATE     500ms

static BufferedSerial pc(USBTX, USBRX, 115200);

const uint8_t MAXIMUM_BUFFER_SIZE = 32;
std::string command = "";

DigitalOut alive(LED1);
Thread threadBlink;

void blink(void) {
    while (true) {
        alive = !alive;     // You can access the global object here !
        ThisThread::sleep_for(chrono::milliseconds(250));
    }
}

int main()
{
    printf("Starting Command Demo\n");

    // Application buffer to receive the data
    char buffer[MAXIMUM_BUFFER_SIZE] = {0};
    bool commandEnded = false;

    // Create thread from blink
    threadBlink.start(callback(&blink));

    while (true) {

        printf("Please enter command\n");
        printf("> ");
        fflush(stdout);   // Flush buffers

        while (!commandEnded) {
            if (uint32_t numberRead = pc.read(buffer, MAXIMUM_BUFFER_SIZE)) {
            // printf("Received: %s\r\n", buffer);

                for (uint8_t i = 0; i < numberRead; i++) {
                    if (buffer[i] == '\n') {
                        commandEnded = true;
                    } else {
                        command += buffer[i];
                    }
                }
            }
        }

        printf("Executing command %s\r\n", command.c_str());
        command = "";
        commandEnded = false;

        ThisThread::sleep_for(chrono::seconds(1));
    }
}

```

Now consider this example to DIM a led running on PWM