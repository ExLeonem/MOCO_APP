# Client
The relevant folders inside the client directory are `/components`
as well as `/store`. Former includes the react-native components as well as the navigation. The latter is used be redux and redux-saga to manage application state.

Inside `/icons` the used svg images are located. The folders `/android` as well as `/ios` includes platform specific settings. As we only used and added configurations to android specific files the ios version of this application will most likely not work, but will if the needed configuration is added.


## React-Native
The react-native components are located inside the `/components` directory. At the root level the files `colors.js` and `fonts.js` are used to store globally used colors and font-sizes for the components.
Following the directories as well as their contents are described.

1. `/general` - most basic building block of the app.
2. `/schedule` and `/device` - include intermediate parts.
3. `/screen` - fully assembled screens as well as subnavigations in `navigation.js` files
4. `/navigation` - main navigation of the application

The components inside these folder call upon the state by using the following method which maps the available actions and state to the component properties.
```javascript
connect(mapStateToProps, mapDispatchToProps)
```

## Redux /- Saga
Inside the `/store` directory, redux as well as redux-saga specific code is located. At the root level of this directory the file `constants.js` includes constants that are used througout the subfolders. The `index.js` file containts the store and redux-saga definition.

1. `/action` - includes the defined actions that can be triggered by components.
2. `/reducers` - includes the redux reducers which are triggered by dispatched actions on state and describe the transformation of old to new state. The `index.js` contains the aggregation of all other reducers inside this directory.
3. `/sagas` - includes sagas used by redux-saga. These describe side-effects that are triggered by listening on dispatched actions. The `index.js` inside this folder aggregates the remaining sagas as well. 

## Building the android apk

1. Before building the project we first need to get the npm packages. Navigate into `/client` and execute the below command.
```
    npm install
```

2. After everything is in place. We need to actually build the apk. Therefore execute following command in the `/client/android` directory.
```
./gradlew assembleRelease
```

3. After the build successfully finishes a new folder
should will appear named `android/app/build` inside the subfolder `/android/app/build/outputs/apk/release` the fully assembled release will be located with the name *app-release.apk* .


## Using the app

The *.apk file now needs to be moved to an android phone. Trying
to open it will trigger the installation process.

*If the installation process doesen't start you most likly need to
enable the installation from unknown sources on your phone first.*
