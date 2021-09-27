#include "mbed.h"

DigitalOut alive(LED1);
BufferedSerial pc(USBTX, USBRX, 115200);

using namespace std::chrono;

InterruptIn input(USER_BUTTON);
Timer timer;
unsigned int clickId = 0;

void down(void) {
  timer.reset();
  timer.start();
}

void up(void) {
  timer.stop();
  unsigned long long clickTime = duration_cast<milliseconds>(timer.elapsed_time()).count();
  clickId++;
  printf("CLICKER|%d|%d\n", clickId, clickTime);
}

EventQueue queue(32 * EVENTS_EVENT_SIZE);
Thread thread;


int main(void) {
  printf("# Booting Clicker ...\n");
  printf("# Firmware v1.0.1\n");

  // Start the event queue
  thread.start(callback(&queue, &EventQueue::dispatch_forever));

  input.fall(callback(&down));
  input.rise(queue.event(callback(&up)));   // Runs in context of thread (we can printf)
}

// Add this to mbed_app.json:
// {
//     "target_overrides": {
//         "*": {
//             "platform.callback-nontrivial": true
//         }
//     }
// }