import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { firebase } from '@react-native-firebase/database';
import { useFocusEffect } from '@react-navigation/native';

export default function ViewScreen ({navigation}) {
    const [items, setItems] = React.useState([]);

    useFocusEffect(
        React.useCallback(() => {
            setItems([]);
            handleDataOnPageLoad();
        }, [])
    )

    const handleDataOnPageLoad = async () => {
        const database = firebase.app().database("https://hibprog4-default-rtdb.europe-west1.firebasedatabase.app/");
        database.ref("scans").once("value", (snapshot) => {
            snapshot.forEach((child) => {
                if (child.val() === null) {
                    return;
                }
                setItems(oldItems => [...oldItems, 
                    {
                        itemId: child.val().itemId,
                        description: child.val().description,
                    } 
                ])
            })
        })
    }

    return (
        <View style = {styles.container}>
            <ScrollView>
                <View style = {{marginBottom: 20}}/>
                {items.map((element, index) => 
                    <View key = {index}>
                        <View style = {styles.adBox}>
                            <Text style = {styles.boxTitle}>{element.description}</Text>
                        </View>
                        <TouchableOpacity style = {styles.button} onPress = {() => navigation.navigate("Edit Item", {
                            description: element.description, itemId: element.itemId
                        })}>
                            <Text style = {styles.buttonText}>Edit Content</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
    </View>
    )
}

let screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2196f3',
    },
    adBox: {
        width: screenWidth - 30,
        flexBasis: "auto",
        backgroundColor: "#fff",
        marginTop: 10,
        margin: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        padding: 15,
        elevation: 1,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "400",
        opacity: 0.7,
    },
    boxTitle: {
        fontSize: 18,
    },
    button: {
        flex: 1,
        justifyContent: "center",
        height: 50,
        width: screenWidth - 30,
        alignSelf: "center",
        backgroundColor: "#fff",
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        elevation: 1,
        bottom: 11,
    },
})