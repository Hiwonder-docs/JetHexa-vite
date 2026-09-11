# 2. Linux Basic Lesson

## 2.1 Linux Introduction 

### 2.1.1 Linux Introduction 

Before introducing Linux, we need to know what is operating system.

Computer can receive message, store data, process data and output the processing result (word, picture, audio and video) according to the requirements of users.

Hardware is described as physical components of a computer containing screen, keyboard, etc., and software can coordinate how the whole computer works. And operating system is one kind of the software, which serves as intermediary for the communication between hardware and other software. 

Operating system will control other programs to run, manage system resources and provide the rudimentary computer functions.

And Linux is an operating system similar to Windows. However, different from Windows, Linux is open-source.  

<img src="../_static/media/chapter_2/section_1/image1.png" style="display: block;margin: 0 auto 24px;width:400px" />

### 2.1.2 Linux Characteristic 

In the past 20 years, Linux is applied in three major fields, including server side, embedded development and PC desktop, and server side is the key field. For example, lots of internet enterprises adopt Linux as their program running platform of server side.

And Linux enjoys such popularity attributing to the following advantages. 

① free and open-source  

② fully compatible

③ multiple users and tasks

④ Enable you to develop practical and creative projects

⑤ live boot image of Linux can start a computer whose hard disk crashes, and then find out the solution. As an multi-user operating system, Linux is very private and stable, and your teammates can login the system locally or remotely at the same time. 

⑥ Linux provides a sophisticated software package management system that allows you to download and maintain the applications in every online repository without worry.

### 2.1.3 Mainstream Version

Linux has released various versions, and the common systems are listed below. 

**(1) Ubuntu**

Ubuntu is a Linux distribution based on Debian. It is competitive in the field of proprietary desktop operating system, and highly compatible with new software. With user-friendly desktop and supporting wide range of hardware, Ubuntu is the first choice for desktop system, and also applicable to server side.  

<img src="../_static/media/chapter_2/section_1/image2.png" style="display: block;margin: 0 auto 24px;width:400px" />

Ubuntu aims at providing a up-to-date and stable operating system composed of major free software for general users. Besides, Ubuntu has a powerful community where users can get help.

**(2) Debian**

Released in 1993, Debian is very stable, involves more than 30,000 software packages and supports more processor architectures than other Linux distributions. 

<img src="../_static/media/chapter_2/section_1/image3.png" style="display: block;margin: 0 auto 24px;width:400px" />

**(3) RHEL**

<img src="../_static/media/chapter_2/section_1/image4.png" style="display: block;margin: 0 auto 24px;width:400px" />

Redhat series systems are listed below. 

① RHEL: Redhat Enterprise Linux is also called Redhat Advance Server. Not free, but stable and applicable to server.

② Fedora Core: Developed from desktop version of Redhat, it is free but not stable. It is better to apply it to desktop application.）

③ CentOS: community clone version of RHEL. Free, stable and fit for server.）

**(4) Fedora**

Built by global community enthusiasts, Fedora is a swift and powerful operating system for daily applications. Anyone is free to use, modify and republish. It is developed by strong community whose members immerse themselves in offering and maintaining free and open-source software and open criterion.

<img src="../_static/media/chapter_2/section_1/image5.png" style="display: block;margin: 0 auto 24px;width:400px" />

Fedora is an operating system based on Linux and a collection of software keeping computer running. Its goal is to develop a set of innovative, multi-functional, free and open-source operating system.  

**(5) OpenSUSE**

OpenSUSE is well-known German Linux system which enjoys large global popularity and high market share, and its distribution ranks first in Europe. OpenSUSE is free to use and update.

<img src="../_static/media/chapter_2/section_1/image6.png" style="display: block;margin: 0 auto 24px;width:400px" />



## 2.2 VirtualBox Installation 

(1) Open the software installation package under the same directory. Then click “**Next**”.

<img src="../_static/media/chapter_2/section_2/image16.png" style="display: block;margin: 0 auto 24px;width:500px" />

(2) Select the location where the software is installed.

<img src="../_static/media/chapter_2/section_2/image17.png" style="display: block;margin: 0 auto 24px;width:500px" />

(3) Remain the default selection, and click “**Next**”.

<img src="../_static/media/chapter_2/section_2/image18.png" style="display: block;margin: 0 auto 24px;width:500px" />

(4) Click “**Yes**” and “**Install**” in sequence to start the installation.

<img src="../_static/media/chapter_2/section_2/image20.png" style="display: block;margin: 0 auto 24px;width:500px" />

(5) After installation, click “ Finish ”.

<img src="../_static/media/chapter_2/section_2/image21.png" style="display: block;margin: 0 auto 24px;width:500px" />

## 2.3 Environment Configuration in Windows

A virtual machine is the software that allows us to run other operating systems on a operating system. Take VMware Workstation for example, and you can follow these steps to install. 

(1) Extract the zip file saved under this path, **“configuration file->VMware”**.

<img src="../_static/media/chapter_2/section_2/image1.png" class="common_img" />

(2) Find the extracted file of VMware, and then double click the executable file suffixed with .exe

<img src="../_static/media/chapter_2/section_2/image2.png" class="common_img" />

(3) Next, follow the pictures below to install VMware.

<img src="../_static/media/chapter_2/section_2/image3.png" class="common_img" />

<img src="../_static/media/chapter_2/section_2/image4.png" class="common_img" />

<img src="../_static/media/chapter_2/section_2/image5.png" class="common_img" />

<img src="../_static/media/chapter_2/section_2/image6.png" class="common_img" />

<img src="../_static/media/chapter_2/section_2/image7.png" class="common_img" />

<img src="../_static/media/chapter_2/section_2/image8.png" class="common_img" />

<img src="../_static/media/chapter_2/section_2/image9.png" class="common_img" />

(4) VMware Workstation offers 30-day free trial. After 30-day trial, you can purchase a license key to activate this software. If you need free resource, please contact us via email.

<img src="../_static/media/chapter_2/section_2/image10.png" class="common_img" />

## 2.4 Linux Installation and Source Replacement

:::{Note}
choose the corresponding installation and configuration methods according to the virtual machine you have installed.
:::

### 2.4.1 VMware Virtual Machine Installation and Configuration

**2.4.1.1 Create New Virtual Machine**

(1) Extract Ubuntu image archive.

(2) Open virtual machine. Click “**Create a New Virtual Machine**”.

<img src="../_static/media/chapter_2/section_3/image1.png" class="common_img" />

(3) Next, click “**custom**”  in the pop-up interface, and then click “**Next**”. After that, operate in sequence according to the pictures below.

<img src="../_static/media/chapter_2/section_3/image2.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image3.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image4.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image5.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image6.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image7.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image9.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image10.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image11.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image12.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image13.png" class="common_img" />

:::{Note}
It is recommended that the maximum disk size be increased, such as 120G, in case of late development and learning space shortage.
:::

<img src="../_static/media/chapter_2/section_3/image14.png" class="common_img" />

:::{Note}
Make sure you place it on a disk with enough space.
:::

<img src="../_static/media/chapter_2/section_3/image15.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image16.png" class="common_img" />

(4) After configuration, the interface should look like this.

<img src="../_static/media/chapter_2/section_3/image17.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image18.png" class="common_img" />

(5) After installation, enter the password to login the system desktop. And follow the pictures to operate.

<img src="../_static/media/chapter_2/section_3/image19.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image20.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image21.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image22.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image23.png" class="common_img" />

**2.4.1.2 Replace Source** 

:::{Note}
this step matters. Please don’t skip this step! Otherwise, it will fail to download installation package due to network error. 
:::

Source functions as APP Store on iOS and Android, where users can download and update.  

Ubuntu’s default software download server is officially designated. If the files is downloaded slowly or error occurs during downloading, you can switch the software server to other source for downloading.

Take changing into aliyun for example. And you can select the appropriate source based on your country or region.

(1) Firstly, check network connection.

<img src="../_static/media/chapter_2/section_3/image24.png" class="common_img" />

(2) click the button at bottom left corner, and then input **“setting ”** in input field.

<img src="../_static/media/chapter_2/section_3/image25.png" class="common_img" />

(3) Then, search “**software and update**”, and double click the icon to open.

<img src="../_static/media/chapter_2/section_3/image26.png" class="common_img" />

(4) After opening, click “**Download from->Other**”.

<img src="../_static/media/chapter_2/section_3/image27.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image28.png" class="common_img" />

(5) Scroll the list to find “**mirrors.aliyun.com**” server. 

<img src="../_static/media/chapter_2/section_3/image29.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image30.png" class="common_img" />

(6) If you are not sure which server is suitable, you can click “**Select Best Server**”.

After selection, you are required to input the set password. 

<img src="../_static/media/chapter_2/section_3/image31.png" class="common_img" />

**2.4.1.3 Modify Resolution**

If you need to change the display resolution, you can follow the following steps to operate.  

(1) Click the button at the bottom left corner, and then input “**setting**” in the input field.

<img src="../_static/media/chapter_2/section_3/image32.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image33.png" class="common_img" />

(2) Double click the setting icon, and then click<img src="../_static/media/chapter_2/section_3/image0.png" />and input “**Display**”.

<img src="../_static/media/chapter_2/section_3/image34.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image35.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image36.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image37.png" class="common_img" />

(3) You can select the resolution you want, and then follow the pop-up instructions to complete modification.

<img src="../_static/media/chapter_2/section_3/image38.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image39.png" class="common_img" />

(4) After modification, the display effect is as follow. 

<img src="../_static/media/chapter_2/section_3/image40.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image41.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image42.png" class="common_img" />

<p id="anchor_3_1_5"></p>

**2.4.1.4 Share Folder**

In later program development, we need to transfer the files between the hosts and virtual machine. For example, the source codes are saved in virtual machine, while they need to be read or modified on hosts. Therefore shared folder is required. 

If you are using VMware, we can directly set on VMware to realize the function of shared folder.

**(1) Create and Check Share Folder**   

① Power off Ubuntu, and click **“virtual machine->settings”**.

<img src="../_static/media/chapter_2/section_3/image62.png" class="common_img" />

② Then, click “Option->Shared Folders->Always Enabled->Add”.

<img src="../_static/media/chapter_2/section_3/image63.png" class="common_img" />

③ In later pop-up interface, click **“Next->Browse”**, and select the host path where the folder is built. And, name it “share_test”.

:::{Note}
 ensure there is no content in the share holder when first configuration, otherwise it will fail to configure. If share folder contains files, please remove the files first.
:::

<img src="../_static/media/chapter_2/section_3/image64.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image65.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image66.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image67.png" class="common_img" />

④ Power on virtual machine and start the system. If it shows that “cannot connect to virtual device”, choose “NO”.

<img src="../_static/media/chapter_2/section_3/image68.png" style="display: block;margin: 0 auto 24px;width:500px" />

⑤ Having entered the desktop, press **“Ctrl+Alt+T“** open command line terminal.

⑥ Input command “**sudo apt install open-vm-tools**”, then input password. (The input password will hidden. Press Enter when you finish.)

```bash
sudo apt install open-vm-tools
```

<img src="../_static/media/chapter_2/section_3/image69.png" class="common_img" />

:::{Note}
 if following messages pop up, you can restart NAT server according to the file in “[Linux Basic Lesson>3. Environment Configuration in Windows]()”.
:::

<img src="../_static/media/chapter_2/section_3/image70.png" class="common_img" />

```bash
sudo apt install open-vm-tools
```

⑦ Input **“ls /mnt/”** to check whether **“hgfs”** folder is generated under **“/mnt”** directory after configuring virtual machine. 

```bash
ls /mnt/
```

<img src="../_static/media/chapter_2/section_3/image71.png" class="common_img" />
If there is no “hgfs” folder as pictured
<img src="../_static/media/chapter_2/section_3/image72.png" class="common_img" />

You need to create manually. Input command “sudo mkdir /mnt/hgfs”. (Password is required. The input password will hidden. Press Enter when you finish.)

```bash
sudo mkdir /mnt/hgfs
```

⑧ Input command “sudo mount -t fuse.vmhgfs-fuse .host:/ /mnt/hgfs -o allow_other” to mount the folder manually, if you found “hgfs” folder under “/mnt” directory.

```bash
sudo mount -t fuse.vmhgfs-fuse .host:/ /mnt/hgfs -o allow_other
```

Note: if the prompts below occur

<img src="../_static/media/chapter_2/section_3/image75.jpeg" class="common_img" />

Input command “sudo mount -t fuse.vmhgfs-fuse .host:/ /mnt/hgfs -o allow_other -o nonempty” to remount.

```bash
sudo mount -t fuse.vmhgfs-fuse .host:/ /mnt/hgfs -o allow_other -o nonempty
```

⑨ Input command “**cd /mnt/hgfs/Share**” to enter shared folder when you finish mounting. (Shared folder name should be consistent with name of the folder you create in host device. If not consistent, please change it.)

```bash
cd /mnt/hgfs/Share
```

⑩ The shared folder is saved in **E:\share**, and **/mnt/hgfs/share/** of the virtual machine. 

Make a test: put “test.txt” into the shared folder of host device. 

<img src="../_static/media/chapter_2/section_3/image77.png" class="common_img" />

Input “**ls**” under /mnt/hgfs/Share/ of virtual machine. If this file shows up, the configuration is successful.

```bash
ls
```

<img src="../_static/media/chapter_2/section_3/image78.png" class="common_img" />

**2.4.1.5 Common Problem in Shared Folder**

**(1) files cannot be shared**

①  check whether hgfs shared folder is created according to step 1-7 in “[4.1.4 Share Folder->(1) Create and Check Share Folder]()”.

② Check whether local shared folder contains files. If there are files in it, create a new shared folder according to step 2-3 in “ [4.1.4 Share Folder->(1) Create and Check Share Folder]()”

③ Configure the virtual machine shared folder again referring to step 1-2 in “[4.1.4 Share Folder->(1) Create and Check Share Folder]()”

**(2) Cannot find shared folder after restart virtual machine**

If you cannot find the shared folder after manual mounting and restarting virtual machine, you can mount it automatically. You can configure automatic mounting through the vi editor. Since the pre-installed vi editor is a simple version in Ubuntu system, in order to better edit the files, we need to uninstall it and reinstall the complete version of the vi editor.

① Open the command line terminal and input “sudo apt-get remove vim-common” to uninstall the vi editor.

```bash
sudo apt-get remove vim-common
```

<img src="../_static/media/chapter_2/section_3/image79.png" class="common_img" />

② Input command “**sudo apt-get install vim**” to install the vi editor of the complete version.

```bash
sudo apt-get install vim
```

<img src="../_static/media/chapter_2/section_3/image80.png" class="common_img" />

③ Input command **“sudo vi /etc/fstab”**, and open this configuration file through vi editor. And then input the password. Pay attention the password you input will be hidden, and you can press Enter after inputting. 

```bash
sudo vi /etc/fstab
```

④ Copy"**.host:/ /mnt/hgfs fuse.vmhgfs-fuse auto,allow_other 0 0**".

⑤ Return to vi editor and press “i” key. Move to the end of the file through pressing “ &uarr;&darr;&larr; &rarr; ” keys.

<img src="../_static/media/chapter_2/section_3/image82.png" class="common_img" />

⑥ Press Enter and right click to paste the content copied in step 5 to the file.

<img src="../_static/media/chapter_2/section_3/image83.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image84.png" class="common_img" />

⑦ Press Enter and input “:wq” and press Enter to save and exit editing.

<img src="../_static/media/chapter_2/section_3/image85.png" class="common_img" />

⑧ Restart the virtual machine and check whether the shared folder can be found.

### 2.4.2 VirtualBox Virtual Machine Installation and Configuration

**2.4.2.1 Create New Virtual Machine**

(1) Click “**New**”, then name the system and set the destination folder. The fixed type is Linux, and version is Ubuntu64. 

<img src="../_static/media/chapter_2/section_3/image86.png" class="common_img" />

(2) Select the memory size of the virtual machine. 2GB is recommended.

<img src="../_static/media/chapter_2/section_3/image87.png" class="common_img" />

(3) Click “Create”. The default type of the disk file is VDI and the storage on the hard disk is dynamically allocated.

<img src="../_static/media/chapter_2/section_3/image88.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image89.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image90.png" class="common_img" />

(4) Set the folder to store the files and the size of disk. 20GB is recommended. After setting, click “Create”.

<img src="../_static/media/chapter_2/section_3/image91.png" class="common_img" />

**2.4.2.2 Configure Virtual Machine**

(1) Click settings

<img src="../_static/media/chapter_2/section_3/image92.png" class="common_img" />

(2) Extract Ubuntu image stored in the same folder, then click “**storage->Empty->choose a disk file**” in sequence.

<img src="../_static/media/chapter_2/section_3/image93.png" class="common_img" />

(3) Open the extracted Ubuntu image.

<img src="../_static/media/chapter_2/section_3/image94.png" class="common_img" />

(4) Click ‘OK’ to save the settings.

<img src="../_static/media/chapter_2/section_3/image95.png" class="common_img" />

(5) Click “File->Preferences” in sequence

<img src="../_static/media/chapter_2/section_3/image96.png" class="common_img" />

(6) Click Display. Select Automatic, and you can input the required screen size.

<img src="../_static/media/chapter_2/section_3/image97.png" class="common_img" />

(7) Open “Preferences” page again. Then select ‘Network’ to add NatNetwork. Finally, click ‘OK’.

<img src="../_static/media/chapter_2/section_3/image98.png" class="common_img" />

(8) Click ‘Setting’ to enter virtual machine setting interface.

<img src="../_static/media/chapter_2/section_3/image92.png" class="common_img" />

(9) Click ‘Ntework’. Attach to “**NAT network**”. Name is NatNetwork. Then click “advanced” and tick “cable connected”

<img src="../_static/media/chapter_2/section_3/image99.png" class="common_img" />

(10) Start virtual machine.

<img src="../_static/media/chapter_2/section_3/image100.png" class="common_img" />

(11) Select the language to use, the install Ubuntu.

<img src="../_static/media/chapter_2/section_3/image101.png" class="common_img" />

(12) Wait for the installation to complete.

<img src="../_static/media/chapter_2/section_3/image102.png" class="common_img" />

(13) After installation, login the system.

<img src="../_static/media/chapter_2/section_3/image103.png" class="common_img" />

(14) Before next starting the virtual machine, you need to change the boot order. Otherwise, the system is reinstalled.

<img src="../_static/media/chapter_2/section_3/image19.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image20.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image21.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image22.png" class="common_img" />

<img src="../_static/media/chapter_2/section_3/image23.png" class="common_img" />

(15) Click ‘system’, cancel following selections as pictured except hard disk. Then move disk tab to the top.

<img src="../_static/media/chapter_2/section_3/image104.png" class="common_img" />

16. Click System on the left menu, uncheck all boot order options except Hard Disk, move Hard Disk to the top of the boot order, and click OK to save.

<img src="../_static/media/chapter_2/section_3/image105.png" class="common_img" />

**2.4.2.3 Set Shared Folder**

(1) Click ‘Setting’.

<img src="../_static/media/chapter_2/section_3/image92.png" class="common_img" />

(2) Click “shared folder>![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml7304\wps1.jpg)”. Then input the folder path and name. After that, tick “auto-mount” and fill in mount point “**/mnt/share/**”. When you finish , click “OK”

:::{Note}
ensure there is no files in the path you set, otherwise shared folder cannot be created.
:::

<img src="../_static/media/chapter_2/section_3/image106.png" class="common_img" />

(3) Start virtual machine.

<img src="../_static/media/chapter_2/section_3/image101.png" class="common_img" />

(4) Click “**device>insert guest additions CD images**”

<img src="../_static/media/chapter_2/section_3/image107.png" class="common_img" />

If this error box pops up, return back to the desktop, right click the disk to eject. Then install it again.

<img src="../_static/media/chapter_2/section_3/image108.png" style="display: block;margin: 0 auto 24px;width:500px" />

<img src="../_static/media/chapter_2/section_3/image109.png" class="common_img" />

(5) After installation, run this software.

<img src="../_static/media/chapter_2/section_3/image110.png" class="common_img" />

(6) Input password to verify.

<img src="../_static/media/chapter_2/section_3/image111.png" class="common_img" />

(7) If you receive the following prompt, it means that the installation is completed, and Press Enter to close this window.

<img src="../_static/media/chapter_2/section_3/image112.png" class="common_img" />

(8) Right click desktop, and select “open terminal”.

<img src="../_static/media/chapter_2/section_3/image113.png" class="common_img" />

:::{Note}
Command entries are strictly case-sensitive and the Tab key can be pressed for keyword auto-completion.
:::

(9) Input command “**sudo mkdir /mnt/share**” to create shared folder. Password is required, and the password you input will hidden. Having finished, press Enter.

```bash
sudo mkdir /mnt/share
```

(10) After the folder is mounted, input command “**sudo usermod -aG vboxsf $(whoami)**” to get access to this folder. Lastly, restart virtual machine.

```bash
sudo mount -t vboxsf share /mnt/share
```

(11) Test whether the shared folder works. Put a test file into the shared folder on hose device. 

```bash
sudo usermod -aG vboxsf \$(whoami)
```

(12) Open the terminal on virtual machine. Input command “**cd /mnt/share**” to enter the shared folder.

<img src="../_static/media/chapter_2/section_3/image117.png" class="common_img" />

(13) Input command “ls” to check what is included in the folder. If the files on two devices are consistent, the shared folder is created successfully.

```bash
cd /mnt/share
```

14. Enter the command "**ls**" to verify that all files in the directory match to complete directory sharing.

```bash
ls
```

## 2.5 Basic Operation of Linux 

### 2.5.1 GUI Layout

Take GUI of Ubuntu for example. If you want to check GUI of other Linux versions, please search online.

(1)The yellow frame at left is the menu bar, at right is the desktop, and under it is the tool bar. And the status bar is on the top. 

<img src="../_static/media/chapter_2/section_4/image1.png" class="common_img" />

(2) Some basic tools including, browser, mailbox and Office software, can be found in the menu bar, which can meet your basic usage needs.

(3) click<img src="../_static/media/chapter_2/section_4/image2.png" style="width:0.6875in;height:0.65625in" /> ， and we can select the various kinds of tools. You can input the tool name in the input field to find the corresponding tool.

<img src="../_static/media/chapter_2/section_4/image3.png" class="common_img" />

(4) Click the far right corner of the status bar.

<img src="../_static/media/chapter_2/section_4/image4.png" class="common_img" />

(5) The window below will appear.

<img src="../_static/media/chapter_2/section_4/image5.png" style="display: block;margin: 0 auto 24px;width:500px" />

(6) The window below will appear.

<img src="../_static/media/chapter_2/section_4/image6.png" style="display: block;margin: 0 auto 24px;width:500px" />

7. Configure Ubuntu system settings in the interface shown below.

<img src="../_static/media/chapter_2/section_4/image7.png" class="common_img" />

8. Click the power button in the top right corner of the desktop and proceed as shown below.

<img src="../_static/media/chapter_2/section_4/image8.png" style="display: block;margin: 0 auto 24px;width:500px" />

<img src="../_static/media/chapter_2/section_4/image9.png" style="display: block;margin: 0 auto 24px;width:500px" />

10. Press the "**win**" key on the keyboard and move the cursor to the far right.

<img src="../_static/media/chapter_2/section_4/image10.png" class="common_img" />

11. Click the position highlighted in the yellow box below.

<img src="../_static/media/chapter_2/section_4/image11.png" class="common_img" />

12. The system switches to a new workspace.

<img src="../_static/media/chapter_2/section_4/image12.png" class="common_img" />

13. Click the folder icon on the right to open the file manager as shown below.

<img src="../_static/media/chapter_2/section_4/image13.png" class="common_img" />

14. Right click the empty space inside the red box.

<img src="../_static/media/chapter_2/section_4/image14.png" class="common_img" />

15. Click "**New Folder**".

<img src="../_static/media/chapter_2/section_4/image15.png" class="common_img" />

16. Type the folder name inside the red box using "**test**" as an example and click Create in the upper right corner.

<img src="../_static/media/chapter_2/section_4/image16.png" style="display: block;margin: 0 auto 24px;width:500px" />

17. After creating the folder, the new folder displays as shown below.

<img src="../_static/media/chapter_2/section_4/image17.png" class="common_img" />

18. Right click the "**test**" folder and click "**Copy**".

<img src="../_static/media/chapter_2/section_4/image18.png" class="common_img" />

19. Click "**Desktop**".

<img src="../_static/media/chapter_2/section_4/image19.png" class="common_img" />

20. Right click an empty space and select "**Paste**" from the menu.

<img src="../_static/media/chapter_2/section_4/image20.png" class="common_img" />

21. The appearance of the "**test**" folder on Desktop confirms successful copying.

<img src="../_static/media/chapter_2/section_4/image21.png" class="common_img" />

22. Right click the "**test**" folder on Desktop and select "**Move to Trash**" to remove it. All other file management operations follow standard conventions similar to Windows.

<img src="../_static/media/chapter_2/section_4/image22.png" style="display: block;margin: 0 auto 24px;width:400px" />

### 2.5.2 Terminal Interface

Terminal is the console of Linux, and completing the daily task is relied on the communication between various kinds and the kernel. 

The terminal receives input by the user on keyboard and sends the input to the host system, and then the host system processes the user input and returns the result to the terminal.

(1) And we can press “**Ctrl+Alt+T**”, or click “![img](file:///C:\Users\ADMINI~1\AppData\Local\Temp\ksohtml17632\wps2.jpg)” at the bottom left corner and click “***\*Terminal\****” to open the terminal.

<img src="../_static/media/chapter_2/section_4/image23.png" class="common_img" />

<img src="../_static/media/chapter_2/section_4/image24.png" class="common_img" />

(2) Click “**Edit**” and select “**Preference**”. Then we can change the style, font, etc., at the right side.

<img src="../_static/media/chapter_2/section_4/image25.png" class="common_img" />

(3) After entering the terminal interface, you will find the command prompt, such as [hiwonder@ubuntu~]#

And hiwonder is the current user name.

①　@：separator

②　Ubuntu：Current host name

③　~：The name of directory the user is currently in. “***\*~\****” represents home directory. 

④　#：user identity prompt. # represents super client, that is administrator. $ represents normal user.  



## 2.6 Linux Directory Introduction 

System directory refers to the directory where the major files of the operating system are stored. The files in the directory has direct influence on the normal function of the system. Therefore, having a basic understanding of these directories will facilitate your usage. 

### 2.6.1 Open System Directory 

Input “***cd ..***” twice and “**ls**” once in sequence in virtual machine. Note: there is space between “**cd***” and “**..**” , and press **Enter** whenever you finishing inputting.

<img src="../_static/media/chapter_2/section_5/image1.png" class="common_img" />

System directory of Linux refers to the following folders in red frame. Linux’s operating system is completely built upon files and file system. Any information is stored in the form of file and defined by file name and storing path.

Linux’s directory is in the form of dendrogram, and “/” represents the root, which is also considered as root directory.

<img src="../_static/media/chapter_2/section_5/image2.png" class="common_img" />

### 2.6.2 Check System Directory 

We can check the system directory on Linux through command. For clear demonstration and better understanding, check the system directory in the form of dendrogram. 

Input “**sudo apt-get install tree**” command and install the software package. 

<img src="../_static/media/chapter_2/section_5/image3.png" class="common_img" />

**Note**：if the message below is threw, the installation ends in failure.

<img src="../_static/media/chapter_2/section_5/image4.png" class="common_img" />

Input command “**sudo apt-get update**” to update the source.

```bash
sudo apt-get update
```

<img src="../_static/media/chapter_2/section_5/image5.png" class="common_img" />

After update, input command “**sudo apt-get install tree**” to install again. 

After installation, we can use tree related commands to check the directory.

tree：Display all files in the form of dendrogram.

tree -L N：All folders are displayed in the form of dendrogram, and Nth layer of the subfolders will be displayed. (There is a space between "**tree**" and "**-**", and between "**L**" and "**N**". N needs to be replaced by a specific number which indicates the layer of folder.)

3）Enter the "**tree -L 1**" command to display the subfolders to the first layer, as shown in the figure below. The Windows system also adopts dendrogram, but it takes disk as root partition. The C disk and D disk are equivalent to the first layer of subfolders. 

For Linux systems, "**/**" is equal to integrate disk which is divided into several partitions such as "**/etc**", "**/dev**", and "**/lib**".

<img src="../_static/media/chapter_2/section_5/image6.png" class="common_img" />

The function of each directory is listed below.

| Directory |                           Function                           |
| :-------: | :----------------------------------------------------------: |
|    bin    |              Store commonly used Linux commands              |
|   boot    |                 Store Linux’s startup file.                  |
|           |                Store Linux’s external device                 |
|    etc    | Store various configuration files and sub directories required by system management |
|   home    |                     Store home directory                     |
|    lib    |             Store dynamic link shared libraries.             |
|   media   | Provide conventional mount points for all removable devices. |
|    mnt    |               Mount point for temporary files.               |
|   proc    |          Store information about system resources.           |
|   root    |               Home directory of the root user.               |
|   sbin    | Store non-essential and unimportant system binary files and network application tools in the system. |
|    sys    |           Store kernel, firmware and system files.           |
|    tmp    |                    Store temporary files.                    |
|    usr    | Store user documents, games, graphics files, libraries, other user, management commands and files. |
|    var    |           Store the frequently modified directory.           |

## 2.7 Common Linux Command 

In previous tutorials, we have introduced some basic commands. For Linux novice, remembering mountains of Linux commands is a huge challenge . This chapter will explain some commonly used commands, which helps you to master it easily.

Table 1 Linux common-used command

|   Command   |        Full name        |                   Function                    |
| :---------: | :---------------------: | :-------------------------------------------: |
|     ls      |          List           |    List the files in the current directory    |
|     cd      |    Change Directory     |                  Change path                  |
|     pwd     | Print Working Directory |         Display the current directory         |
|    ping     | Packet Internet Groper  |         Test the internet connection          |
|  shutdown   |        Shut down        |                   Shut down                   |
|   reboot    |         Reboot          |                    Reboot                     |
|     cp      |          Copy           |                     Copy                      |
|     rm      |         Remove          |                    delete                     |
|    mkdir    |     Make directory      |                Create a folder                |
| man command |         Manual          |           Display the command info            |
|    echo     |          Echo           | Echo the input info to the terminal interface |
|    sudo     |      Superuser do       |    Execute commands as system administrato    |
|    clear    |          Clear          |          Delete the text on terminal          |
|    Find     |          Find           |                    Search                     |
|     mv      |          Move           |                 Rename or cut                 |
|    date     |          Date           |       Read the date/time of the system        |

**Note:** In Linux, it is strictly case-sensitive, so please strictly distinguish from lower case and upper case.

### 2.7.1 Linux Command Form 

Linux command is in the form of “**command+option+operation object**”. And for the command part, we need to input the command name, and the option defines the execution characteristics of the command, which involves two options, including long and short.

For example, long option uses the form of “**--** + **integrate word**”, like **--help**. And short option adopts the form of “**-** + **individual character**”, such as “**-a**”. Note: we can combine several short options, for example -h -l -a == -hla, however we can’t integrate the long options, like --help cannot be followed by other word. 

```bash
ls -l -a -h /boot/
```

Pay attention, command and option, option and option, option and operation object, as well as operation object and operation object must be separated by **Space**. /boot in the picture above refers to the operation object and there can be multiple operation objects. 

### 2.7.2 Practical Operation 

(1)  Start the virtual machine, and press “**Ctrl+Alt+T**”, or right click and select “**Open Terminal**” to enter the terminal interface.

<img src="../_static/media/chapter_2/section_6/image2.png" class="common_img" />

(2) Input the first command “**pwd**” which is used to print the current working directory, and then you will get the full path, like /home/hiwonder.

```bash
pwd
```

<img src="../_static/media/chapter_2/section_6/image3.png" class="common_img" />

(3) Next, input the command “**ls**” which is used to list files in the current working directory, and we can input “**ls -l**” and “**ls -a**” to obtain the file permission, modify the date, etc.

```bash
ls
```

<img src="../_static/media/chapter_2/section_6/image4.png" class="common_img" />

(4)Press “**PrtSC**” or “**PRTSCR**”, you can capture the current screen. The photos are stored under this path, **/home/Pictures** and you can click “<img src="../_static/media/chapter_2/section_6/image5.png" style="width:0.36528in;height:0.33056in" />“ (file manager) to find this path.

<img src="../_static/media/chapter_2/section_6/image6.png" class="common_img" />

(5) Then back to LX interface, and input “**cd**” command to switch to other folder. In step 3, all files in the current working directory are listed, therefore we need to input “**cd**” command to switch to “**/Pictures**” folder. 

:::{Note}
in Linux system, commands, file name or file path can be implemented by “***\*Tab\****” key.
:::

For example, when you want to switch to “/Pictures” directory, we can input “cd Pict” and press “Tab” key, and then the command will be automatically completed as "cd Pictures/". If there are no overlapping characters whenever you press "Tab" key, the complete file name will appear on the terminal. If there are overlapping name characters, all file named with these characters will show up.

```bash
cd Pictures/
```

(6) Now, we enter the directory where the screenshot is stored, and we can input “ls” command to check the files under this directory.

<img src="../_static/media/chapter_2/section_6/image8.png" style="width:5.76458in;height:0.79167in" />

(7)  In later project management, we can find the required project or file in this way.

### 2.7.3 Effective Way to Input Command 

**2.7.3.1 Help Command** 

(1)  We can input **‘command’ --help** to check the usage of some command. Take “**ls**” command for example.

(2)  Input"**ls --help**"，and the content in yellow frame is the usage of “**ls**” command. 

<img src="../_static/media/chapter_2/section_6/image9.png" class="common_img" />

(3)  For example, input “**ls -a**” in the terminal to check all files in the folder. 

<img src="../_static/media/chapter_2/section_6/image10.png" class="common_img" />

(4)  Input “**ls -al**” to view the property of all the files.

<img src="../_static/media/chapter_2/section_6/image11.png" class="common_img" />

**2.7.3.2 “man” Command** 

Input “**man**” command, we can view the reference manuals of a command. “**man**” is short for manuel. 

<img src="../_static/media/chapter_2/section_6/image12.png" class="common_img" />

(1) You can use the following shortcut keys to turn pages.

|     Function     | Shortcut |
| :--------------: | :------: |
|    Next page     |  SPACE   |
|    Last page     |    B     |
|    Next line     |  ENTER   |
|    Last line     |    K     |
| Back to terminal |    :Q    |

(2) In addition to the above commands and buttons, there are some special control buttons in the Linux system.

|  Key  |        Function        |
| :----: | :----------------: |
|   &uarr;   |      Command history      |
|  Tab   |      Complete command     |
| Ctrl+C |   Stop the running programming    |
| Ctrl+D |   Exit terminal interface    |
| Ctrl+A | Switch the pointer to the beginning of the line|
| Ctrl+X | Switch the pointer to the end of the line |

(3) If you want to check the meaning of “**cp**” command, we can input “**man cp**” command and press Enter. The content printed in “***\*NAME\****” area is its meaning. 

<img src="../_static/media/chapter_2/section_6/image14.png" class="common_img" />

(4) Move down, detailed instruction of “**cp**” command is listed in “**DESCRPTION**” area.

**2.7.3.3 Tab Key Complementation** 

(1) For example, we can input “**re**” and press “**Tab**” key. The terminal will list all the commands starting with “**re**”.

<img src="../_static/media/chapter_2/section_6/image16.png" class="common_img" />

(2) Input “**cd D**” and press “Tab” key. Then files starting with “**D**” under this path will appear.

```bash
cd D
```

<img src="../_static/media/chapter_2/section_6/image17.png" class="common_img" />

(3) When inputting the file name, press “**Tab**” key, the file name will be automatically complemented.

<img src="../_static/media/chapter_2/section_6/image18.png" class="common_img"/>

<img src="../_static/media/chapter_2/section_6/image19.png" class="common_img" />

## 2.8 Linux Permission 

In operating system, permissions are required to access the file, enter the directory and change the file.

In Linux, different users, including supper user (root) and normal user, have different permission. Super user can do anything on Linux almost without limitation, while normal user can only operate within permissions.

For example, in the same file, super user can edit it, while normal user can only read it without other operations.

### 2.8.1 Change User 

It is simple to change user through command. But we need to set a fixed password first, as root password is generated randomly whenever Ubuntu reboots by default.  

（1）Open command line terminal and input “**sudo passwd**” command. Then input the password and press Enter to set root password. Pay attention you are required to input the password twice. (**Note: the password you input will be hidden and you can just press Enter after inputting**)

<img src="../_static/media/chapter_2/section_7/image1.png" class="common_img" />

<img src="../_static/media/chapter_2/section_7/image2.png" class="common_img" />

（2）After setting root password, input “***\*su\****”, and then input the password currently set and press ***\*Enter\****. When ***\*$\**** at the end of the command changes to ***\*#\****, it means that the directory is switched to root directory. 

<img src="../_static/media/chapter_2/section_7/image3.png" class="common_img" />

### 2.8.2 File Permission 

Files can be written, read and executed. And files can be divided into three types by visitor：

① Owner：user of files

② Group：group files belong to

③ Other

Owner, group and other indicate roles, such as programmer, while root user and normal user refer to specific person, such as you. 

And each role has three permissions.

r：read

read permission grants the ability to read a file. When set for a directory, what is in the directory cannot be viewed.  

w：write

The write permission grants the ability to write data to the file. When set for a directory, the files in the directory cannot be deleted.

x：execute

The execute permission grants the ability to execute a file, which is inapplicable to non-executable file. When set for directory, we cannot enter the 

| Linux | Octal |            Explanation            |
| :---: | :---: | :-------------------------------: |
|  r--  |   4   |       Read permission only        |
|  -w-  |   2   |       Write permission only       |
|  --x  |   1   |      Execute permission only      |
|  r-x  |   5   |    Read and execute permission    |
|  rw-  |   6   |     Read and write permission     |
|  -wx  |   3   |   Write and execute permission    |
|  rwx  |   7   | Wire, read and execute permission |

### 2.8.3 Change Permission 

**chmod** command is used to change permission, which is divided into two ways. One is change the permission through number code, the other is change the permission through character code.

(1) Open the terminal interface, and input “**touch test.txt**” command to create txt file. 

<img src="../_static/media/chapter_2/section_7/image4.png" class="common_img" />

<img src="../_static/media/chapter_2/section_7/image5.png" class="common_img" />

As the picture shown above, the owners of the files are granted with read and write permission, while group and other users only have read permission. 

(2) For example, we can grant execute permission to group and other users. Input “**chmod 777 test.txt**” command. 

<img src="../_static/media/chapter_2/section_7/image6.png" class="common_img" />

(3) Next, input “**ls -al**” again to check whether the permission is changed.

<img src="../_static/media/chapter_2/section_7/image7.png" class="common_img" />

All permissions of these three roles can be changed through number code for one time. For changing permission through character code, please check the operations below.

Compared with number code, it is more flexible to change permission through character code. We can set individual permission for one role, for example enter command “**touch test_1.txt**” to create a txt file named **test_1** 

<img src="../_static/media/chapter_2/section_7/image8.png" class="common_img" />

(4) Next, input “***\*ls -al\****” command to view the file permission. 

<img src="../_static/media/chapter_2/section_7/image9.png" class="common_img" />

(5) Take granting execute permission to owner, group and other users separately for example.

The commands are as follow.

```bash
chmod u+x test_1.txt

chmod g+x test_1.txt

chmod o+x test_1.txt
```

(6) As the same, we can modify x(execute) as r (read) or w(write) to set read or write permission.

<img src="../_static/media/chapter_2/section_7/image10.png" class="common_img" />

(7) After setting, input “**ls -al**” command to check the properties.

```py
ls -al
```



<img src="../_static/media/chapter_2/section_7/image11.png" class="common_img" />

(8) If you don’t want to set separately, for example, we can input “**chmod a+w test_1.txt**” command to set write permission for three roles. And “**a**” represents three roles. 

```py
chmod a+w test_1.txt
```



<img src="../_static/media/chapter_2/section_7/image12.png" class="common_img" />

(9) Next, input “**ls -al**” command to check the properties. 

<img src="../_static/media/chapter_2/section_7/image13.png" class="common_img" />

If want to remove the permission from visitor, we can change “**+**” as “**-**”. For example, remove the execute permission of other users.

(10) Input"**chmod o-x test_1.txt**"command.

```PY
chmod o-x test_1.txt
```

<img src="../_static/media/chapter_2/section_7/image14.png" class="common_img" />

(11) Then enter “ls -al” command to view the properties.

<img src="../_static/media/chapter_2/section_7/image15.png" class="common_img" />