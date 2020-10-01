# Hello World

Create new Program in *Mbed Studio* and select `mbed-os-example-blinky` as example program.

This should result in:

```cpp
#include "mbed.h"

// Blinking rate in milliseconds
#define BLINKING_RATE     500ms

int main()
{
  // Initialise the digital pin LED1 as an output
  DigitalOut led(LED1);

  while (true) {
    led = !led;
    ThisThread::sleep_for(BLINKING_RATE);
  }
}

```

This is the equivalent of the *Hello World* application. It's blinky. A small application that toggles an LED every `500ms`.

`DigitalOut` is the class that is used to turn an IO into a digital output pin.

## Git

The project automatically sets up a git repository which can later be pushed to GitHub.

::: warning
Make sure not to commit the `mbed-os` directory. If it is not present in the `.gitignore` file, then make sure to add it.
as `mbed-os/`.
:::
