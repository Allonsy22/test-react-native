import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Animated,
} from 'react-native';
import { ItemCard } from '../components';
import { LinearGradient } from 'expo-linear-gradient';

import { data } from '../utils/data';
import colors from '../utils/colors';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * .8;
const SPACER_WIDTH = (width - CARD_WIDTH) / 2;
const keyExtractor = ({ id }) => id.toString();

export default class CardListCard extends React.Component {
    constructor(props) {
        super(props);
        this.scrollX = new Animated.Value(0);
    };

    renderBgImage(data) {
        return data.map((item, index) => {
            const translateX = this.scrollX.interpolate({
                inputRange: [(index - 1) * CARD_WIDTH, (index) * CARD_WIDTH],
                outputRange: [-width, 0]
            });
            const opacity = this.scrollX.interpolate({
                inputRange: [(index - 1) * CARD_WIDTH, (index) * CARD_WIDTH, (index + 1) * CARD_WIDTH],
                outputRange: [0.1, 1, 0.1]
            });
            return (
                <Animated.Image
                    style={[
                        styles.bgImage,
                        StyleSheet.absoluteFillObject, 
                        {transform: [{translateX}], opacity},
                    ]}
                    source={{ uri: item.bgImage }}
                    key={index}
                />
            )
        });
    };

    renderItem({ item, index }) {
        if (!item.title) {
            return (
                <View style={{ width: SPACER_WIDTH }} />
            )
        }
        return (
            <ItemCard
                image={item.image}
                title={item.title}
                description={item.description}
                rating={item.rating}
                scrollX={this.scrollX}
                index={index}
            />
        )
    };

    render() {
        const items = [{ id: 'left-spacer' }, ...data, { id: 'right-spacer' }]
        const scrollX = this.scrollX;
        return (
            <View style={[{ flex: 1 }]}>
                {this.renderBgImage(data)}
                <LinearGradient
                    colors={['transparent', colors.bg]}
                    style={{
                        width,
                        height,
                        position: 'absolute',
                        bottom: 0,
                    }}
                />
                <Animated.FlatList
                    data={items}
                    renderItem={({ item, index }) => this.renderItem({ item, index })}
                    keyExtractor={keyExtractor}
                    horizontal
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    decelerationRate={0.1}
                    bounces={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true }
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.text,
    },
    bgImage: {
        width,
        height,
        resizeMode: 'cover'
    }
});
