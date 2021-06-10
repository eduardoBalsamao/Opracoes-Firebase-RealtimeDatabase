import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import {StyleSheet, Text, View, Image} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Select from '../telas/Select';
import Update from '../telas/Update';
import Delete from '../telas/Delete';
import Insert from '../telas/Insert';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function SelectStack() {
    return (
      <HomeStack.Navigator initialRouteName = {Select}>
        <HomeStack.Screen name="Select" component={Select} options = {{header: ()=> null}} />

        {/* Tela User */}
        <HomeStack.Screen name="Update" component={Update} options = {({navigation}) => ({
                title: '',
                headerStyle: {
                    backgroundColor: '#f2f2f2',
                    shadowColor: '#f2f2f2',
                    elevation: 0
                },
                headerLeft: () => (
                    <View style = {{marginLeft: 10, marginTop: 5}}>
                        {/* Cabeçalho com o botão para voltar a tela de login */}
                        
                        <TouchableOpacity
                            onPress = {() => navigation.navigate('Select')}
                        >
                            <Image 
                                source = {require('../assets/arrow.png')} 
                                resizeMode = 'contain'
                                style ={{ width: 25, height: 25, tintColor: 'black', marginLeft: 5}}

                            ></Image>
                        </TouchableOpacity>
                    </View>
                )
            })} />
        
      </HomeStack.Navigator>
    );
  }

const Tabs = () =>{
    return(
        <Tab.Navigator
            tabBarOptions = {{
                keyboardHidesTabBar: true,
                showLabel: false,
                style: {
                    position:'absolute',
                    elevation: 2,
                    backgroundColor: 'ghostwhite',
                    height: 50
    
                }
            }}
        >
            <Tab.Screen name= "Select" component= { SelectStack } options = {{
                tabBarIcon: ({focused}) => (
                    <View style = {{alignSelf: 'center', justifyContent: 'center'}}>
                        <Image 
                            source = {require('../assets/outline.png')} 
                            resizeMode = 'contain'
                            style ={{ width: 25, height: 25, tintColor: focused ? 'steelblue' : '#748c94', marginLeft: 5}}

                        ></Image>
                        <Text style = {{color: focused ? 'steelblue' : '#748c94', fontSize:13}}>Select</Text>
                    </View>
                )
            }} />

            <Tab.Screen name="Insert" component={Insert} options = {{
                tabBarIcon: ({focused}) => (
                    <View style = {{alignSelf: 'center', justifyContent: 'center'}}>
                        <Image 
                            source = {require('../assets/add.png')} 
                            resizeMode = 'contain'
                            style ={{ width: 25, height: 25, tintColor: focused ? 'steelblue' : '#748c94', marginLeft: 5}}

                        ></Image>
                        <Text style = {{color: focused ? 'steelblue' : '#748c94', fontSize:13}}>Insert</Text>
                    </View>
                )
            }}/>
        </Tab.Navigator>

    );
}
export default Tabs;

const estilo = StyleSheet.create({
})