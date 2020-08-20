import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { openDrawer } from '../routes/navigation';
import colors from '../utils/colors';

export default class Toolbar extends React.Component {
    renderLeftComponent() {
        return (
            <View style={[styles.container]} >
                <TouchableOpacity onPress={() => openDrawer()}>
                    <Icon
                        name="bars"
                        size={20}
                        color={colors.bg}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => openDrawer()}>
                    <Icon
                        name="chevron-left"
                        size={20}
                        color={colors.bg}
                    />
                </TouchableOpacity>
            </View>
        )
    };

    renderCenterComponent() {
        return (
            <Text style={[styles.text]}>Home</Text>
        )
    };

    render() {
        return (
            <Header
                leftComponent={this.renderLeftComponent()}
                centerComponent={this.renderCenterComponent()}
                backgroundColor={colors.toolbar}
                placement="left"
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: colors.bg,
    }
});
