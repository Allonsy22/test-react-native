import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    Dimensions,
} from 'react-native';
import { Accelerometer } from 'expo-sensors';

const { width, height } = Dimensions.get('window');
const BALL_SIZE = width * .3;

export default class AccelerometerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.translateX = new Animated.Value(0);
        this.translateY = new Animated.Value(0);
    };

    state = {
        data: [],
        translateX: 10,
    };

    componentDidMount() {
        this.toggle();
    };

    componentWillUnmount() {
        this.unsubscribe();
    };

    toggle = () => {
        if (this._subscription) {
            this.unsubscribe();
        } else {
            this.subscribe();
        }
    };

    slow = () => {
        Accelerometer.setUpdateInterval(200);
    };

    fast = () => {
        Accelerometer.setUpdateInterval(16);
    };

    subscribe = () => {
        this._subscription = Accelerometer.addListener(accelerometerData => {
            this.setState({data: accelerometerData});
            Animated.parallel([
                Animated.spring(this.translateX, {
                    toValue: -round(accelerometerData.x),
                    useNativeDriver: true,
                }),
                Animated.spring(this.translateY, {
                    toValue: round(accelerometerData.y),
                    useNativeDriver: true,
                }),
            ]).start();
        });
    };

    unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        const { data: { x, y, z}, translateX } = this.state;
        return (
            <View style={styles.sensor}>
                <Text style={styles.text}>Accelerometer: (in Gs where 1 G = 9.81 m s^-2)</Text>
                <Text style={styles.text}>
                    x: {round(x)} y: {round(y)} z: {round(z)}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.toggle} style={styles.button}>
                        <Text>Toggle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.slow} style={[styles.button, styles.middleButton]}>
                        <Text>Slow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.fast} style={styles.button}>
                        <Text>Fast</Text>
                    </TouchableOpacity>
                </View>
                <Animated.View
                    style={[
                        styles.ball,
                        { transform: [{ translateX: this.translateX, translateY: this.translateY }] }
                    ]}
                />
            </View>
        );
    }
}

function round(n) {
    if (!n) {
        return 0;
    }

    return 1000 * Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
    },
    sensor: {
        marginTop: 45,
        paddingHorizontal: 10,
    },
    text: {
        textAlign: 'center',
    },
    ball: {
        position: 'absolute',
        width: BALL_SIZE,
        height: BALL_SIZE,
        borderRadius: BALL_SIZE / 2,
        backgroundColor: 'blue',
    },
});
