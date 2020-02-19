import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        height: '100%',
    },
});

export default class Mapse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            initialPosition: 'unkown',
            lat: 0.0,
            long: 0.0
        }
    }

    // Untuk request permission dan posisi saat ini
    requestGeoPermission = async () => {
        try {

            await (PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'BasicReactNative',
                    'message': 'Need your location'
                }))

            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

            if (granted) {
                Geolocation.getCurrentPosition(position => {
                    const initialPosition = JSON.stringify(position)
                    const lat = JSON.stringify(position.coords.latitude)
                    const long = JSON.stringify(position.coords.longitude)
                    console.log(lat)
                    console.log(long)
                    this.setState({
                        initialPosition: initialPosition,
                        lat: lat,
                        long: long
                    })
                },
                    error => Alert.alert('Error', JSON.stringify(error)),
                    { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
                )
                console.log('You can use the Geo');
            } else {
                console.log('Geo permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        return (
            <View>
                <MapView
                    style={styles.map}
                    region={{
                        latitude: parseFloat(this.state.lat),
                        longitude: parseFloat(this.state.long),
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}>
                    <Marker coordinate={{
                        latitude: parseFloat(this.state.lat),
                        longitude: parseFloat(this.state.long)
                    }}
                        title="Rumah">
                    </Marker>
                </MapView>
            </View>
        )
    }

    componentDidMount() {
        console.log(this.props.route.params.lat)
        this.setState({
            lat: this.props.route.params.lat,
            long: this.props.route.params.long,
        })
    }
}
