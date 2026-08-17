# 6. Jetson Nano and Jetson Nano Expansion Board Lesson

## 6.1 Jetson Nano Basic Lesson

### 6.1.1 Lesson 2 Write Image

#### 6.1.1.1 Lesson 2 Burn System Image

The instructions below takes JetAuto as example. They can be applied to Jetson Nano series robots.



**1. Preparation**



As Jetson Nano B01 board does not come with a built-in memory module, it’s important to burn the system image onto the SD card and insert the SD card into Jetson Nano so that Jetson Nano can boot up successfully.



Unlike an ISO file that is typically used to install an operating system on a computer, the official OS for the Jetson Nano (Ubuntu system) is an img file that needs to be written directly onto the SD card. For example, burn the system image of JetAuto created by our company.



Before burning the system image, you need to prepare the following stuffs:



- Card reader



- Memory card



- balenaEtcher-Portable (tool for burning the system image). The tool can be found in the same folder.<img src="../_static/media/chapter_6/section_1/media/image2.png" class="common_img" style="width:70px;" />



**2. Extract the System Image**



Extract the system image files to a storage path that contains only English characters.



<img src="../_static/media/chapter_6/section_1/media/image3.png" class="common_img" style="width:800px;" />



**3. Burn System Image**



(1) After completing the above steps, insert the SD card into card reader and connect the card reader to your computer. Then, use the software “**balenaEtcher**” to burn the system image.



<img src="../_static/media/chapter_6/section_1/media/image4.png" class="common_img" style="width:800px;" />



(2) Click-on “**Flash from file**” and import the extracted image file.



<img src="../_static/media/chapter_6/section_1/media/image5.png" class="common_img" style="width:800px;" />

<img src="../_static/media/chapter_6/section_1/media/image6.png" class="inline-icon" style="width:70px;" />



(3) Click-on “**Select target**” to select the SD card onto which the image is burned.



<img src="../_static/media/chapter_6/section_1/media/image7.png" class="common_img" style="width:800px;" />



**Note: the SD card will be formatted automatically during the process of image burning. If the SD card contains some important data, please remember to back up the data before burning the image.**



(4) Select the corresponding SD card, and then click-on “**Select(1)**”.



<img src="../_static/media/chapter_6/section_1/media/image8.png" class="common_img" style="width:800px;" />



(5) Click-on “**Flash!**” to start burning the system image. It takes a wile for the burning process to be completed.



<img src="../_static/media/chapter_6/section_1/media/image9.png" class="common_img" style="width:800px;" />



<img src="../_static/media/chapter_6/section_1/media/image10.png" class="common_img" style="width:800px;" />



(6) If the below window pops up, simply click-on “Cancel”.



<img src="../_static/media/chapter_6/section_1/media/image11.png" class="common_img" style="width:400px;" />



The system image is burned successfully once the interface shows “**Flash Complete!**”.



<img src="../_static/media/chapter_6/section_1/media/image12.png" class="common_img" style="width:800px;" />

### 6.1.2 Lesson 7 Jetson Nano Network Connection

#### 6.1.2.1 LAN mode introduction



LAN mode is to connect Jetson Nano to wireless router, which is more complicate. LAN mode and direct connection mode cannot be turned on simultaneously. If you want to back to direct connection mode, you can long press KEY1 on expansion board until LED1 flashes.



We take the operation on Android APP for example. And it is also applicable to iOS APP.



Before operation, please start JetHexa.



#### 6.1.2.2 LAN mode connection



1. Firstly, join 5G network, for example “**Hiwomder_5G**”. (The router supporting dual-frequency will distinguish the Wi-Fi name by default under the situation that 2.4 G and 5G are separated. For example, Wi-Fi “**Hiwonder**” is 2.4 frequency band while “**Hiwonder_5G**” is 5G frequency band)



<img src="../_static/media/chapter_6/section_2/media/image2.jpeg" class="common_img" style="width:400px;" />



2. After connection, open WonderAi. Then click “**Advanced-\>JetHexa-\>JetHexa advanced**” in sequence. (Take JetHexa advanced kit for example)



<img src="../_static/media/chapter_6/section_2/media/image3.jpeg" class="common_img" style="width:800px;" />



<img src="../_static/media/chapter_6/section_2/media/image4.jpeg" class="common_img" style="width:800px;" />






3. Click “**+**” button at the lower right corner, then select **LAN Mode**.



<img src="../_static/media/chapter_6/section_2/media/image5.jpeg" class="common_img" style="width:800px;" />



4. Continue, enter the Wi-Fi password. Having entered the password, click “**OK**”. Please ensure the password you enter is correct.



<img src="../_static/media/chapter_6/section_2/media/image6.jpeg" class="common_img" style="width:800px;" />



5. Click “**Go to connect device hotspots**”



<img src="../_static/media/chapter_6/section_2/media/image7.jpeg" class="common_img" style="width:800px;" />



6. Join the WiFi starting with HW, and input the password “**hiwonder**”. After connection, return back to the APP interface.



<img src="../_static/media/chapter_6/section_2/media/image8.jpeg" class="common_img" style="width:400px;" />



7. Then, WonderAi APP is connecting to the robot.



<img src="../_static/media/chapter_6/section_2/media/image9.jpeg" class="common_img" style="width:800px;" />



8. After a while, the robotic icon will show up. And at the same time, LED1 on the expansion board will light up.



<img src="../_static/media/chapter_6/section_2/media/image10.jpeg" class="common_img" style="width:800px;" />



<img src="../_static/media/chapter_6/section_2/media/image11.jpeg" class="common_img" style="width:800px;" />



9. By long pressing the robotic icon, you can check the IP address and ID.



<img src="../_static/media/chapter_6/section_2/media/image12.jpeg" class="inline-icon" style="width:800px;" />

## 6.2 Jetson Nano Expansion Board

### 6.2.1 Lesson 1 Jetson Nano Expansion Board

#### 6.2.1.1 Expansion Board Ports



<img src="../_static/media/chapter_6/section_3/media/image2.png" class="common_img" style="width:800px;" />



#### 6.2.1.2 Ports for Electronic Module



| **Port** | **Function** |
| --- | --- |
| Power adapter port | It can connect to 12.6V 2A power adapter to supply power |
| Serial bus servo port | It can connect to and drive serial bus servo as well as read its status |
| Power port | “+” connects to positive electrode, and “-” connects to negative electrode |
| Power switch | Turn on/ off the device |
| Buzzer | It can make sound through programming |
| KEY1、KEY2 | KEY1: when it is long pressed, the LAN connection mode can be switched to direct connection mode.<br>KEY2：customized function key |
| PWM servo port | It can connect to and drive the PWM servo |
| Serial port | For module expansion |
| 5V/3.3V power supply port | For module expansion |
| GPIO port | For module expansion |
| IIC port | For module expansion |

### 6.2.2 Lesson 2 Expansion Board Installation

#### 6.2.2.1 Accessory List



Before installing the expansion board, please prepare the following staffs.



| **Name** | **Quantity** | **Name** | **Quantity** |
| --- | --- | --- | --- |
| Jetson Nano | 1 | Jetson Nano expansion board | 1 |
| Dual-pass copper column/ M2.5\*12 | 4 | Single-pass copper column/ M2.5\*8+6 | 4 |
| heat sink | 1 | Wireless network card | 1 |
| antenna | 2 | SD card | 1 |
| Phillips round head machine screw/ M2.5\*5 | 4 | cooling fan | 1 |
| Phillips round head screw/ M3\*10 | 4 |  |  |



#### 6.2.2.2 Installation Instruction



1. Install the pillar column to the round hold as pictured. Firstly, pass the single-pass copper column from the back, then use dual-pass copper column to screw the single-pass copper column.



<img src="../_static/media/chapter_6/section_4/media/image2.png" class="common_img" style="width:800px;" />



**Note: do not misplace these two kinds of copper columns. The single-pass copper column should be on the back, and dual-pass copper column on the front.**



<img src="../_static/media/chapter_6/section_4/media/image3.jpeg" class="common_img" style="width:800px;" />



2. Before installing the antenna adapter cable, remove the heat sink first. Remove the screws circled in the picture, then open the locks on both sides of the slot outwards. After that, the heat sink can be removed.



<img src="../_static/media/chapter_6/section_4/media/image4.jpeg" class="common_img" style="width:800px;" />



3. Install the wireless network card into the slot as pictured, and fix it with screw.



<img src="../_static/media/chapter_6/section_4/media/image5.jpeg" class="common_img" style="width:800px;" />



<img src="../_static/media/chapter_6/section_4/media/image6.jpeg" class="common_img" style="width:800px;" />



4. Install the antenna adapter cable to the interface circled in the picture.



<img src="../_static/media/chapter_6/section_4/media/image7.jpeg" class="common_img" style="width:800px;" />



<img src="../_static/media/chapter_6/section_4/media/image8.jpeg" class="common_img" style="width:800px;" />



<img src="../_static/media/chapter_6/section_4/media/image9.png" class="common_img" style="width:800px;" />



5. Put the heat sink back to the slot circled below, and fix it with screw.



<img src="../_static/media/chapter_6/section_4/media/image10.jpeg" class="common_img" style="width:800px;" />



<img src="../_static/media/chapter_6/section_4/media/image11.png" class="common_img" style="width:800px;" />



6. Insert the SD card into the card slot.



<img src="../_static/media/chapter_6/section_4/media/image12.png" class="common_img" style="width:800px;" />



7. Connect the female headers of Jetson Nano expansion board to the headers of the controller. Then fix the expansion board with the Phillips round head machine screw/ M2.5\*5.



<img src="../_static/media/chapter_6/section_4/media/image13.jpeg" class="common_img" style="width:800px;" />



<img src="../_static/media/chapter_6/section_4/media/image14.jpeg" class="common_img" style="width:800px;" />



8. Install the cooling fan on the heat sink, then fix the four corners, circled below, with Phillips round head screw/ /M3\*10.



<img src="../_static/media/chapter_6/section_4/media/image15.jpeg" class="common_img" style="width:800px;" />



9. Connect the wire of the fan to the interface as the picture shown.



<img src="../_static/media/chapter_6/section_4/media/image16.jpeg" class="common_img" style="width:800px;" />

### 6.2.3 Lesson 3 Application Notice

#### 6.2.3.1 Notice



**1. When the expansion board is working, please don’t use screwdrivers or other metal conductive objects to touch the electronic components on the device.**



**2. When the expansion board is working and powered on, you mustn’t unplug the devices except USB and HDMI.**



#### 6.2.3.2 Wiring diagram



<img src="../_static/media/chapter_6/section_5/media/image2.png" class="common_img" style="width:800px;" />



| **Port** | **Function** |
| --- | --- |
| <img src="../_static/media/chapter_6/section_5/media/image3.png" class="inline-icon" style="width:100px;" /> | The serial bus servos can connect to one of them.<br>**Note:** connect the serial bus servos to the interface through 3PIN anti-reverse wire. |
| <img src="../_static/media/chapter_6/section_5/media/image4.png" class="inline-icon" style="width:100px;" /> | It can connect to power cable<br>**Note:** “**+**” connects to positive electrode, and “**-**” connects to negative electrode |
| <img src="../_static/media/chapter_6/section_5/media/image5.png" class="inline-icon" style="width:100px;" /> | It can It can connect to PWM servo whose working voltage is DC 5V.<br>**Note:** “**-**” connects to the negative electrode of servo, “**5V**” connects to negative electrode, and “**S**” connects to the signal terminal. |
| <img src="../_static/media/chapter_6/section_5/media/image6.png" class="inline-icon" style="width:100px;" /> | It can connect to the electronic modules with serial port communication through 4PIN wire<br>**Note:** “TX” is the interface for sending data, and “**RX**” is the interface for receiving data |
| <img src="../_static/media/chapter_6/section_5/media/image7.png" class="inline-icon" style="width:100px;" /> | Used to connect expanded sensors or modules. The interface type is 526-4AW.<br>**Note:**<br>the working voltage of the external sensors and modules must be DC 5V<br>The positive pole of the module and sensor should connect to “**5V**”, negative pole to “**GND**” and signal terminal to “**IO6”, “IO10”, “IO20”** and “**IO26”** |
| <img src="../_static/media/chapter_6/section_5/media/image8.png" class="inline-icon" style="width:100px;" /> | Used to connect sensors or modules with IIC communication. The interface type is 5264-4AW.<br>**Note:** you can connect to one of them |

### 6.2.4 Lesson 4 Control Serial Bus Servo Rotation

#### 6.2.4.1 Wiring



Connect the serial bus servo to any serial bus servo port on the Jetson Nano expansion board. Take HTS-35H servo for example.



<img src="../_static/media/chapter_6/section_6/media/image2.png" class="common_img" style="width:800px;" />



**Note: the servo wire is adopted anti-reverse design. Please don’t plug it violently.**



#### 6.2.4.2 Program Logic



Send the command containing servo ID, position (pulse width) and rotation time, to control the serial bus servo to rotate to the designated position.



The source code is stored in:



**/home/hiwonder/jethexa/src/jethexa_tutorial/scripts/board_04_bus_servo_control.py**



<img src="../_static/media/chapter_6/section_6/media/image3.png" class="common_img" style="width:800px;" />



Take “**serial_servo.set_position(1, 500, 1000)**” for example. The meaning of the parameters in bracket is as follows.



The first parameter “**1**” stands for servo ID



The second parameter “**500**” (pulse width) refers to the position where the servo rotates to. **500** pulse width corresponds to **120** degree. Formula: pulse width = 4.17 x angle (only for reference)



The third parameter “**1000**” (ms) is the time taken for rotation



#### 6.2.4.3 Operation Steps



<img src="../_static/media/chapter_6/section_6/media/image4.png" class="inline-icon" style="width:30px;" />The input command should be case sensitive, and the keywords can be complemented by “**Tab**” key.



**1. Start Jetson Nano robot kit, and then connect it to NoMachine.**



**2.** **Click <img src="../_static/media/chapter_6/section_6/media/image5.png" class="inline-icon" style="width:70px;" /> or press “**Ctrl+Alt+T**” to open command line terminal.**



**3.** **Input command “**rosrun jethexa_tutorial board_04_bus_servo_control.py**” and press Enter to run the program**



<img src="../_static/media/chapter_6/section_6/media/image6.png" class="common_img" style="width:800px;" />



**4.** **If want to close this game, please press “**Ctrl+C**”.**



#### 6.2.4.4 Program Outcome



After the game starts, serial bus servo will move as follows.



**1. spend 1s rotating to 120° (500 pulse width)**



**2. spend 2s rotating to 70°(300 pulse width)**



**3. spend 2s rotating to 170°(700 pulse width)**



**4. spend 1s rotating to 120°(500 pulse width)**

### 6.2.5 Lesson 5 Adjust Serial Bus Servo Speed

#### 6.2.5.1 Wiring



Connect the serial bus servo to any serial bus servo port on the Jetson Nano expansion board. Take HTS-35H servo for example.



<img src="../_static/media/chapter_6/section_7/media/image2.png" class="common_img" style="width:800px;" />



**Note: the servo wire is adopted anti-reverse design. Please don’t plug it violently.**



#### 6.2.5.2 Program Logic



Send the command containing servo ID, position (pulse width) and rotation time, to control the serial bus servo to rotate to the designated position. Through changing the rotation time, the servo speed can be adjusted.



The source code is stored in:



**/home/hiwonder/jethexa/src/jethexa_tutorial/scripts/board_05_bus_servo_speed_contorl.py**



<img src="../_static/media/chapter_6/section_7/media/image3.png" class="common_img" style="width:800px;" />



Take “**serial_servo.set_position(1, 500, 1000)**” for example. The meaning of the parameters in bracket is as follows.



The first parameter “**1**” stands for servo ID



The second parameter “**500**” (pulse width) refers to the position where the servo rotates to. **500** pulse width corresponds to **120** degree. Formula: pulse width = 4.17 x angle (only for reference)



The third parameter “**1000**” (ms) is the time taken for rotation



#### 6.2.5.3 Operation Steps



<img src="../_static/media/chapter_6/section_7/media/image4.png" class="inline-icon" style="width:30px;" />The input command should be case sensitive, and the keywords can be complemented by “**Tab**” key.



**1. Start Jetson Nano robot kit, and then connect it to NoMachine.**



**2.** **Click <img src="../_static/media/chapter_6/section_7/media/image5.png" class="inline-icon" style="width:70px;" /> or press “**Ctrl+Alt+T**” to open command line terminal.**



**3. Input command “rosrun jethexa_tutorial board_05_bus_servo_speed_contorl.py” and press Enter to run the program.**



<img src="../_static/media/chapter_6/section_7/media/image6.png" class="common_img" style="width:800px;" />



**4. If want to close this game, please press “Ctrl+C”.**



#### 6.2.5.4 Program Outcome



After the game starts, ID:1 servo will rotate as follows.



1. spend 1s rotating to 120° (500 pulse width)



2. spend 2s rotating to 150° (625 pulse width) and the angular velocity is 15 degree/s



3. spend 1s rotating to 120° (500 pulse width) and the angular velocity is 30 degree/s

### 6.2.6 Lesson 6 Read Serial Bus Servo Status

Note: before reading the servo status, control the HTS-35H serial bus servo to rotate according to the material in **“6. Jetson Nano and Jetson Nano Expansion Board Lesson-\>2. Jetson Nano Expansion Board-\>Lesson 4 Control Serial Bus Servo Rotation”.**



#### 6.2.6.1 Wiring



Connect the serial bus servo to any serial bus servo port on the Jetson Nano expansion board. Take HTS-35H servo for example.



<img src="../_static/media/chapter_6/section_8/media/image2.png" class="common_img" style="width:800px;" />



**Note: the servo wire is adopted anti-reverse design. Please don’t plug it violently.**



#### 6.2.6.2 Program Logic



Send the corresponding command to read the servo status in real time, including supply voltage, position, temperature, etc.



The source code is stored in:



**/home/hiwonder/jethexa/src/jethexa_tutorial/scripts/board_06_read_bus_servo.py**



<img src="../_static/media/chapter_6/section_8/media/image3.png" class="common_img" style="width:800px;" />





#### 6.2.6.3 Operation Steps




<img src="../_static/media/chapter_6/section_8/media/image4.png" class="inline-icon" style="width:30px;" />The input command should be case sensitive, and the keywords can be complemented by “**Tab**” key.



**1. Start Jetson Nano robot kit, and then connect it to NoMachine.**



**2.** **Click <img src="../_static/media/chapter_6/section_8/media/image5.png" class="inline-icon" style="width:70px;" /> or press “**Ctrl+Alt+T**” to open command line terminal.**



**3.** **Input command “**rosrun jethexa_tutorial board_06_read_bus_servo.py 2**” and press Enter to run the program to read ID:2 servo status.**



<img src="../_static/media/chapter_6/section_8/media/image6.png" class="common_img" style="width:800px;" />



If you need to read the status of other servos, you can modify “**2**” as the corresponding servo ID.



**4. If want to close this game, please press “Ctrl+C”.**



#### 6.2.6.4 Program Outcome



After the game starts, the status of the specific servo will be printed on the command line terminal as pictured.



<img src="../_static/media/chapter_6/section_8/media/image7.png" class="common_img" style="width:800px;" />

### 6.2.7 Lesson 7 Control Single PWM Servo

#### 6.2.7.1 Wiring



Connect the PWM servo to any PWM servo port on the Jetson Nano expansion board. Take LFD-01M servo for example.



<img src="../_static/media/chapter_6/section_9/media/image2.png" class="common_img" style="width:800px;" />



**Note: please strictly distinguish the positive and negative electrode of the PWM servo. Red wire is the positive electrode, and brown wire is the negative electrode.**



#### 6.2.7.2 Program Logic



Through sending the pulse width signal, PWM servo can be controlled to rotate. Sending the command containing position and time for rotation to control PWM servo to spend the set time rotating to the specific position.



The source code of this program is stored in



**/home/hiwonder/jethexa/src/jethexa_tutorial/scripts/board_07_single_pwm_servo_control.py**



<img src="../_static/media/chapter_6/section_9/media/image3.png" class="common_img" style="width:800px;" />



Take “**pwm_servo.pwm_servo1.set_position(1500, 1000)**” for example. The meaning of the parameters in bracket is as follows.



The first parameter “**1500**” (pulse width) refers to the rotation angle. **1500** pulse width corresponds to **90** degree. Formula: pulse width = 11.1 x angle + 500 (only for reference)



The second parameter “**1000**” (ms) is the time taken for rotation



#### 6.2.7.3 Operation Steps




<img src="../_static/media/chapter_6/section_9/media/image4.png" class="inline-icon" style="width:30px;" />The input command should be case sensitive, and the keywords can be complemented by “**Tab**” key.



**1. Start Jetson Nano robot kit, and then connect it to NoMachine.**



**2.** **Click <img src="../_static/media/chapter_6/section_9/media/image5.png" class="inline-icon" style="width:70px;" /> or press “**Ctrl+Alt+T**” to open command line terminal.**



**3.** **Input command “**rosrun jethexa_tutorial board_07_single_pwm_servo_control**” and press Enter to run the program.**



<img src="../_static/media/chapter_6/section_9/media/image6.png" class="common_img" style="width:800px;" />



**4. If want to close this game, please press “Ctrl+C”.**



#### 6.2.7.4 Program Outcome



After the game starts, PWM servo will rotate as follows.



1. spend 1s rotating to 90° (1500 pulse width)



2. spend 1s rotating to 0° (500 pulse width)



3. spend 1s rotating to 180° (2500 pulse width)



4. spend 1s rotating to 90° (1500 pulse width)



#### 6.2.7.5 Function Extension



The default servo port in the program is NO.1 port. If you want to connect the PWM servo to NO.2 port, you need to modify the program.



**1. Double click <img src="../_static/media/chapter_6/section_9/media/image7.png" class="inline-icon" style="width:70px;" /> to open the command line terminal.**



**2.** **Input command “**rosed jethexa_tutorial board_07_single_pwm_servo_control**” and press Enter to open the program file.**



<img src="../_static/media/chapter_6/section_9/media/image8.png" class="common_img" style="width:800px;" />



**3. Locate to the following codes.**



<img src="../_static/media/chapter_6/section_9/media/image9.png" class="common_img" style="width:800px;" />



**Note: you can input the corresponding line number, then press “Shift+G” key to move to the target line.**



**4.** **Press “**i**” key to enter the editing mode, then change “**pwm_servo1**” as “**pwm_servo2**”.**



<img src="../_static/media/chapter_6/section_9/media/image10.png" class="common_img" style="width:800px;" />



**5.** **After modification, press “**Esc**” key, input “**:wq**” and press Enter to save and exit.**



<img src="../_static/media/chapter_6/section_9/media/image11.png" class="common_img" style="width:800px;" />



**6.** **Input command “**rosrun jethexa_tutorial board_07_single_pwm_servo_control.py**” to restart the game, and check the servo performance.**



<img src="../_static/media/chapter_6/section_9/media/image6.png" class="common_img" style="width:800px;" />

### 6.2.8 Lesson 8 Control PWM Servo Speed

#### 6.2.8.1 Wiring



Connect the PWM servo to any PWM servo port on the Jetson Nano expansion board. Take LFD-01M servo for example.



<img src="../_static/media/chapter_6/section_10/media/image2.png" class="common_img" style="width:800px;" />



**Note: please strictly distinguish the positive and negative electrode of the PWM servo. Red wire is the positive electrode, and brown wire is the negative electrode.**



#### 6.2.8.2 Program Logic



Through sending the pulse width signal, PWM servo can be controlled to rotate. Sending the command containing position and time for rotation to control PWM servo to spend the set time rotating to the specific position. By changing the rotation time, PWM servo speed can be adjusted.



The source code of this program is located in



**/home/hiwonder/jethexa/src/jethexa_tutorial/scripts/board_08_pwm_servo_speed_control.py**



<img src="../_static/media/chapter_6/section_10/media/image3.png" class="common_img" style="width:800px;" />



Take “**pwm_servo.pwm_servo1.set_position(1500, 1000)**” for example. The meaning of the parameters in bracket is as follows.



The first parameter “**1500**” (pulse width) refers to the rotation angle. **1500** pulse width corresponds to **90** degree. Formula: pulse width = 11.1 x angle + 500 (only for reference)



The second parameter “**1000**” (ms) is the time taken for rotation



#### 6.2.8.3 Operation Steps



<img src="../_static/media/chapter_6/section_9/media/image4.png" class="inline-icon" style="width:30px;" />The input command should be case sensitive, and the keywords can be complemented by “**Tab**” key.



1. Start Jetson Nano robot kit, and then connect it to NoMachine.



2. Click <img src="../_static/media/chapter_6/section_10/media/image5.png" class="inline-icon" style="width:70px;" /> or press “**Ctrl+Alt+T**” to open command line terminal.



3. Input command “**rosrun jethexa_tutorial board_08_pwm_servo_speed_control.py”** and press Enter to run the program.



<img src="../_static/media/chapter_6/section_10/media/image6.png" class="common_img" style="width:800px;" />



4. If want to close this game, please press “Ctrl+C”.



#### 6.2.8.4 Program Outcome



After the game starts, PWM servo will rotate as follows.



1. spend 1s rotating to 90° (1500 pulse width)



2. spend 2s rotating to 180° (2500 pulse width), and the angle velocity is 45 degree/s



3. spend 1s rotating to 90° (1500 pulse width), and the angle velocity is 90 degree/s

### 6.2.9 Lesson 9 Control 2 PWM Servos

#### 6.2.9.1 Wiring



Connect 2 PWM servos to any PWM servo port on the Jetson Nano expansion board. Take LFD-01M servo for example.



<img src="../_static/media/chapter_6/section_11/media/image2.png" class="common_img" style="width:800px;" />



**Note: please strictly distinguish the positive and negative electrode of the PWM servo. Red wire is the positive electrode, and gray wire is the negative electrode.**



#### 6.2.9.2 Program Logic



Control the PWM servo through sending the pulse width signal, and setting the parameters of different servo ports can control multiple servos.



The source code of this program is saved in



**/home/hiwonder/jethexa/src/jethexa_tutorial/scripts/board_09_multi_pwm_servo_control.py**



<img src="../_static/media/chapter_6/section_11/media/image3.png" class="common_img" style="width:800px;" />



#### 6.2.9.3 Operation Steps



<img src="../_static/media/chapter_6/section_9/media/image4.png" class="inline-icon" style="width:30px;" />The input command should be case sensitive, and the keywords can be complemented by “**Tab**” key.



1. Start Jetson Nano robot kit, and then connect it to NoMachine.



2. Click <img src="../_static/media/chapter_6/section_11/media/image5.png" class="inline-icon" style="width:70px;" /> or press “**Ctrl+Alt+T**” to open command line terminal.



3. Input command “**rosrun jethexa_tutorial board_09_multi_pwm_servo_control.py”** and press Enter to run the program.



<img src="../_static/media/chapter_6/section_11/media/image6.png" class="common_img" style="width:800px;" />



4. If want to close this game, please press “Ctrl+C”.



#### 6.2.9.4 Program Outcome



After the game starts, PWM servo will rotate at the same time as follows.



1. spend 1s rotating to 90° (1500 pulse width)



2. NO.1 servo spends 1s rotating to 0°(500 pulse width), and NO.2 servo spends 1s rotating to 180°(2500 pulse width)



3. NO.1 servo spends 2s rotating to 180°(2500 pulse width), and NO.2 servo spends 2s rotating to 0°(500 pulse width)



4. Two servos both spend 1s rotating to 90°(1500 pulse width)

### 6.2.10 Lesson 10 Control Buzzer

#### 6.2.10.1 Buzzer Location



There is a buzzer on Jetson Nano expansion board as pictured.



<img src="../_static/media/chapter_6/section_12/media/image2.png" class="common_img" style="width:800px;" />



#### 6.2.10.2 Program Logic



The buzzer can be controlled to make sound by setting the output level of the corresponding pin of the buzzer. When the corresponding pin outputs high level, the buzzer will make sound, otherwise, it will not.



The source code of the program is stored in



**/home/hiwonder/jethexa/src/jethexa_tutorial/scripts/board_10_buzzer_control.py**



<img src="../_static/media/chapter_6/section_12/media/image3.png" class="common_img" style="width:800px;" />



#### 6.2.10.3 Operation Steps



<img src="../_static/media/chapter_6/section_9/media/image4.png" class="inline-icon" style="width:30px;" />The input command should be case sensitive, and the keywords can be complemented by “**Tab**” key.



1. Start Jetson Nano robot kit, and connect it to NoMachine



2. Click <img src="../_static/media/chapter_6/section_12/media/image5.png" class="inline-icon" style="width:70px;" /> or press “**Ctrl+Alt+T**” to open command line terminal.



3. Input command “**rosrun jethexa_tutorial board_10_buzzer_control.py**” and press Enter to run the program



<img src="../_static/media/chapter_6/section_12/media/image6.png" class="common_img" style="width:800px;" />



4. If want to close this game, please press “Ctrl+C”.



#### 6.2.10.4 Program Outcome



After the game starts, the buzzer will make short sound once. Then, make long sound once. Lastly, shortly beep five times continuously.

### 6.2.11 Lesson 11 Read Acceleration Sensor

#### 6.2.11.1 MPU6050 Position



Jetson Nano expansion board is equipped with a MPU6050 as pictured.



<img src="../_static/media/chapter_6/section_13/media/image2.png" class="common_img" style="width:800px;" />



#### 6.2.11.2 Program Logic



MPU6050 integrates three-axis MEMS acceleration sensor, three-axis MEMS gyroscope and an expandable DMP (Digital Motion Processor)



And acceleration sensor is used for ranging accelerated speed. The sensor will measure fictitious force acting on the mass block during acceleration, then get its accelerated speed according to Newton's Second Law.



Gyroscope can work to measure angle velocity on the principle that when not affected by external force, the direction of the rotation axis of a spinning object does not change.



Through sending the corresponding command, the data measured by MPU6050 can be read.



The source code of this program is stored in:



**/home/hiwonder/jethexa/src/jethexa_tutorial/scripts/board_11_read_mpu6050.py**



<img src="../_static/media/chapter_6/section_13/media/image3.png" class="common_img" style="width:800px;" />



#### 6.2.11.3 Operation Steps



<img src="../_static/media/chapter_6/section_9/media/image4.png" class="inline-icon" style="width:30px;" />The input command should be case sensitive, and the keywords can be complemented by “**Tab**” key.



1. Start Jetson Nano robot kit, and connect it to NoMachine



2. Click <img src="../_static/media/chapter_6/section_13/media/image5.png" class="inline-icon" style="width:70px;" /> or press “**Ctrl+Alt+T**” to open command line terminal.



3. Input command “**rosrun jethexa_tutorial board_11_read_mpu6050.py**” and press Enter to run the program



<img src="../_static/media/chapter_6/section_13/media/image6.png" class="common_img" style="width:800px;" />



4. If want to close this game, please press “Ctrl+C”.



#### 6.2.11.4 Program Outcome



After the game starts, the status of MPU6050 will be printed on the terminal.



<img src="../_static/media/chapter_6/section_13/media/image7.png" class="common_img" style="width:800px;" />



The meaning of the displayed is listed below.



**1. TEMP：temperature measured by MPU6050**



(2) ACCEL X, Y, Z: respectively refer to X axis, Y axis and Z axis components of the accelerated speed.



(3) GYRO X, Y, Z: ：respectively refer to X axis, Y axis and Z axis components of the angular speed.

### 6.2.12 Lesson 12 Control Serial Port

#### 6.2.12.1 Serial Port Communication Definition



It is easy to control the on and off of one LED by setting its voltage. But if you want to control the screen, composed of hundreds of LEDs, to display a complex pattern, it is annoying to set the LED voltage one by one in the program.



In fact, when using some complicated hardware, we need to send lots of commands to make them work normally. To deal with these situation, the serial communication is launched. Surprisingly, serial communication enables us to send multiple data in one time. IIC and SPI communication are similar to it.



Serial port is also called serial communication port. There are various standards for serial communication, such as TTL, RS-232 and RS-485. Pay attention the standards we list refer to level standard. Generally speaking, serial communication is to realize “communication” between different devices.



Serial communication is a way to transfer data between devices, and the serial port send and receive data by bit.



#### 6.2.12.2 Wiring



Connect the TX and RX interfaces on Jetson Nano expansion board together with a female to female Dupont cable, as the below picture shown.



<img src="../_static/media/chapter_6/section_14/media/image2.png" class="common_img" style="width:800px;" />



#### 6.2.12.3 Program Logic



TX and RX communication port will be employed in serial port communication. And TX port will send the data, and RX port will receive the data. After connecting TX and RX interfaces together, the serial port communication can be simulated, and the “serial port” can send and receive data.



The source code of this program is located in



**/home/hiwonder/jethexa/src/jethexa_tutorial/scripts/board_12_serialport.py**



<img src="../_static/media/chapter_6/section_14/media/image3.png" class="common_img" style="width:800px;" />



The code “**serialHandle.write(b"HELLO WORLD\r\n")**” is used to send data that send “**HELLO WORLD**”.



And the code “**recv = serialHandle.read(serialHandle.in_waiting)**” is used to receive data that is receive “**HELLO WORLD**”



#### 6.2.12.4 Operation Steps



<img src="../_static/media/chapter_6/section_9/media/image4.png" class="inline-icon" style="width:30px;" />The input command should be case sensitive, and the keywords can be complemented by “**Tab**” key.



1. Start Jetson Nano robot kit, and connect it to NoMachine



2. Click <img src="../_static/media/chapter_6/section_14/media/image5.png" class="inline-icon" style="width:70px;" /> or press “**Ctrl+Alt+T**” to open command line terminal.



3. Input command “**rosrun jethexa_tutorial board_12_serialport.py**” and press Enter to run the program



4. If want to close this game, please press “Ctrl+C”.



<img src="../_static/media/chapter_6/section_14/media/image6.png" class="common_img" style="width:800px;" />



#### 6.2.12.5 Program Outcome



After the game starts, the received characters will be printed on the terminal.



<img src="../_static/media/chapter_6/section_14/media/image7.png" class="common_img" style="width:800px;" />
