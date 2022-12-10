import React, { Component, Fragment } from 'react';
import { TouchableOpacity, Text, Linking, View, Image, ImageBackground, BackHandler } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { firebase } from '@react-native-firebase/database';
import styles from './scanStyle';

export default function Scan({navigation}) {
    const [canScan, setCanScan] = React.useState(false)
    const [scannedData, setScannedData] = React.useState("")

    const handleQRCodeScan = (type) => {
        setCanScan(type);
    }

    const handleQRCodeData = (data) => {
        setScannedData(data.data);
        setCanScan(false);
    }

    const handleDataUpload = async() => {
        const databaseRef = firebase.app().database("https://hibprog4-default-rtdb.europe-west1.firebasedatabase.app/");
        let recordId = 0;
        databaseRef.ref("scans").once("value", (snapshot) => {
            recordId = snapshot.numChildren();
        }).then(() => {
            databaseRef.ref("scans/" + recordId).set({
                itemId: recordId,
                description: scannedData,
            })
        })

        alert("Scanned Content Saved!");
    } 

    return (
            <View style={styles.scrollViewStyle}>
                <View style={styles.header}>
                    <Text style={styles.textTitle}>Scan QR Code</Text>
                </View>
                {!canScan && scannedData.length == 0 ? (
                    <View style={styles.cardView} >
                        <Image source={require('../assets/camera5.png')} style={{height: 80, width: 80}}></Image>
                        <Text numberOfLines={8} style={styles.descText}>Please move your camera {"\n"} over the QR Code</Text>
                        <TouchableOpacity onPress={() => handleQRCodeScan(true)} style={styles.buttonScan}>
                            <View style={styles.buttonWrapper}>
                                <Image source={require('../assets/qr-code.png')} style={{height: 36, width: 36}}></Image>
                                <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Scan QR Code</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : null}
                {scannedData.length !== 0 ? (
                    <View>
                        <View style={styles.cardView}>
                            <Text>Result : {scannedData}</Text>
                            <TouchableOpacity style = {styles.buttonScan} onPress = {() => handleDataUpload()}>
                                <View style={styles.buttonWrapper}>
                                    <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Click here to save data</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.buttonScan} onPress = {() => navigation.navigate('View Screen')}>
                                <View style={styles.buttonWrapper}>
                                    <Text style={{...styles.buttonTextStyle, color: '#2196f3'}}>Click to view all scans</Text>
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                        
                    </View>
                    
                ) : null}
                {canScan ? (
                    <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        onRead = {(e) => handleQRCodeData(e)}
                        topContent={
                            <Text style={styles.centerText}>
                                Please move your camera {"\n"} over the QR Code
                            </Text>
                        }
                        /*bottomContent={
                            <View>
                                <TouchableOpacity style={styles.buttonScan2} 
                                    onPress={() => this.scanner.reactivate()} 
                                    onLongPress={() => this.setState({ scan: false })}>
                                </TouchableOpacity>
                            </View>
                        }*/
                    />
                ) : null}
        </View>
    );
}