import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import colors from '../utils/colors';

const DEVICE_WIDTH = Dimensions.get('window').width * .2;

export default class CategorySlider extends React.Component {
    state = {
        categories: [
            { bgColor: colors.primary1, title: "Category1", image: 'https://i.pinimg.com/originals/32/2a/08/322a08b12e2cd6e5495146cf72eaf062.jpg' },
            { bgColor: colors.primary2, title: "Category2" },
            { bgColor: colors.primary1, title: "Category3" },
            { bgColor: colors.primary2, title: "Category4" },
            { bgColor: colors.primary1, title: "Category5" },
            { bgColor: colors.primary2, title: "Category6" },
            { bgColor: colors.primary1, title: "Category7" },
            { bgColor: colors.primary2, title: "Category8" },
        ]
    };

    renderCategory(categories) {
        return categories.map((category, index) => {
            return (
                <TouchableOpacity key={index}>
                    <View
                        style={[
                            styles.category,
                        ]}
                    >
                        <Image
                            style={[styles.image, StyleSheet.absoluteFill]}
                            source={{ uri: category.image }}
                        />
                        <Text style={[styles.title]}>{category.title}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    };
    render() {
        const { categories } = this.state;
        return (
            <View>
                <ScrollView
                    style={[{height: 100}]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {this.renderCategory(categories)}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    category: {
        width: DEVICE_WIDTH,
        height: DEVICE_WIDTH,
        borderRadius: DEVICE_WIDTH / 2,
        alignItems: 'center',
        margin: 15,
        backgroundColor: colors.primary2,
    },
    image: {
        borderRadius: DEVICE_WIDTH / 2,
    },
    title: {
        position: 'absolute',
        bottom: -20,
        textAlign: 'center',
        fontSize: 14,
        color: colors.text,
    }
});
