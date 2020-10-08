# Mbed CLI

For this course you will need to install the latest mbed CLI.

<!-- Instructions for the different installation procedures can be found at [https://os.mbed.com/docs/mbed-os/v6.3/build-tools/install-and-set-up.html](https://os.mbed.com/docs/mbed-os/v6.3/build-tools/install-and-set-up.html) -->

## For Windows

::: warning
Don't use the Windows Installer anymore. It is outdated. Follow the `Manual installation` instructions.
:::

First you will need to install Python `3.7.x`. It can be found at [https://www.python.org/downloads/](https://www.python.org/downloads/).

Next install Mercurial. It can be found at [https://www.mercurial-scm.org/](https://www.mercurial-scm.org/).

Also make sure you have a recent version of GIT installed.

Now install the mbed cli using pip inside an elevated Powershell (`Run as Administrator`):

```bash
pip3 install mbed-cli
```

Next install the **GCC Arm Embedded Compiler** which can be found at [https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads](https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-rm/downloads).

Now restart your machine.

If everything went smoothly, the following command in Powershell should return something similar as show:

```bash
mbed --version
1.10.4
```

## For Linux

```bash
sudo apt update
sudo apt install python3 python3-pip git mercurial
sudo apt -y install gcc-arm-none-eabi binutils-arm-none-eabi
sudo ln .local/bin/mbed /usr/local/bin
```

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
