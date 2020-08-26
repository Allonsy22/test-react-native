import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { toggleDrawer } from './navigation';
import {
    DrawerContent,
    CategorySlider,
    Toolbar,
    AnimatedItem,
    Loading,
    ItemCard,
    LongPressButton,
    HorizontalCircleScroll,
    CircularProgress,
} from '../components';

import ListScreen from '../screens/ListScreen';
import CardListScreen from '../screens/CardListScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigation(props) {
    return (
        <Drawer.Navigator
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={CircularProgress} />
            <Drawer.Screen name="Login" component={LoginScreen} />
        </Drawer.Navigator>
    )
};

const LoginScreen = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                <Text>Home Screen</Text>
            </TouchableOpacity>
        </View>
    )
};

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.purple,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: () => <Toolbar />,
                headerLeft: (props) => <DrawerAndBackButton {...props} />,
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={CategoryScreen}
                options={{ title: "Home" }}
            />
            <Stack.Screen name="CardListScreen" component={CardListScreen} />
            <Stack.Screen
                name="BasketScreen"
                component={BasketScreen}
                options={{ title: "Basket" }}
            />
            <Stack.Screen
                name="DetailsScreen"
                component={DetailsScreen}
                options={{ title: "Details" }}
            />
        </Stack.Navigator>
    )
};
