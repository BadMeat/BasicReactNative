import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

const uiui = [{ "uid": "98367hdsjkd73", "name": "abang", "keluhan": "nakal" }, { "uid": "N5XVrJQinVbMFqB9gseWl0T1rA12", "name": "Bencoleng", "keluhan": "Keterangan" }, { "uid": "123asdasd213asda", "name": "wwww", "keluhan": "qqqqq" }]


export default class RealTimeDatabaseList extends Component {


    constructor(props) {
        super(props)

        this.state = {
            resultList: []
        }
    }

    getData = async () => {
        // const list = []
        const list = [{
            uid: '98367hdsjkd73',
            name: 'abang',
            keluhan: 'nakal'
        }]

        // Get the users ID
        const uid = auth().currentUser.uid;

        // Create a reference
        const ref = database().ref(`/users/${uid}`);

        // Fetch the data snapshot
        const snapshot = await ref.once('value');

        const r = snapshot.val()

        console.log("valukuuu brooo " + JSON.stringify(r))

        snapshot.forEach(data => {
            // const w = JSON.stringify(data);
            list.push(data)
        })

        // const e = Object.keys(list).map(function(key){
        //     return [Number(key), list[key]]
        // })

        console.log(list)

        list.push({
            uid: '123asdasd213asda',
            name: 'wwww',
            keluhan: 'qqqqq'
        })

        this.setState({
            resultList: list
        })

        console.log("Ini Resultku " + JSON.stringify(this.state.resultList))

    }

    ItemTable = (title) => {
        return (
            <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }

    keyExtractor = (item, index) => index.toString()

    setUI = () => {
        return <View>
            {
                this.state.resultList.map((item) => (
                    <Text>{item.name}</Text>
                ))
            }
        </View>
    }

    render() {
        return (
            // this.setUI()
            <View>
                <FlatList
                    data={this.state.resultList}
                    // data = {uiui}
                    renderItem={({ item }) => <Text>{item.name}</Text>}
                    // renderItem={({ item }) => console.log(item)}
                    keyExtractor={this.keyExtractor}
                />
            </View>
        )
    }

    async componentDidMount() {
        await this.getData()
    }
}
