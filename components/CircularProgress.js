import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { width, height } = Dimensions.get('window');
const SIZE = width - 230;
const OUTER_STROKE_WIDTH = SIZE * .1;
const INNER_STROKE_WIDTH = OUTER_STROKE_WIDTH * .05;
const RADIUS = (SIZE - OUTER_STROKE_WIDTH) / 2;
const CIRCUMREFERENCE = 2 * Math.PI * RADIUS;
const STROKE_DASHOFFSET = (2 * Math.PI * RADIUS) - 1; // -1 to avoid visual bug with zero value
const INNER_COLOR = "#1E1E1E";
const OUTER_COLOR = "#3F93E1";
const DURATION = 2 * 1000;

export default class CircularProgress extends React.Component {
    constructor(props) {
        super(props);
        const { strokeDashoffset = STROKE_DASHOFFSET } = this.props;
        this.strokeDashoffset = new Animated.Value(strokeDashoffset);
    };

    state = {
        completed: false,
        animationInProcess: false,
        initialAnimationState: true,
    };

    onPressButton() {
        const { duration = DURATION } = this.props;
        const { completed, animationInProcess } = this.state;
        if (animationInProcess) {
            this.cancelAnimation();
            this.setState({ animationInProcess: false });
            return;
        }
        this.setState({animationInProcess: true});
        Animated.timing(this.strokeDashoffset, {
            toValue: 0,
            duration,
            useNativeDriver: false,
        }).start(() => console.log("completed"));
    };

    cancelAnimation() {
        const { strokeDashoffset = STROKE_DASHOFFSET } = this.props;
        Animated.timing(this.strokeDashoffset, {
            toValue: strokeDashoffset,
            useNativeDriver: false,
        }).start();
    };

    render() {
        const {
            size = SIZE,
            outerStrokeWidth = OUTER_STROKE_WIDTH,
            innerStrokeWidth = INNER_STROKE_WIDTH,
            radius = RADIUS,
            circumreference = CIRCUMREFERENCE,
            innerColor = INNER_COLOR,
            outerColor = OUTER_COLOR,
        } = this.props;

        const { completed } = this.state;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => this.onPressButton()}
                >
                    <Svg height={size} width={size} style={{ transform: [{ rotate: "-90deg" }] }}>
                        <Circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke={innerColor}
                            strokeWidth={innerStrokeWidth}
                            fill="transparent"
                        />
                        <AnimatedCircle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke={outerColor}
                            strokeWidth={outerStrokeWidth}
                            fill="transparent"
                            strokeDasharray={`${circumreference} ${circumreference}`}
                            strokeDashoffset={this.strokeDashoffset}
                        />
                        <Icon
                            name={completed ? "check-circle-o" : "certificate"}
                            size={size}
                            style={styles.icon}
                        />
                    </Svg>
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
    },
    icon: {
        alignSelf: 'center',
        color: OUTER_COLOR,
        transform: [{ rotate: '90deg' }],
    },
});
