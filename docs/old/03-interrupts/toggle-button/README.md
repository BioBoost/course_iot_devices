# Challenge 02 - Toggle Button

Create an application that demonstrates a `ToggleButton` class that can be applied to a `InterruptIn` pin. Each rising edge should toggle the internal state of the button and call a given callback allowing the user to execute his/her own code.

Take in the `PinName` of actual `InteruptIn` via the constructor.

Don't output logging messages to the console inside the ISR methods as it will crash the app. No messages can be logged in ISR context.

A reset method can be used to reset the toggle button to its original state (off).

## UML

Below is a UML class diagram of the class that should be created.

```text
######################################################################
#                     ToggleButton                                   #
######################################################################
# - input: InterruptIn                                               #
# - isOn: bool                                                       #
######################################################################
# + ToggleButton(inputPin: PinName, onToggle: Callback<void(bool)>)  #
# + reset()                                                          #
######################################################################
```

## Requirements

What you need to know to solve this:

- How to create classes in C++.
- Know about `PinName` and constructor initialization list.
- How to attach to an `InterruptIn`.
- How to use a `callback` with an object and class.
- How to pass and store a `callback`

## Example

Example binary that can be flashed to the NUCLEO L476RG board can be found in the directory [example](./example).
