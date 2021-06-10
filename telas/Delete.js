import React, { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import database from '@react-native-firebase/database';
import { useFocusEffect } from '@react-navigation/core';

const Item = ({item}) => {
    const deleteUser = () =>{
         database().ref(`/users/${item.id}`).remove()
            .then(() => {
                Alert.alert("Item deletado");
            })
            .catch(erro =>{Alert.alert(erro)})
    }
    return (
    
        <TouchableOpacity onPress = {deleteUser}>
            <View style = {estilo.containerCard}>
                    <Text style = {estilo.tittleCard}>{item.nome}</Text>
                    <Text style = {estilo.tittleCard}>{item.idade}</Text>
                    <Text style = {estilo.tittleCard}>{item.email}</Text>
            </View>
        </TouchableOpacity>
    );
  };

const Delete = ({navigation}) =>{
    const [data, setData] = useState([]); //State que armazena os dados puxados do FIREBASE DB


    const renderItem = ({ item }) => ( //Função pra renderizar o item da FlatList
      <Item item = {item} />
    );
    const userFetch = () =>{ //Função que recolhe os valores do bando de dados
        database().ref('/users').once('value')
            .then(snapshot => {
                if(snapshot.val() == null){
                    setData(0)
                }else{
                    let d = []; //Data temporaria
                    snapshot.forEach(item =>{
                    const usuario = { //Atribui os dados a "const produtos = {}"
                        id: item.key, //Indentificador do usuario
                        nome: item.val().nome, //Nome do usuario
                        idade: item.val().idade, //Nome do usuario
                        email: item.val().email, //Nome do usuario
                      };
                      d.push(usuario); //Bota os produtos na variavel temporaria
                      setData(d);   
                })

                }
                
            })
    }
    useFocusEffect(
        React.useCallback(() => {
            userFetch();
    
          return () => userFetch();
        }, [])
      );


    return(
        <View style = {estilo.container}>
            <Text style = {estilo.titulo}>Tela de Delete</Text>
            <Text style = {estilo.titulo}>Clique para deletar</Text>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            /> 

        </View>
    )
}
export default Delete;

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

    tittleCard:{
        fontSize: 12,
        alignSelf: 'center',
        marginTop: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#333'
    },
    containerCard:{
        width: '85%', 
        height: 100,
        backgroundColor: '#f5f7ff',
        alignSelf: 'center',
        elevation: 10,
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'column'
        
    },


})