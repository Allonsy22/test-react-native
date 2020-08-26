import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Extrapolate } from 'react-native-reanimated';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const { width, height } = Dimensions.get('window');
const ICON_WIDTH = 60;
const ICON_SIZE = ICON_WIDTH - 30;
const SPACER_WIDTH = (width - ICON_WIDTH) / 2;
const CONTAINER_HEIGHT = ICON_WIDTH * 2.5;

export default class HorizontalCircleScroll extends React.Component {
    constructor(props) {
        super(props);
        this.scrollX = new Animated.Value(0);
        this.translateYContainer = new Animated.Value(CONTAINER_HEIGHT);
        this.rotateIcon = new Animated.Value(0);
    };

    state = {
        data: [
            { icon: 'address-book' },
            { icon: 'id-card' },
            { icon: 'superpowers' },
            { icon: 'user-circle-o' },
            { icon: 'bar-chart' },
            { icon: 'bath' },
            { icon: 'bed' },
            { icon: 'bus' },
            { icon: 'calendar-o' }
        ],
    };

    renderItem = ({ item, index }) => {
        const inputRange = [
            (index - 2) * ICON_WIDTH,
            (index - 1) * ICON_WIDTH,
            (index) * ICON_WIDTH,
        ];
        const translateY = this.scrollX.interpolate({
            inputRange,
            outputRange: [20, 0, 20],
        });
        const scale = this.scrollX.interpolate({
            inputRange,
            outputRange: [.9, 1.3, .9],
            extrapolate: Extrapolate.CLAMP
        });

        if (!item.icon) return <View style={{ width: SPACER_WIDTH }} />

        return (
            <Animated.View
                style={[
                    {
                        transform: [{ translateY, scale }],
                        width: ICON_WIDTH,
                        alignItems: 'center',
                    }
                ]}
            >
                <View style={styles.icon}>
                    <Icon name={item.icon} size={ICON_SIZE} />
                </View>
            </Animated.View>
        )
    };

    onSwipeUp(gestureState) {
        Animated.parallel([
            Animated.timing(this.translateYContainer, {
                toValue: 0,
                useNativeDriver: true,
            }),
            Animated.timing(this.rotateIcon, {
                toValue: 1,
                useNativeDriver: false,
            })
        ]).start();
    };

    onSwipeDown(gestureState) {
        Animated.parallel([
            Animated.timing(this.translateYContainer, {
                toValue: CONTAINER_HEIGHT,
                useNativeDriver: true,
            }),
            Animated.timing(this.rotateIcon, {
                toValue: 0,
                useNativeDriver: false,
            })
        ]).start();
    };

    render() {
        const data = [{ id: 'left-spacer' }, ...this.state.data, { id: 'right-spacer' }];
        const rotate = this.rotateIcon.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
            useNativeDriver: true
        });
        return (
            <Animated.View 
                style={[
                    styles.container,
                    {
                        transform: [{translateY: this.translateYContainer}]
                    }
                ]}
            >
                <GestureRecognizer
                    onSwipeUp={(state) => this.onSwipeUp(state)}
                    onSwipeDown={(state) => this.onSwipeDown(state)}
                    style={styles.gestureRecognizer}
                >
                    <AnimatedIcon 
                        name="chevron-up" 
                        size={20} 
                        style={{transform: [{rotate}]}}
                    />
                </GestureRecognizer>
                <Animated.FlatList
                    data={data}
                    renderItem={this.renderItem}
                    keyExtractor={({ icon }) => icon}
                    contentContainerStyle={{
                        alignItems: 'center',
                        height: CONTAINER_HEIGHT
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={ICON_WIDTH}
                    decelerationRate={0.1}
                    bounces={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
                        { useNativeDriver: true }
                    )}

                >
                </Animated.FlatList>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        borderWidth: 1,
        width: ICON_WIDTH * .8,
        height: ICON_WIDTH * .8,
        borderColor: 'gray',
        borderRadius: ICON_WIDTH / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gestureRecognizer: {
        width,
        height: CONTAINER_HEIGHT * .5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    }
});
