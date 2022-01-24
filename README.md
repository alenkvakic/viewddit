# viewddit

- a reddit gallery viewer for photos, gifs/webm and videos
- created with Ionic 6 and Angular 13
- supports single, double, triple (as seen in the screenshot) and 4-way view in a pinterest-like vertical view
- why? because I really wanted an app that supports a 3+ columns view 

![alt text](https://i.ibb.co/5K2VN0s/viewddit-screenshot.png)

### How to run on web:
- run in develope mode: `ionic serve`

### How to run on android:
- prerequisites: download and install Android Studio, and open it after the installation to not cause any errors with missing configurations
- build it first: `ionic build`
- then install with capacitor for android: `ionic cap add android`
- then open it in Android Studio: `ionic cap open android`
- enable developer mode on your Android phone (google it, might be different from phone to phone)
- connect your Android phone to your PC via USB 
- run the project inside Android Studio

### How to update:
- every time after you perform a build: `ionic cap copy`
- after making updates to the native portion of the app: `$ ionic cap sync`
- then open it in Android Studio: `ionic cap open android`
