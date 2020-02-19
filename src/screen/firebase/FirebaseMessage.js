import React, { Component } from 'react'
import { Text, View } from 'react-native'
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification'

export default class FirebaseMessage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: ''
        }
    }

    getToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            console.log(fcmToken)
            this.setState({ token: fcmToken });
        } else {
            console.log('kosooong')
        }
    }

    render() {
        return (
            <View>
                <Text>{this.state.token}</Text>
            </View>
        )
    }

    componentDidMount() {
        this.getToken()
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token) {
                console.log("TOKEN:", token);
            },
            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                console.log("Oke Notification:", notification.message);
            },
        });
    }
}
