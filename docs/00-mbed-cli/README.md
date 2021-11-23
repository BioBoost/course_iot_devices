# Mbed CLI

For this course you will need to install the latest mbed CLI.

Checkout the Software Installation Guide on how to install Mbed CLI at [https://software-installation-guide.netlify.app/mbed/](https://software-installation-guide.netlify.app/mbed/).

::: danger Do not Install Mbed Studio
While the IDE looks all nice and cosy, its been nothing but trouble so far. For the moment we stick to the good old CLI.
:::

## Getting Started

::: tip Conda
Before executing any `mbed` commands, make sure to activate your `mbed` conda environment.
:::

Creating a new project:

```bash
mbed new hello-blinky
```

Set the target manually or select `detect`

```bash
mbed target NUCLEO_L476RG
mbed target detect
```

Select your toolchain (most likely `GCC_ARM`);

```bash
mbed toolchain GCC_ARM
```

Make sure to create a `src/main.cpp` file with the *hello blinky* code in it:

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

It is also best to change the default baudrate at which the UART is working. Change `mbed_app.json` to reflect the example below:

```json
{
  "target_overrides": {
    "NUCLEO_L476RG": {
      "platform.stdio-baud-rate": 115200
    },
    "K64F": {
      "platform.stdio-baud-rate": 9600
    }
  }
}
```

Compile and flash

```bash
mbed compile -f
```

You can also add the `--sterm` option to `mbed compile -f` to compile a new program, flash the program or firmware image to the connected target and then open the serial terminal to its COM port.

```bash
mbed compile -f --sterm
```

Note that it is not possible at the moment to specify the baudrate of `sterm` with the command above.

If using a baudrate different from `9600`, you can open the terminal manually using:

```bash
mbed sterm --baudrate 115200
```

More info at [https://os.mbed.com/docs/mbed-os/v6.3/build-tools/compile.html](https://os.mbed.com/docs/mbed-os/v6.3/build-tools/compile.html).

## Mbed OS Update

To update `mbed-os` make sure to select a stable release version.

Find the releases at [https://github.com/ARMmbed/mbed-os/releases](https://github.com/ARMmbed/mbed-os/releases).

Next traverse to the `mbed-os` direct (really important) and execute a specific update:

```bash
mbed update mbed-os-6.15.0
```

Executing a `git log` inside `mbed-os` will tell you the exact release.
