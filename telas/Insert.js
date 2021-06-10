import React from 'react'
import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import database from '@react-native-firebase/database'

const Insert = ({navigation}) =>{
    const [nome, setNome] = useState();
    const [idade, setIdade] = useState();
    const [email, setEmail] = useState();

    const checkTextInput = () => {
        if (nome == null) {
            Alert.alert("Erro ao fazer Registro","Campo nome vazio");
            return;
        }
        if (idade == null) {  
            Alert.alert("Erro ao fazer Registro","Campo idade vazio");
            return;
        }
        if (email == null) {  
            Alert.alert("Erro ao fazer Registro","Campo email vazio");
            return;
        }
        //Caso todas as verificações forem falsas faz o login disponivel em (AuthProvider)
        insertData(nome, idade, email)
    };
    
    const insertData = (nome, idade, email) => {
        database()
            .ref('/users')
            .push()
            .set({
                nome: nome,
                idade: idade,
                email: email
            })
            .then(() => Alert.alert("Sucesso","Registro feito com sucesso"))
            .catch(error => {
                Alert.alert('Erro no Registro', error);
            })
    }
    
      

    return(
        <View style = {estilo.container}>
            <Text style = {estilo.titulo}>Tela de Insert</Text>
            <View style = {estilo.containerLogin}>

                {/* Input do email */}
                <TextInput 
                    style = {estilo.input} 
                    placeholder = "Nome" 
                    onChangeText = {(nome) => setNome(nome)}
                    keyboardType = 'default'
                    autoCorrect = {false}
                >
                </TextInput>
                <TextInput 
                    style = {estilo.input} 
                    placeholder = "Idade" 
                    onChangeText = {(idade) => setIdade(idade)}
                    keyboardType = 'numeric'
                    autoCorrect = {false}
                >
                </TextInput>
                <TextInput 
                    style = {estilo.input} 
                    placeholder = "Email" 
                    onChangeText = {(email) => setEmail(email)}
                    keyboardType = 'email-address'
                    autoCorrect = {false}
                >
                </TextInput>

                <TouchableOpacity 
                    style={estilo.appButtonContainer}
                    onPress = {checkTextInput}
                     
                >
                    <Text style={estilo.appButtonText}>Registrar</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}
export default Insert;

const estilo = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center'
    },
    titulo: {
        fontSize: 20,
        color: 'steelblue',
        marginVertical: 15,
    },
    containerLogin:{
        justifyContent: 'center',
        marginVertical: 15,
        width: '85%',
    },
    input: {
        height: 35,
        width: '100%',
        marginVertical: 5,
        borderWidth: 1,
        alignSelf: 'center',
        paddingLeft: 20,
        paddingTop: 10,
        borderRadius: 100,
        backgroundColor: 'ghostwhite',
        borderColor: 'lightgray',
        elevation: 5,
      },
      appButtonContainer: {
        elevation: 8,
        backgroundColor: '#009CFF',
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