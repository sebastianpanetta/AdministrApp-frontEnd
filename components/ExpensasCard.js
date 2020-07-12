import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import Api from '../constants/api';
import Session from '../constants/session';

const axios = require('axios');


// props.style es una prop definida para el componente card, no es el style que tienen
// todos los componentes de react-native por defecto
const ExpensasCard = props => {

    const [userLogged, setUserLogged] = useState(Session.user.type);

    const deleteExpensaHandler = (id) => {
        console.log(new Date() + " Expensa id: " + id);
        // request para deleteExpensa
        var deleteExpensa = {
            method: 'delete',
            url: `${Api.url}/expensa/${id}`,
            headers: {
                'Authorization': `${Session.bearer}${Session.token}`
            }
        };

        axios(deleteExpensa)
            .then(function (response) {
                console.log(new Date() + " Calling props.onExpensaDelete... \n");
                props.onExpensaDelete();
            })
            .catch(function (error) {
                console.log(new Date() + " An error ocurred \n");
                console.log(error);
            })
    };

    let deleteButton = <Button title="Borrar" color="#FF0000" onPress={deleteExpensaHandler.bind(this, props.id)} />

    if (userLogged != 'administracion') {
        deleteButton = null;
    }

    return (
        <View style={{ ...styles.card, ...props.style }}>
            {props.children}
            <View style={styles.textContainer} >
                <Text style={styles.textStyle} >{props.title}</Text>
            </View>
            <Button title="Detalle" />
            {deleteButton}
        </View>
    )
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
        padding: 30,
        margin: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignContent: 'space-between',
        justifyContent: 'center'
    },
    textContainer: {
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 18
    }
});

export default ExpensasCard;

