import React, { useState } from 'react';
import {
    Text, View, TextInput, Button, StyleSheet, Modal, TouchableWithoutFeedback, Keyboard
} from 'react-native';

import Api from '../constants/api';
import Session from '../constants/session';

const axios = require('axios');

const ExpensasDetail = (props) => {

    const [expensa, setExpensa] = useState();

    console.log(new Date() + " props.onDetail id " + props.detailId);

    var getExpensa = {
        method: 'get',
        url: `${Api.url}/expensa/${props.detailId}`,
        headers: {
            'Authorization': `${Session.bearer}${Session.token}`
        }
    };

    console.log(new Date() + " Request is: \n" + JSON.stringify(getExpensa));

    axios(getExpensa)
        .then(function (response) {
            console.log(new Date() + " Response: \n" + JSON.stringify(response));
            console.log(new Date() + " expensa is " + JSON.stringify(expensa));
            if (!expensa) {
                setExpensa(response.data.expensa);
            }
        })
        .catch(function (error) {
            console.log(new Date() + " An error ocurred \n");
            console.log(error);
        })

    let content = null; 

    if (expensa) {
        content = <View>
            <Text>Titulo {expensa.titulo}</Text>
            <Text>Monto {expensa.monto.$numberDecimal}</Text>
            <Text>Descripcion {expensa.descripcion}</Text>
        </View>
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <View style={styles.nuevoExtractoWrapper}>
                    <Text style={styles.nuevoExtractoText}>Detalle del Extracto</Text>
                    {content}
                </View>
                <View style={styles.button}>
                    <Button title="Cerrar" color="red" onPress={props.onCancel} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        // con flex: 1 (o cualquier otro valor) el child element toma todo el 
        // espacio disponible, si se agregan otros childs juntos, se distribuyen el espacio
        // en funcion de los valores asignados a la propiedad flex
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    largeInput: {
        height: 200,
        width: '80%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    },
    button: {
        width: '45%'
    },
    nuevoExtractoWrapper: {
        margin: 20
    },
    nuevoExtractoText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default ExpensasDetail;