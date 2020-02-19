import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label, Button, Text, View } from 'native-base'
import auth from '@react-native-firebase/auth';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            pw: '',
            isLogin: false
        }
    }

    register = async (email, password) => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
        } catch (e) {
            console.log('Ini error yaaa ' + e.message);
        }
    }

    signin = async (email, password) => {
        try {
            const result = await auth().signInWithEmailAndPassword(email, password)
            console.log(result.user.email)
            this.setState({
                user: result.user.email
            })
        } catch (e) {
            this.setState({
                result: e.message
            })
            console.log('Ini error yaaa ' + e.message);
        }
    }

    componentDidMount() {
        this.checkLogin();
    }

    componentWillUnmount() {
        this.setState({
            isLogin: false
        })
    }

    checkLogin = () => {
        try {
            auth().onAuthStateChanged((user) => {
                if (user) {
                    this.setState({
                        user: user.email,
                        isLogin: true
                    })
                    console.log('sudah login' + JSON.stringify(user))
                } else {
                    console.log('belum login')
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    logout = async () => {
        try {
            await auth().signOut()
            this.setState({
                isLogin: false
            })
        } catch (error) {
            console.log(e)
        }
    }

    tombolLogout = () => {
        const { navigation } = this.props
        if (this.state.isLogin) {
            return (
                <View>
                    <View style={{ marginTop: 20 }}>
                        <Button block
                            onPress={() => this.logout()}>
                            <Text> Logout </Text></Button>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button block
                            onPress={() => navigation.navigate('Home')}>
                            <Text> Maju </Text></Button>
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input
                                onChangeText={(user) => this.setState({ user })}
                                value={this.state.user} />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input
                                onChangeText={(pw) => this.setState({ pw })}
                                value={this.state.pw} />
                        </Item>
                    </Form>
                    <View style={{ marginTop: 20 }}>
                        <Button
                            onPress={() => this.signin(this.state.user, this.state.pw)}
                            block light><Text> Login </Text></Button>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button block
                            onPress={() => this.register(this.state.user, this.state.pw)}
                        ><Text> Register </Text></Button>
                    </View>
                </View>
            )
        }
    }

    render() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <Text style={{ margin: 10 }}>{this.state.user}</Text>
            ),
        })
        return (
            <Container style={{ margin: 10 }}>
                <Content>
                    {
                        this.tombolLogout()
                    }
                </Content>

            </Container>
        )
    }
}
