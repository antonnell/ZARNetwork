# ZARNetwork App

## File Structure

```
ZARNetwork/
  |--android/                                  //-- android os specfic files
  |--assets/                                   //-- Contains fonts
  |--ios/                                      //-- ios specfic files
  |--src/                                      //-- Wrapper for app components
  |  |--common/                                //-- All app common functionality
  |  |  |--Button/                             //-- Generic component for button
  |  |  |--constants                           //-- Constants
  |  |  |--detailCard/                         //-- Component for rendering card
  |  |  |--FloatLabelTextField/                //-- Component for rendering textinput
  |  |  |--ListCard/                           //-- Component for rendering List
  |  |  |--Loader/                             //-- Component for rendering Loader View
  |  |  |--PinCode/                            //-- Component for secret pin generation
  |  |  |--profileInfo/                        //-- Component for user profile information
  |  |  |--QRScanner/                          //-- Component for QRScanner View
  |  |  |--titleCard/                          //-- Component for rendering title of cards
  |  |  |--TitleHeader/                        //-- Component for rendering header of screen
  |  |  |--TitleText/                          //-- Component for rendering title text of cards
  |  |  |--ToggleButton/                       //-- Component for rendering toggle button
  |  |  |--ToggleCard/                         //-- Component for rendering toggle View
  |  |--controllers/                           //-- Contains redux and api calls
  |  |  |--api/                                //-- Contains api call functions with encryption layer
  |  |  |--config.js                           //-- Contains api endpoint configuration
  |  |  |--redux/                              //-- All redux configuration for app
  |  |  |  |--auth/                            //-- Action and reducers for login and register api for user authentication detail
  |  |  |  |--base/                            //-- Contain action for api calls and other constant settings
  |  |  |  |--errorHandler/                    //-- Reducers for handling error status of api's
  |  |  |  |--index                            //-- Root reducer file
  |  |  |  |--paymentRequest/                  //-- Action and reducers for payment request api detail
  |  |  |  |--statusType/                      //-- Action and reducers for status type of request api detail
  |  |  |  |--types/                           //-- Action and reducers for supported wallet types api detail
  |  |  |  |--userBeneficiary/                 //-- Action and reducers for beneficiary of account wallet api detail
  |  |  |  |--userTransaction/                 //-- Action and reducers for transaction of account wallet api detail
  |  |  |  |--userWallet/                      //-- Action and reducers for user's account wallet api detail
  |  |  |--utility/                            //-- Component for encryption and decryption modules
  |  |--images/                                //-- All app images
  |  |--Screens/                               //-- Application logic with screens (all the components)
  |  |  |  |--createPin/                       //-- Component for create secret pin functionality
  |  |  |  |--createWallet/                    //-- Component for create new wallet account pin functionality
  |  |  |  |--homePage/                        //-- Component for home screen functionality
  |  |  |  |--login/                           //-- Component for login screen functionality
  |  |  |  |--pay/                             //-- Component for payment screen functionality
  |  |  |  |--paymentNotification/             //-- Component for payment notification setting screen functionality
  |  |  |  |--phoneVerify/                     //-- Component for mobile number verification screen functionality
  |  |  |  |--register/                        //-- Component for register screen functionality
  |  |  |  |--registrationSuccess/             //-- Component for successful registeration screen functionality
  |  |  |  |--startScreen/                     //-- Component for initial screen functionality
  |  |  |  |--tabBar/                          //-- Component for rendering tab view for app screens functionality
  |  |--store/                                 //-- Redux store configuration
  |  |--Screens/                               //-- Application logic (all the components)
  |  |--utility/                               //-- Component for common modules
  |--index.js                                  //-- Initialization of app
  |--router.js                                 //-- Routing of app using react-navigation
```

## Getting Started

These instructions will help you in running the project on your local machine for development and testing purposes.

## Installation

You will need Node.js, Watchman, the React Native command line interface, and Xcode on your Mac machine.

### Node, Watchman

We recommend installing Node and Watchman using [Homebrew](http://brew.sh/). Run the following commands in a Terminal after installing Homebrew:

```
$brew install node
$brew install watchman
```

### The React Native CLI

Node.js comes with npm, which lets you install the React Native command line interface.

Run the following command in a Terminal:

```
$npm install -g react-native-cli
```

If you get an error like Cannot find module ‘npmlog’, try installing npm directly: curl -0 -L http://npmjs.org/install.sh | sudo sh.

## iOS SETUP

## Xcode

The easiest way to install Xcode is via the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12). Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

- Testing your React Native Installation
  Use the React Native command line interface to generate a new React Native project called “ZARNetwork”, then run react-native run-ios inside the newly created folder.

```
$react-native init ZARNetwork
$cd ZARNetwork
$react-native run-ios
```

      Or

```
Run from Xcode Directly
Open the .xcodeproj file from projectFolder/ios
Xcode => click on run button
ShortCut :- Command+R
```

You should see your new app running in the iOS Simulator shortly.

- ZARNetwork Setup

```
git clone {Repository_url}
  eg:- https://github.com/antonnell/ZARNetwork.git
cd ZARNetwork
```

Run the following command

```
npm install
react-native link
```

Run on iOS

```
react-native run-ios
```

     OR

```
You can directly run the project using Xcode as steps mentioned above.
```

## Android Setup

1. Download and install Android Studio
   [Android Studio](https://developer.android.com/studio/install.html) provides the Android SDK and AVD (emulator) required to run and test your React Native apps. \* Android Studio requires the [Java SE Development Kit(JDK)](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html), version 8. You can type javac -version in a terminal to see what version you have, if any.
    Run the following Commands
   ```
   $javac -version
   javac 1.8.0_111
   ```
2. Install the AVD and HAXM

Choose Custom installation when running Android Studio for the first time. Make sure the boxes next to all of the following are checked:

```
• Android SDK
• Android SDK Platform
• Performance (Intel ® HAXM)
• Android Virtual Device
• Then, click "Next" to install all of these components.
```

If you’ve already installed Android Studio before, you can still [install HAXM](https://software.intel.com/en-us/android/articles/installation-instructions-for-intel-hardware-accelerated-execution-manager-windows) without performing a custom installation.

3. Install the Android 6.0 (Marshmallow) SDK

Android Studio installs the most recent Android SDK by default. React Native, however, requires the Android 6.0 (Marshmallow) SDK. To install it, launch the SDK Manager, click on “Configure” in the “Welcome to Android Studio” screen.

4. Run on Android

```
react-native run-android
```

or
• You can directly run the project using using android studio.
Open Android studio and select the “android” folder from ProjectFolder/android.
Shortcut:- ctrl+r

## Running on Device

To run the app on device, please follow instructions [here](https://facebook.github.io/react-native/docs/0.56/running-on-device).
