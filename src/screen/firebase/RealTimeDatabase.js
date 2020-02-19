import React, { Component } from 'react'
import { Container, Form, Item, Label, Input, Button, Text, View, Content, Spinner } from 'native-base';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';

export default class RealTimeDatabase extends Component {

    constructor(props) {
        super(props)
        this.state = {
            nama: '',
            keluhan: '',
            isLoading: false
        }
    }

    saveData = () => {
        this.setState({ isLoading: true },
            async () => {
                // Get the users ID
                const uid = auth().currentUser.uid;

                // Create a reference
                const ref = database().ref(`/users/${uid}`);

                ref.push({
                    uid: uid,
                    name: this.state.nama,
                    keluhan: this.state.keluhan
                }).then((data) => {
                    // Success
                    console.log(data)
                    this.setState({
                        nama: '',
                        keluhan: '',
                        isLoading: false
                    })
                    Alert.alert('Berhasil jadi simpanan')
                }).catch((error) => {
                    console.log(error)
                })
            })
    }

    setUI = () => {
        if (this.state.isLoading) {
            return <Spinner color='blue' />
        } else {
            return <View>
                <Form>
                    <Item floatingLabel>
                        <Label>Nama</Label>
                        <Input
                            onChangeText={(nama) => this.setState({ nama })}
                            value={this.state.nama} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Keluhan</Label>
                        <Input
                            onChangeText={(keluhan) => this.setState({ keluhan })}
                            value={this.state.keluhan} />
                    </Item>
                </Form>
                <View style={{ marginTop: 20 }}>
                    <Button block
                        onPress={() => this.saveData()}>
                        <Text> Save </Text>
                    </Button>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button block
                        onPress={() => this.props.navigation.navigate('RealTimeDatabaseTable')}>
                        <Text> Goto Table </Text>
                    </Button>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button block
                        onPress={() => this.props.navigation.navigate('PushNotification')}>
                        <Text> Goto Psuh Notif </Text>
                    </Button>
                </View>
            </View>
        }
    }

    render() {
        return (
            <Container style={{ margin: 10 }}>
                <Content>
                    {
                        this.setUI()
                    }
                </Content>
            </Container>
        )
    }
}
