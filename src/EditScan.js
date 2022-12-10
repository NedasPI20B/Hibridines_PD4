import React from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/database';


export default function EditScan({navigation, route}) {  
    const [description, setDescription] = React.useState("");

    useFocusEffect(
        React.useCallback(() => {
            setDescription(route.params.description);
        }, [])
    )

    const handleDataRemoval = async() => {
        const database = firebase.app().database("https://hibprog4-default-rtdb.europe-west1.firebasedatabase.app/");
        await database.ref("scans/" + route.params.itemId).remove();
        alert("Scan Successfully Removed!");
        navigation.navigate("View Screen");
    }

    const handleDataUpdate = () => {
        const database = firebase.app().database("https://hibprog4-default-rtdb.europe-west1.firebasedatabase.app/");
        database.ref("scans/" + route.params.itemId).update({
            description: description,
        }).then(() => 
            alert("Scan Successfully Updated!"),
            navigation.navigate("View Screen"),
        )
    }

    return (
        <View style = {styles.container}>
            <ScrollView contentContainerStyle = {{ paddingTop: 50, paddingHorizontal: 20 }}>
                <TextInput style = {styles.inputBox} placeholder = "Advertisement Description" onChangeText = {setDescription} value = {description} multiline = {true}/>
                <View style = {{paddingBottom: 15}}/>
                <TouchableOpacity style = {styles.button} onPress = {() => handleDataUpdate()}>
                    <Text style = {styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
                <View style = {{paddingTop: 20}}/>
                <TouchableOpacity style = {[styles.button, {backgroundColor: "#ff4d4d"}]} onPress = {() => handleDataRemoval()}>
                    <Text style = {[styles.buttonText, {color: "#fff"}, {fontWeight: "700"}]}>Remove Scan</Text>
                </TouchableOpacity>
                <View style = {{paddingTop: 480}}/>
            </ScrollView>
        </View>
    );
}

let screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2196f3",
    },
    button: {
        flex: 1,
        justifyContent: "center",
        height: 50,
        width: screenWidth - 40,
        alignSelf: "center",
        backgroundColor: "#fff",
        elevation: 2,
        borderRadius: 12,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 18,
    },
    inputBox: {
        flexBasis: "auto",
        marginBottom: 20,
        marginTop: -10,
        padding: 15,
        fontSize: 18,
        backgroundColor: 'white',
        borderRadius: 12,
        elevation: 2,
    },
    deleteButton: {
        position: "absolute",
        right: 0,
        opacity: 0.75,
        color: "#ff4d4d",
    },
})