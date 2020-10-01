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

## Printing to Serial over USB

The Arm Mbed microcontroller on your board can communicate with a host PC over the same USB cable that you use for programming.

This allows you to:

* Print out messages to a PC terminal (useful for debugging).
* Read input from a PC keyboard.
* Communicate with applications running on a PC to exchange data.

::: warning Windows Serial Driver
If you cannot connect to the mbed device via serial port, it might be necessary to install the mbed serial driver which can be found here [https://os.mbed.com/docs/mbed-os/v6.3/program-setup/windows-serial-driver.html](https://os.mbed.com/docs/mbed-os/v6.3/program-setup/windows-serial-driver.html).
:::

### Basic Output

The following example prints a `"Hello World!"` message that you can view on a serial terminal. Mbed OS redirects any `printf()` statements to the board's debug USB serial.

```cpp
#include "mbed.h"

// Blinking rate in milliseconds
#define BLINKING_RATE     500ms

int main()
{
    // Initialise the digital pin LED1 as an output
    DigitalOut led(LED1);

    printf("Hello World!\n");

    while (true) {
        led = !led;
        ThisThread::sleep_for(BLINKING_RATE);
    }
}
```

In Mbed Studio you can now open the `Serial Monitor` from the view menu. The standard speed at which the port is configured is `9600 baud`.

::: warning Baudrate Mismatch
If you get gibberish (example: `ö’ö’ƒÕ•¬­ƒ´¼Õƒö­“ƒ²ƒƒƒ¬‘¼¬Õ”’­­“ƒ¬•`) in the Serial Monitor output than you have a mismatch in your communication speeds. Make sure both are sending and listening at the same baudrate.
:::

If you wish to configure the serial channel to use a different baudrate, you can just create a global `BufferedSerial` object and pass the baudrate as the third parameter:

```cpp{6}
#include "mbed.h"

// Blinking rate in milliseconds
#define BLINKING_RATE     500ms

static BufferedSerial pc(USBTX, USBRX, 115200);

int main()
{
    // Initialise the digital pin LED1 as an output
    DigitalOut led(LED1);

    printf("Hello World!\n");

    while (true) {
        led = !led;
        ThisThread::sleep_for(BLINKING_RATE);
    }
}
```
