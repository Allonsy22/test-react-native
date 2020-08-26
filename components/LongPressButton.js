import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default class LongPressButton extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    delayLongPress={500}
                    onLongPress={() => console.log("long")}
                >
                    <Text>LongPressButton</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});
