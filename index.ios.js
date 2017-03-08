
import React, {Component} from 'react';
import {
    Alert,
    AppRegistry,
    StyleSheet,
    Text,
    ListView,
    View
} from 'react-native';

import axios from 'axios';
import striptags from 'striptags';

class Quote extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <Text>
                <Text style={styles.quoteTitle}>{this.props.title}</Text>{"\n"}
                <Text style={styles.quoteText}>{striptags(this.props.text)}</Text>
            </Text>
        );
    }
}


class QuoteList extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const self = this;

        axios.get('http://91.216.75.118:8084/api/quotes/?user_id=4')
            .then(function (response) {
                var data = response.data;
                self.setState({
                    dataSource: ds.cloneWithRows(data.results),
                });
            })
            .catch(function (error) {
                console.log(error);
            });


        this.state = {
            dataSource: ds.cloneWithRows(['']),
        };
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={function(rowData) {
                    return (
                        <View style={styles.quote}>
                            <Quote  title={rowData.title} text={rowData.text}/>
                        </View>
                    )
                }
                }
            />
        );
    }
}

export default class MyQuotes extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to MyQuotes!
                </Text>
                <QuoteList/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
    },
    quote: {
        margin: 10,
    },
    quoteTitle: {
        fontSize: 20,
        flex: 1,
        textAlign: 'center',
    },
    quoteText: {}
});

AppRegistry.registerComponent('MyQuotes', () => MyQuotes);
