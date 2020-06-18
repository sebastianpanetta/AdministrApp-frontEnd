import React from 'react';
import { View, StyleSheet } from 'react-native';

// props.style es una prop definida para el componente card, no es el style que tienen
// todos los componentes de react-native por defecto
const Card = props => {
    return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.3,
        elevation: 8,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10
    }
});

export default Card;

