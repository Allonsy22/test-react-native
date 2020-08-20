import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import colors from '../utils/colors';

const CIRCLE_WIDTH = 30;

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.circleOne = new Animated.Value(1);
        this.circleTwo = new Animated.Value(1);
        this.circleThree = new Animated.Value(1);
        this.delay = 100;
    };

    componentDidMount() {
        this.start();
    };

    start() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.circleOne, {
                    toValue: 1.3,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(this.circleOne, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    render() {
        return (
            <View style={[styles.container]}>
                <Animated.View
                    style={[
                        styles.circle,
                        { transform: [{ scale: this.circleOne }] }
                    ]}
                />
                <Animated.View
                    style={[
                        styles.circle,
                        { transform: [{ scale: this.circleOne }] }
                    ]}
                />
                <Animated.View
                    style={[
                        styles.circle,
                        { transform: [{ scale: this.circleOne }] }
                    ]}
                />
            </View>
        );
    }
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
