

# Project Outline

#### Teammebers
- Benjamin Bäumler
- Maksim Sandybekov


### Motivation
Some people close their curtains/shutters when they go to sleep. The reason for doing so varies from person to person.

This in fact reduces the trespass of outside light into the room. Since the sun can potentially act as a natural
alarm-clock, these people mitigate the possibility to be woken up by the sun. The result is a harder or disordet waking process. 

The usage of an smart device that could simulate the sun by activiating at a certain time and alter it's light intensity over time to gradually increase could help to ease the waking process. 

Summarized the main motive for this project lies in the fact that almost everyone (espacially programmers who work late night) had at some point issues with waking up because of closed curtains/shutters.


### Scenario

The app communicates with one or multiple raspberry pi instances that symbolize each a light instance. Through the
app the user is able to configure a sun simulation mode, in which he sets the time or allows the adjustment by 
native alarm clock data. Optionally the user is also able to integrate his calendar with the application and by
doing so configure the sunrise mode by either the alarm clock or calendar dates. 
In addition the application should optionally enable the user to controll the light instance in many ways. Like ...

- Setting light on/of
- Light intensity
- Color

By doing so the wrapped up end-product becomes something like a smart light.


### Technical structure

#### Hardware
Below listed are the main hardware components that are needed to realize this project.

- Raspberry Pi zero W **x1**
- [4 PIN, 12v RGB LED Strip](https://www.leds24.com/RGB-LED-Strips-12V) **x1**
- N-channel MOSFET (e.g. IRLZ34N) **x3**
- Power Supply (12v) **x1**
- DC Power Cable Female Connector Plug **x1**
- Perfboard **x1**



#### Technologies
The Technologies we selected for this project are **react native** as a **cross-platform** framework and mainly **rust** for the backend as well as the hardware components. Because no teammember currently possses an iOS device our main target platform remains android. By Chance we will still try to target iOS as well. 
The android/iOS codebase will interface with the backend through an adequate library.


##### Architecture (System/Software)
![Architektur](./assets/22_10_2018_block_diagram.png)


### Project details

#### Schedule

| Due                           | Task                                                              |
| ---                           | ---                                                               |
| 25.10.2018                    | Analyze and list hardware and software requirements               |
| 08.11.2018                    | User interface Design                                             |
| 08.11.2018                    | Prototype Software                                                |
| 11.12.2018                    | Wiring of hardware components                                     |
| 11.12.2018                    | Implementation (Core Functionality)                               |
| 10.01.2018                    | Wrap components into and end-product                              |
| 10.01.2019                    | Implementation (Optional Functionality)                           |

#### Complexity
The following aspects of complexity can be identified. The Complexity of software components can
vary depending on usage of libraries and their learning curve, from scratch implementations and also the size and number of seperate parts.

- Hardware complexity (medium)
    - soldering of parts
    - product design/endproduct creation
- Software complexity (easy-hard)
    - Server-Client communication with multiple instances
    - LED strap control
    - Interfacing between rust and android/iOS


#### Risks
- Lack of experience with hardware
- Non standard way to implement app (cross-platform/less support of lecturer)