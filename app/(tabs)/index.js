import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from './firebase'; // Ensure this is set up correctly

export default function Index({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe(); 
    }, []);

    async function userLogin() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Failed to login, please try again', error);
        }
    }

    async function userSignup() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Failed to create account, please try again', error);
        }
    }

    async function userSignOut() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('There was an error signing you out, please try again', error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>Welcome to Distance</Text>
            {!user ? (
                <>
                    <TextInput style={styles.userInput} onChangeText={setEmail} value={email} placeholder="Enter your email" keyboardType="email-address" autoCapitalize="none" />
                    <TextInput style={styles.userInput} onChangeText={setPassword} value={password} placeholder="Enter your password" secureTextEntry={true} />
                    <Button title="Log In" onPress={userLogin} />
                    <Button title="Sign Up" onPress={userSignup} />
                </>
            ) : (
                <>
                    <Text>Hello, {user.email}</Text>
                    <Button title="Go to Map" onPress={() => navigation.navigate('map')} />
                    <Button title="Sign Out" onPress={userSignOut} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    userInput: {
        width: '100%',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
    },
});
