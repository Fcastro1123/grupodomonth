import React, { useState, Component } from 'react';
import { Text, View, Dimensions, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import showAgenda from '../src/showAgenda';
import agendaNew from '../src/agendaNew';
import calendarioPage from '../src/calendarioPage';


const { width, height } = Dimensions.get('window');
const SPACING = 10;

const Tab = createBottomTabNavigator();

const InitialPage = ({ route, navigation }) => {
    //const { ativo, setAtivo } = useAtivo();
    //console.log(route.params.detalhes.sysTag);

        return (
            <Tab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    style:{
                        position: 'absolute',
                        bottom: 0,
                        //left: 5,
                        //right: 5,
                        elevation: 0,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        height: 55,
                        ...styles.shadow
                    }
                }}
                >
                <Tab.Screen name="Agenda" component={showAgenda} options={{ headerShown: false, 
                tabBarIcon:({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <ImageBackground 
                        source={require('../assets/pandeiro.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? '#gold' : 'lightgray',
                            opacity: focused ? 1 : 0.3
                            
                        }}
                        />
                        <Text style={{color: focused ? 'black' : 'lightgray', fontSize: 12}}>Agenda</Text>
                    </View>
                ) 
                }} />
                <Tab.Screen name="Calendar" component={calendarioPage} options={{ headerShown: false, 
                tabBarIcon:({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <ImageBackground 
                        source={require('../assets/iconMarcadas.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            color: focused ? '#e32f45' : 'lightgray',
                            opacity: focused ? 1 : 0.3
                            
                        }}
                        />
                        <Text style={{color: focused ? 'black' : 'lightgray', fontSize: 12}}>Calendário</Text>
                    </View>
                )  }} />
                
                <Tab.Screen name="Marcar" component={agendaNew} options={{ headerShown: false, 
                tabBarIcon:({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <ImageBackground 
                        source={require('../assets/new_agenda.png')}
                        resizeMode='contain'
                        style={{
                            width: 25,
                            height: 25,
                            tintColor: focused ? '#e32f45' : 'lightgray',
                            opacity: focused ? 1 : 0.3
                            
                        }}
                        />
                        <Text style={{color: focused ? 'black' : 'lightgray', fontSize: 12}}>Marcar</Text>
                    </View>
                ) }} />

               
            </Tab.Navigator>
        )    
}

export default InitialPage;

const styles = StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

