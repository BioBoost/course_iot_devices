# Challenge - Your Sensor

The time has come you created your own sensor for a change.

In this challenge you are to develop your own first sensor that will output its data via UART every number of seconds. The data that it output is totally up to you.

Some ideas:

* random numbers
* sawtooth amplitude generator
* coordinates in x and y space that draws a figure
* time since startup
* number of times the button was pressed
* basic counter
* ...

Next up is the data format. You will need to select a simple data format that can be easily parsed when read by a host device that connects to the sensor. A basic start-of-frame character and end-of-frame character will make it easy to detect the start and end of a data frame. Pick something for yourself. A good example is `[` for SOF and `]` for EOF.

We will be sending readable ASCII characters and not RAW bytes. Just keep that in mind. So in other words the number `12` will be send as the characters `1` and `2` and not as the byte value `12`. This will make it readable when intercepting the data with the computer. It will also make it much easier to parse. Making the conversing is straight-forward when using a function such as `sprintf()`.

Together with the sensor data you will also need to send an ID. This can be anything. Even a string such as `DIDLY`. Just don't make it too long so the frame does not become to long.

To separate the data and the sensor ID, use a character that is not the SOF or EOF and is not a number as those will be used in the data. Pick something special that is not used anywhere in the rest of the frame.

Now it's time to implement the sensor and make it output its data to the serial port connected to the computer. This will allow for quick debugging.

Setup a `BufferedSerial` instance at the speed of your choosing. Start by outputting a simple message using `printf()`.

Now output your frame every number of seconds (choose the delay yourself).

Once everything is nice and operational you can create another `BufferedSerial` instance, but this time connected to an available UART on the board. Also output the data-frames to this serial port.

::: warning USB UART
The Mbed Nucleo boards have multiple serial ports. Don't pick `D0` and `D1` for your serial connection. These are the pins connected to the PC interface.
:::

Make sure to add an **alive led** on the system so we can see if the sensor is still operational.

## Datasheet

Last but not least you will need to document your sensor here.

Make sure to

* give it a nice name
* explain the data frame
* at what interval is it sending data
* what is the speed of the serial port
* what port is the data being transmitted on

Make sure everything is in this datasheet that I need to know to work with this sensor.
