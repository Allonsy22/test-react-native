import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    Animated,
} from 'react-native';
import { Rating } from 'react-native-elements';
import colors from '../utils/colors';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * .8;
const CARD_HEIGHT = height * .7;

export default function ItemCard(props) {
    const {
        image,
        title,
        description,
        rating,
        index,
        scrollX,
    } = props;

    const inputRange = [
        (index - 2) * CARD_WIDTH,
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
    ];

    const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [100, 0, 100],
    });

    return (
        <Animated.View style={[
            { transform: [{ translateY }], 
            width: CARD_WIDTH}
        ]}
        >
            <View style={styles.container}>
                <View style={[{ flex: 1, margin: 10 }]}>
                    <Image
                        style={[styles.image]}
                        source={{ uri: image }}
                    />
                </View>
                <View style={[{ flex: 1, margin: 10 }]}>
                    <Text style={[styles.title]}>{title}</Text>
                    <Rating
                        imageSize={20}
                        startingValue={rating || 3}
                        style={{ marginVertical: 10 }}
                        readonly
                    />
                    <Text
                        numberOfLines={6}
                        style={[styles.description]}
                    >
                        {description}
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH * .95,
        height: CARD_HEIGHT,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderRadius: 20,
    },
    image: {
        width: CARD_WIDTH * .9,
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '400',
        textAlign: 'center'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
    }

});
