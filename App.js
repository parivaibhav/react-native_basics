import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, TextInput, SafeAreaView, View, StyleSheet, Image, Button, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  // You can use Ionicons from Expo for icons
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

// Home screen component
function HomeScreen() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <Image source={require('./assets/download.png')} style={styles.imgLogo} />
      {/* <Text style={styles.label}>Enter Text:</Text> */}
      <View style={styles.inputBxs}>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Username"
          value={text}
          onChangeText={setText}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          secureTextEntry={true}
        // value={text}
        // onChangeText={setText}
        />
        <Button title='Login'
          onPress={() => Alert.alert("Login SucessFully")} color="#000" style={{fontSize:15,FontFace:"Poppins"}} />
      </View>

    </View>
  );
}

// Search screen component
function SearchScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Search Screen</Text>
      </View>
    </SafeAreaView>
  );
}

// Profile screen component
function ProfileScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
}

// Create the bottom tab navigator
const Tab = createBottomTabNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Set icon based on the screen name
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // Return icon
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    display: 'flex',
    // gap: 5,
    alignContent: 'space-around',
    justifyContent: 'space-around',
    fontFamily: 'Poppins Regular'
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  output: {
    marginTop: 10,
    fontSize: 16,
  },
  imgLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  inputBxs: {
    display: 'flex',
    gap: 10,
    alignContent: 'space-around',
    justifyContent: 'space-around'
  },
  btn: {
    width: 100,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'blue',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10
  }
});