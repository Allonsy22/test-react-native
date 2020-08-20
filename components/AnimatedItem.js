import React from 'react';
import {
    Animated,
    Platform,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native';
import colors from '../utils/colors';

const WIDTH = Dimensions.get('window').width * .8;

export default class AnimatedItem extends React.Component {
    constructor() {
        super();
        this.animatedValue = new Animated.Value(0);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.id !== this.props.id) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        Animated.timing(
            this.animatedValue,
            {
                toValue: 0.5,
                duration: 510,
                useNativeDriver: true
            }
        ).start();
    }

    deleteItem = () => {
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 510,
                useNativeDriver: true
            }
        ).start(() => {
            this.props.deleteItem(this.props.id);
          });
    }

    render() {
        const translate_Animation_Object = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [-WIDTH, 0, WIDTH]
        });

        const opacity_Animation_Object = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
        });

        const {title} = this.props;
        
        return (
            <Animated.View style={[
                styles.container, {
                    transform: [{ translateX: translate_Animation_Object }],
                    opacity: opacity_Animation_Object
                }]}>

                <Text style={styles.singleItemText}>
                    {title}
                </Text>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={this.deleteItem}>
                    <Text style={styles.removeIcon}>{'\u00D7'}</Text>
                </TouchableOpacity>

            </Animated.View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: 50,
        backgroundColor: colors.primary1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 15,
    }
});