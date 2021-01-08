import React from 'react'
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

function StudyTabs() {
    return (
        <Navigator
            tabBarOptions = {{
                // Estilo geral das abas
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64,
                },
                // Estilo de cada aba   
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                iconStyle: {
                    flex: 0,
                    width: 22,
                    height: 22,
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16,
                },
                // Abas NÃO selecionadas
                inactiveBackgroundColor: '#FAFAFC',
                // Abas selecionadas
                activeBackgroundColor: '#EBEBF5',
                // Título da aba inativa
                inactiveTintColor: '#C1BCCC',
                // Título da aba selecionada
                activeTintColor: '#32264D',
            }}
        >
            <Screen 
                name="TeacherList" 
                component={TeacherList}
                options={{
                    tabBarLabel: 'Proffys',
                    tabBarIcon: ( { color, size, focused } ) => {
                        return(
                            <Ionicons name="ios-easel" size={size} color={ focused ? '#8257E5' : color} />
                        );
                    }
                }}
            />
            <Screen 
                name="Favorites" 
                component={Favorites}
                options={{
                    tabBarLabel: 'Favoritos',
                    tabBarIcon: ( { color, size, focused } ) => {
                        return(
                            <Ionicons name="ios-heart" size={size} color={ focused ? '#8257E5' : color} />
                        );
                    }
                }}
            />
        </Navigator>
    );
}

export default StudyTabs;