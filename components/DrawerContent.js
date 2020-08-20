import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerItem } from '@react-navigation/drawer';
import colors from '../utils/colors';

const image = require('../assets/bg1.jpg');

export default function DrawerContent(props) {
    const drawerItems = [
        { label: "Home", icon: "home" },
        { label: "User", icon: "user" },
        { label: "Favorites", icon: "heart" },
        { label: "Setings", icon: "cog" }
    ];

    const renderDrawerItem = () => {
        return drawerItems.map((item, index) => {
            return (
                <DrawerItem
                    labelStyle={[styles.text]}
                    label={item.label}
                    icon={() =>
                        <Icon
                            name={item.icon}
                            size={22}
                        />
                    }
                    key={index}
                />
            )
        });
    };

    return (
        <View style={[{ flex: 1 }]}>
            <Image
                style={[styles.image]}
                source={image}
            />
            <View style={[styles.header]}>
                <Avatar
                    rounded
                    title="UN"
                    size="large"
                    containerStyle={[{ backgroundColor: 'grey' }]}
                />
                <Text style={[styles.text, styles.user]}>User Name</Text>
            </View>
            <View style={[styles.main]}>
                {renderDrawerItem()}
                <View style={[styles.footer]}>
                    <DrawerItem
                        labelStyle={[styles.text]}
                        label="Sign Out"
                        icon={() =>
                            <Icon
                                name="sign-out"
                                size={22}
                            />
                        }
                    />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    main: {
        flex: 2,
        backgroundColor: colors.white,
        borderTopRightRadius: 90,
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.text,
    },
    user: {
        backgroundColor: colors.white,
        borderRadius: 20,
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    }
});