import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';  // Example font
import { Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function HomeScreen() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    // Load fonts
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Poppins_400Regular,
        Poppins_700Bold,
    });

    // Wait for fonts to load before rendering the component
    if (!fontsLoaded) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    };

    const addTask = async () => {
        if (task.trim()) {
            const newTasks = [...tasks, task];
            setTasks(newTasks);
            setTask('');
            await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
        }
    };

    const removeTask = async (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    const editTask = async (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setTask(tasks[index]);
        await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notes</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a task..."
                value={task}
                onChangeText={setTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
            <FlatList
                data={tasks}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.taskContainer}>
                        <Text style={styles.taskText}>{item}</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity onPress={() => removeTask(index)}>
                                <Text style={styles.removeButton}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => editTask(index)}>
                                <Text style={styles.editButton}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        fontFamily: 'Inter_600SemiBold'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Inter_600SemiBold'
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        fontFamily: 'Inter_400Regular'
    },
    addButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5
    },
    addButtonText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'Poppins_700Bold'
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10, paddingTop: 10, paddingBottom: 20
    },
    taskText: {
        fontSize: 16,
        fontFamily: 'Inter_400Regular'

    },
    removeButton: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5

    },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10

    },
    editButton: {
        fontSize: 18,
        color: '#fff',
        backgroundColor: 'green',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5

    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },  // Style for the loading indicator
});
