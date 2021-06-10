/**
 * Criado por: Eduardo Augusto Balsamão Campos
 * 
 * Objetivo Principal: 
    * Estudar as principais funções do Realtime Database do Firebase

 * Objetivos secundarios:
    * Estudar o Bottom Navigator
    * Cada função deve estar em uma tela
    * Cada tela deve ser acessada pelo Bottom Navigator 
 */


import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Tab from './navigation/tabs'



const App =  () => {

  return (
    <NavigationContainer>
      <Tab></Tab>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center'
  }

});

export default App;
