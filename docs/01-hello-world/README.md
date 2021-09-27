# Hello World

```cpp
#include "mbed.h"

DigitalOut led(LED1);

int main() {
  printf("Starting blinky ...\n");

  while(true) {
    ThisThread::sleep_for(chrono::milliseconds(500));
    led = !led;
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

Mbed OS redefines target-dependent I/O functions in the C library to allow you to use the C standard I/O library functions (`s\v\f\n\printf`, `scanf` and so on) in your application for printing to the console.

This allows you to:

* Print out messages to a PC terminal (useful for debugging).
* Read input from a PC keyboard.
* Communicate with applications running on a PC to exchange data.

::: warning Windows Serial Driver
If you cannot connect to the mbed device via serial port, it might be necessary to install the mbed serial driver which can be found here [https://os.mbed.com/docs/mbed-os/v6.3/program-setup/windows-serial-driver.html](https://os.mbed.com/docs/mbed-os/v6.3/program-setup/windows-serial-driver.html).
:::

<!-- More info @ https://os.mbed.com/docs/mbed-os/v6.15/apis/serial-uart-apis.html#printing-to-the-console -->

### Basic Output

The following example prints a `"Hello World!"` message that you can view on a serial terminal. Mbed OS redirects any `printf()` statements to the board's debug USB serial.

```cpp
#include "mbed.h"

DigitalOut led(LED1);

int main() {
  printf("Starting blinky ...\n");

  uint8_t counter = 0;

  while(true) {
    ThisThread::sleep_for(chrono::milliseconds(500));
    led = !led;
    printf("Counting %d\n", counter++);
  }
}
```

To view the serial output use a serial terminal emulator such as Putty which can be found at [https://www.putty.org/](https://www.putty.org/).

::: warning Baudrate Mismatch
If you get gibberish (example: `ö’ö’ƒÕ•¬­ƒ´¼Õƒö­“ƒ²ƒƒƒ¬‘¼¬Õ”’­­“ƒ¬•`) in the output than you have a mismatch in your communication speeds. Make sure both are sending and listening at the same baudrate.
:::


If you wish to configure the serial channel to use a different baudrate, you can change it in the `mbed_app.json` file.
