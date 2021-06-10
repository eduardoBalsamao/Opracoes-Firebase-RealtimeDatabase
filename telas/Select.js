import React, { useState, useContext, useEffect, useCallback } from 'react'
import { View, StyleSheet, Text, FlatList, Button, Alert, TouchableOpacity, Image } from 'react-native';
import database from '@react-native-firebase/database';
import { useFocusEffect } from '@react-navigation/core';
import { CommonActions } from '@react-navigation/native';

const Item = ({item, navigation}) => {
    /* Função que faz uma linha ------ para separar os itens */
    const Separator = () => (
        <View style={estilo.separator}></View>
    );
    const routeItem = (item) =>{
        navigation.dispatch(
          CommonActions.navigate({
            name: 'Update',
            params: {user: item}
          })
        );
      }
    
    const deleteItem = (item) =>{
        database().ref(`/users/${item.id}`).remove()
            .then(() => {
                Alert.alert("Item deletado", "Atualize a pagina para os itens deletados sumirem da tela");
            })
            .catch(erro =>{Alert.alert(erro)})
    }
  
    return (
      <View style = {estilo.containerCard}>

            <Text style = {estilo.tittleCard}>Nome: {item.nome}</Text>
            <Text style = {estilo.tittleCard}>Idade: {item.idade}</Text>
            <Text style = {estilo.tittleCard}>Email: {item.email}</Text>

            {/* Separador */}
            <Separator />

            <View style = {{flexDirection: 'row-reverse',}}>
                <TouchableOpacity
                    onPress = {() => routeItem(item)}
                >
                    <Image 
                        source = {require('../assets/edit.png')} 
                        resizeMode = 'contain'
                        style ={{ width: 25, height: 25, tintColor: 'snow', marginLeft: 20}}
                        
                    ></Image>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress = {() => deleteItem(item)}
                >
                    <Image 
                        source = {require('../assets/delete.png')} 
                        resizeMode = 'contain'
                        style ={{ width: 25, height: 25, tintColor: 'snow', marginRight: 20}}
                    ></Image>
                </TouchableOpacity>
          </View>
                
      </View>
    );
  };

const Select = ({navigation}) =>{
    const navigationRef = navigation;
    const [data, setData] = useState([]); //State que armazena os dados puxados do FIREBASE DB

    const renderItem = ({ item }) => ( //Função pra renderizar o item da FlatList
      <Item item = {item} navigation = {navigationRef} />
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
            <Text style = {estilo.titulo}>Tela de Select</Text>
            <Button title = "Ver informações no console" color="rebeccapurple" onPress={() => console.log(data)}></Button>
            <View style = {estilo.containerFlat} >
                <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
            </View>
                
            
            
            
            

        </View>
    )
}
export default Select;

const estilo = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center'
    },
    containerFlat:{
        flex: 1,
        paddingBottom: 50
    },

    titulo: {
        fontSize: 28,
        color: 'rebeccapurple',
        marginVertical: 15,
    },    

    tittleCard:{
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'snow'
    },

    containerCard:{ 
        height: 140,
        backgroundColor: 'slateblue',
        alignSelf: 'center',
        elevation: 2,
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'column',
        paddingHorizontal: 30
    },

    separator: {
        marginVertical: 8,
        borderBottomColor: 'snow',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },


})