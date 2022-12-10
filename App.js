import React from 'react';
import { firebase } from '@react-native-firebase/database';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler } from 'react-native';
import ViewScreen from './src/ViewScreen';
import EditScan from './src/EditScan';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import Scan from './src/scan';

const Stack = createStackNavigator();

const App = () => {

  /*React.useEffect(() => {
      const databaseRef = firebase.app().database("https://hibprog4-default-rtdb.europe-west1.firebasedatabase.app/");
      let recordId = 0;
      databaseRef.ref("scans").once("value", (snapshot) => {
          recordId = snapshot.numChildren();
      }).then(() => {
          databaseRef.ref("scans/" + recordId).set({
              itemId: recordId,
              description: "test",
          })
      })

      alert("Scanned Content Saved!");
  },[]);*/
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Scan Screen" component = {Scan} options = {{  
          headerStyle: {
            backgroundColor: '#2196f3',
          },
          headerTitleStyle: {
            color: 'white'
          },
        }}/>
        <Stack.Screen name = "View Screen" component = {ViewScreen} options = {{
          headerStyle: {
            backgroundColor: '#2196f3',
          },
          headerTitleStyle: {
            color: 'white'
          },
        }}/>
        <Stack.Screen name = "Edit Item" component = {EditScan} options = {{
          headerStyle: {
            backgroundColor: '#2196f3',
          },
          headerTitleStyle: {
            color: 'white'
          },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
