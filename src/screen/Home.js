import React, { Component } from 'react'
import { Container, Button, Text, View, Content } from 'native-base';

export default class Home extends Component {

    gotoScreen(navigation, destination) {
        navigation.navigate(destination)
    }

    render() {
        const { navigation } = this.props
        return (
            <Container style={{ margin: 10 }}>
                <Content>
                    <View style={{ margin: 10 }}>
                        <Button block
                            onPress={() => this.gotoScreen(navigation, 'RealTimeDatabase')}>
                            <Text>FireBase</Text>
                        </Button>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button block
                            onPress={() => this.gotoScreen(navigation, 'RestauranList')}>
                            <Text>Api and Maps</Text>
                        </Button>
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button block
                            onPress={() => this.gotoScreen(navigation, 'CameraScreen')}>
                            <Text>Camera</Text>
                        </Button>
                    </View>
                </Content>

            </Container>

        )
    }
}
