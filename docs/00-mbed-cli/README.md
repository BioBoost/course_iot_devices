# Mbed CLI

For this course you will need to install the latest mbed CLI.

## For Windows

Download he Windows Installer which can be found here [https://os.mbed.com/docs/mbed-os/v6.3/build-tools/install-and-set-up.html](https://os.mbed.com/docs/mbed-os/v6.3/build-tools/install-and-set-up.html)

Unselect `git-scm` before continuing with the installation.

Next update the mbed-cli version using (new Powershell terminal):

```bash
pip install -U mbed-cli --user
```

Now install the latest **GCC Arm Embedded Compiler** which can be found at [https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads).

Make sure to select `Add to PATH` at the end of the installation procedure.

Now restart your machine.

If everything went smoothly, the following command in Powershell should return something similar as show:

```bash
mbed --version
1.8.3
```

::: warning
If the compilation process fails because the compiler version mismatches (6 vs 9) than you have not selected to add GCC Arm Embedded Compiler to you PATH. Either re-install the compiler or add the directory `C:\Program Files(x86)\GNU Arm Embedded Toolchain\9 2020-q2-update\bin` to your PATH manually. Also make sure that the `C:\Program Files(x86)\GNU Tools Arm Embedded\6 2017-q2-update\bin` is not present.
:::

## For Linux

```bash
sudo apt update
sudo apt install python3 python3-pip git mercurial
sudo apt -y install gcc-arm-none-eabi binutils-arm-none-eabi
sudo ln .local/bin/mbed /usr/local/bin
```

<!-- If the `sudo apt -y install gcc-arm-none-eabi` doesn't work, just download the latest compiler as a tar and extract it somewhere. Set the path using `mbed config -G GCC_ARM_PATH "......./bin". Use `mbed config --global --list` to check. -->

## Getting Started

Creating a new project:

```bash
mbed new hello-blinky
```

Set the target manually or select detect

```bash
mbed target K64F
mbed target NUCLEO_L476RG
mbed target detect
```

Select your toolchain (most likely `GCC_ARM`);

```bash
mbed toolchain GCC_ARM
```

Make sure to create a `src/main.cpp` file with the hello blinky code in it:

```cpp
#include "mbed.h"

DigitalOut led(LED1);

static BufferedSerial pc(USBTX, USBRX, 115200);

int main() {
  printf("Starting blinky ...\n");

  while(true) {
    ThisThread::sleep_for(chrono::milliseconds(500));
    led = !led;
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

Or you can open the terminal manually using:

```bash
mbed sterm --baudrate 115200
```

More info at [https://os.mbed.com/docs/mbed-os/v6.3/build-tools/compile.html](https://os.mbed.com/docs/mbed-os/v6.3/build-tools/compile.html).

## Mbed OS Update

To update `mbed-os` make sure to select a stable release version.

Find the releases at [https://github.com/ARMmbed/mbed-os/releases](https://github.com/ARMmbed/mbed-os/releases).

Next traverse to the `mbed-os` direct (really important) and execute a specific update:

```bash
mbed update mbed-os-6.2.0
```

Executing a `git log` inside `mbed-os` will tell you the exact release.
