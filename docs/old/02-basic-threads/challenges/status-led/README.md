# Challenge 01 - Status LED

Create an application that demonstrates a `StatusLed` class that can be used to turn a basic LED into a status LED. The status of an embedded system is often outputted based on some blinking pattern of an LED.

By incorporating a Thread in the class, it is guaranteed that the led instance is not holding up the rest of the system.

The LED should both have a separate `onTime` and `offTime` so we can change to pattern.

Take in the `PinName` of actual `DigitalOut` via the constructor.

Make sure to output some logging to the console.

## UML

Below is a UML class diagram of the class that should be created.

```text
####################################
#             StatusLed            #
####################################
# - output: DigitalOut             #
# - onTime: unsigned int           #
# - offTime: unsigned int          #
# - thread: Thread                 #
####################################
# + StatusLed(outputPin: PinName)  #
# + on(time: unsigned int)         #
# + off(time: unsigned int)        #
####################################
```

<!-- Next year we need to elaborate on the fact that on and off are basic setter for time. Better rename to `onTime` and `offTime` -->

## Requirements

What you need to know to solve this:

- How to create classes in C++.
- Know about `PinName` and constructor initialization list.
- How to start a `Thread`.
- How to use a `callback` with an object and class.

## Example

Example binary that can be flashed to the NUCLEO L476RG board can be found in the directory [example](./example).
