import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import database from '@react-native-firebase/database';


const Update = (props) =>{

    const refItem = database().ref(`/users/${props.route.params.user.id}`);
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setNome(props.route.params.user.nome);
        setIdade(props.route.params.user.idade);
        setEmail(props.route.params.user.email);

    }, []);

    const editItem = (nomeEditable, idadeEditable, emailEditable) => {
        refItem.update({nome: nomeEditable, idade: idadeEditable, email: emailEditable })
        .then(() => Alert.alert("Sucesso","Edição feita com sucesso"))
        .catch(() => Alert.alert("Error"))
    }
    

    return(
        <View style = {estilo.container}>
            <Text style = {estilo.titulo}>Tela de Update</Text>

            <TextInput 
                    style = {estilo.input} 
                    placeholder = "Nome"
                    secureTextEntry = {false}
                    onChangeText = {(t) => setNome(t)}
                    value = {nome}

            ></TextInput>
            <TextInput 
                    style = {estilo.input} 
                    placeholder = "Idade"
                    secureTextEntry = {false}
                    onChangeText = {(t) => setIdade(t)}
                    value = {idade}

            ></TextInput>
            <TextInput 
                    style = {estilo.input} 
                    placeholder = "Email"
                    secureTextEntry = {false}
                    onChangeText = {(t) => setEmail(t)}
                    value = {email}

            ></TextInput>
            <TouchableOpacity 
                    style={estilo.appButtonContainer}
                    onPress = {() => editItem(nome, idade, email)}
                >
                   <Text style={estilo.appButtonText}>Editar</Text>
            </TouchableOpacity>

        </View>
    )
}
export default Update;

const estilo = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center'
    },
    titulo: {
        fontSize: 20,
        color: 'steelblue',
        marginBottom: 20
    },
    input: {
        width: '80%',
        backgroundColor: '#ffff',
        height: 40,
        borderColor: 'steelblue',
        fontSize: 20,
        paddingLeft: 10,
        paddingBottom: 5,
        marginBottom: 10,
        borderWidth: 1
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: 'purple',
        borderRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 12,
        height: 35,
        marginVertical: 20
      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
      },

})