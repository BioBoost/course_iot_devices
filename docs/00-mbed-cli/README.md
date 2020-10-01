# Mbed CLI

Install Mbed CLI, which can be found here: [https://os.mbed.com/docs/mbed-os/v6.3/build-tools/install-and-set-up.html](https://os.mbed.com/docs/mbed-os/v6.3/build-tools/install-and-set-up.html)

Creating a new project:

```bash
mbed create hello-blinky
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

Or you can open the terminal manually using:

```bash
sterm --baudrate 115200
```

More info at [https://os.mbed.com/docs/mbed-os/v6.3/build-tools/compile.html](https://os.mbed.com/docs/mbed-os/v6.3/build-tools/compile.html).
