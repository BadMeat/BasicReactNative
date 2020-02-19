import React, { Component } from 'react'
import ApiService from './ApiService'
import { Spinner, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base'
import { Alert } from 'react-native'

export default class RestauranList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            datas: [],
            isLoading: false
        }
    }

    callApi = () => {
        this.setState({ isLoading: true },
            async () => {
                try {
                    const result = await ApiService.get('/search', {
                        params: {
                            limit: 20,
                            location: 'bali'
                        }
                    })
                    this.setState({
                        datas: result.data.businesses,
                        isLoading: false
                    })
                } catch (error) {
                    console.log(error)
                    Alert.alert('somethin wrong')
                }
            })

    }

    keyExtractor = (item, index) => index.toString()

    setUI = () => {
        if (this.state.isLoading) {
            return <Spinner color='blue' />
        }
        return <List
            keyExtractor={this.keyExtractor}
            dataArray={this.state .datas}
            renderRow={
                item => (
                    <ListItem avatar
                        onPress={() => this.props.navigation.navigate('Mapse', {
                            lat: item.coordinates.latitude,
                            long: item.coordinates.longitude
                        })}>
                        <Left>
                            <Thumbnail source={{ uri: item.image_url ? item.image_url : 'https://facebook.github.io/react-native/img/tiny_logo.png' }} />
                        </Left>
                        <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.alias}</Text>
                        </Body>
                        <Right>
                            <Text note>{item.coordinates.latitude}</Text>
                        </Right>
                    </ListItem>
                )
            }>

        </List>
    }

    render() {
        return (
            this.setUI()
        )
    }

    componentDidMount() {
        this.callApi()
    }
}
