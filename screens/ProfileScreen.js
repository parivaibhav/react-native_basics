import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Switch, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';


export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    const storedUsername = await AsyncStorage.getItem('username');
    const storedPassword = await AsyncStorage.getItem('password');
    const storedPhoto = await AsyncStorage.getItem('profilePhoto');
    const storedTheme = await AsyncStorage.getItem('darkTheme');

    if (storedUsername) setUsername(storedUsername);
    if (storedPassword) setPassword(storedPassword);
    if (storedPhoto) setProfilePhoto(storedPhoto);
    if (storedTheme !== null) setDarkTheme(JSON.parse(storedTheme));
  };

  const saveProfileData = async () => {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('password', password);
    if (profilePhoto) await AsyncStorage.setItem('profilePhoto', profilePhoto);
    await AsyncStorage.setItem('darkTheme', JSON.stringify(darkTheme));
    Alert.alert('Profile Saved!');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePhoto(result.assets[0].uri);
    }
  };

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    Alert.alert('Logged Out', 'All user data has been cleared.');
    navigation.navigate('Home'); // Redirect to HomeScreen after logout
  };

  return (
    <View style={[styles.container, darkTheme && styles.darkContainer]}>
      <TouchableOpacity onPress={pickImage}>
        {profilePhoto ? (
          <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imageText}>Pick Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Dark Theme:</Text>
        <Switch value={darkTheme} onValueChange={toggleTheme} />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveProfileData}>
        <Text style={styles.saveButtonText}>Save Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
  darkContainer: { backgroundColor: '#333' },
  label: { fontSize: 28, fontWeight: 'bold', marginTop: 10, color: '#000' },
  input: { borderWidth: 1, padding: 10, width: '100%', marginTop: 5, borderRadius: 5 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  imagePlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  imageText: { color: '#666' },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  saveButton: { backgroundColor: 'blue', padding: 10, borderRadius: 5, marginTop: 20, width: '100%' },
  saveButtonText: { color: 'white', textAlign: 'center', fontSize: 16 },
  logoutButton: { backgroundColor: 'red', padding: 10, borderRadius: 5, marginTop: 10, width: '100%' },
  logoutButtonText: { color: 'white', textAlign: 'center', fontSize: 16 },
});

