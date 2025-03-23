import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import SearchScreen from './screens/SearchScreen';
import { View, Text,useColorScheme,ActivityIndicator } from 'react-native';




const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



function SettingsScreen() {
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
          onPress={() => Alert.alert("Login SucessFul")} color="#000" style={styles.btn} />
      </View>

    </View>
  );
}



export default function App() {

  const colorScheme = useColorScheme(); 

  // Define dynamic colors for navigation
  const backgroundColor = colorScheme === 'dark' ? '#121212' : '#ffffff';
  const textColor = colorScheme === 'dark' ? '#ffffff' : '#000000';


  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Set icon based on the screen name
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          }
          else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          // Return icon
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
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
    fontFamily: 'Poppins_700Bold'
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
    borderRadius: 10,
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