import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import colors from '../utils/colors';

const CIRCLE_WIDTH = 20;

export default function Loading(props) {
    const circleOne = new Animated.Value(1);
    const circleTwo = new Animated.Value(1);
    const circleThree = new Animated.Value(1);

    const start = () => { 
        Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(circleOne, {
                        toValue: 1.3,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(circleTwo, {
                        toValue: 1.3,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(circleThree, {
                        toValue: 1.3,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(circleOne, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(circleTwo, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(circleThree, {
                        toValue: 1,
                        duration: 200,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start();
    };

    start();
    return (
        <View style={[styles.container]}>
            <Animated.View
                style={[
                    styles.circle,
                    { transform: [{ scale: circleOne }] }
                ]}
            />
            <Animated.View
                style={[
                    styles.circle,
                    { transform: [{ scale: circleTwo }] }
                ]}
            />
            <Animated.View
                style={[
                    styles.circle,
                    { transform: [{ scale: circleThree }] }
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bg,
    },
    circle: {
        width: CIRCLE_WIDTH,
        height: CIRCLE_WIDTH,
        borderRadius: CIRCLE_WIDTH / 2,
        backgroundColor: colors.primary2,
        margin: 10,
    }
});
