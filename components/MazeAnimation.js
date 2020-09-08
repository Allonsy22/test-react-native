import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const STICK_CONTAINER_WIDTH = width * .1;
const DURATION = 1000;
const DIAGONAL = 2 + Math.sqrt((Math.pow(STICK_CONTAINER_WIDTH, 2)) + (Math.pow(STICK_CONTAINER_WIDTH, 2)));
const DELAY = 500;
const COUNT_SQUARE = 100 + Math.round((width * height) / (Math.pow(STICK_CONTAINER_WIDTH, 2)));
const START_VALUE = 0;
const END_VALUE = 2;
const STEP = 0.5;

export default class MazeAnimation extends React.Component {
    constructor(props) {
        super(props);
        this.rotationValueFirst = new Animated.Value(0);
        this.rotationValueSecond = new Animated.Value(0);
    };

    componentDidMount() {
        this.startAnimation();
    };

    animateRotation({
        startValue = START_VALUE,
        endValue = END_VALUE,
        step = STEP
    } = {}) {
        const result = [];
        while (startValue <= endValue) {
            result.push(
                Animated.timing(this.rotationValueFirst, {
                    toValue: startValue,
                    duration: DURATION,
                    delay: DELAY,
                    useNativeDriver: true,
                }),
                Animated.timing(this.rotationValueSecond, {
                    toValue: startValue,
                    duration: DURATION,
                    delay: DELAY,
                    useNativeDriver: true,
                })
            );
            startValue += step;
        };
        return result;
    };

    startAnimation() {
        Animated.loop(
            Animated.sequence(
                this.animateRotation({
                    startValue: START_VALUE,
                    endValue: END_VALUE,
                    step: STEP
                })
            ),
        ).start();
    };

    getRotateValue(arrayOfRotateValue = []) {
        const length = arrayOfRotateValue.length;
        const index = Math.round(Math.random() * length);
        return arrayOfRotateValue[index];
    };

    getArrayOfRotateValue({
        startValue = START_VALUE,
        endValue = END_VALUE,
        step = STEP,
        posibleOutput = ['-45deg', '0deg', '45deg', '90deg', '-90deg'],
        count = 3,
    } = {}) {

        const inputRange = [];
        const outputRange = [];

        while (startValue <= endValue) {
            inputRange.push(startValue);
            outputRange.push(posibleOutput[Math.round(Math.random() * (posibleOutput.length - 1))])
            startValue += step;
        };
        //set last element of outputrange to be like first one
        // to prevent jumping between animation 
        outputRange[outputRange.length - 1] = outputRange[0];
        const result = [
            this.rotationValueFirst.interpolate({
                inputRange,
                outputRange
            }),
            this.rotationValueSecond.interpolate({
                inputRange,
                outputRange
            })
        ];

        return result[Math.round(Math.random() * (result.length - 1))];
    };

    renderSquare() {
        const arr = new Array(COUNT_SQUARE).fill('x');
        return arr.map((item, index) => {
            return (
                <Animated.View
                    style={[
                        styles.stickContainer,
                        {
                            transform: [{
                                rotate: this.getArrayOfRotateValue()
                            }]
                        }
                    ]}
                    key={index}
                >
                    <View style={styles.stick} />
                </Animated.View>
            )
        });
    };

    render() {
        return (
            <View style={styles.mainContainer}>
                {this.renderSquare()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        top: -15,
        left: -15,
        width: width * 1.2,
        height: height * 1.2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
        flexWrap: 'wrap',
    },
    stickContainer: {
        width: STICK_CONTAINER_WIDTH,
        height: STICK_CONTAINER_WIDTH,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stick: {
        width: DIAGONAL,
        height: STICK_CONTAINER_WIDTH * .1,
        backgroundColor: '#000000',
    }
});
