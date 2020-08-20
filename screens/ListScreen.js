import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AnimatedItem } from '../components';

const keyExtractor = ({title}) => title;

export default class ListScreen extends React.Component {
    state = {
        items: [
            {title: "Item1", id: 0},
            {title: "Item2", id: 1},
            {title: "Item3", id: 2},
            {title: "Item4", id: 3},
            {title: "Item5", id: 4},
            {title: "Item6", id: 5},
        ]
    };

    removeItem(id) {
        let { items } = this.state;
        items = items.filter( item => item.id !== id);
        this.setState({items});
    };

    renderItem = ({item}) => {
        return (
            <AnimatedItem 
                title={item.title}
                deleteItem={(id) => this.removeItem(id)}
                id={item.id}
            />
        )
    };

    render() {
        const { items } = this.state;

        return (
            <FlatList 
                data={items}
                renderItem={this.renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.container}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
});
