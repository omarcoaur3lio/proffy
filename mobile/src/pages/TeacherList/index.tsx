import React, { useState } from 'react'

import { ScrollView, Text, View, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Feather } from '@expo/vector-icons'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles'


function TeacherList() {

    const [ teachers, setTeachers ] = useState([]);
    const [ favorites, setFavorites ] = useState<number[]>([]);

    const [ isFilterVisible, setIsFilterVisible ] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response){
                // Converte o arquivo texto (JSON) em um array
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            }
        });
    }

    function handleToggleFiltersVisible() {
        // Inverte o estado para mostrar os filtros
        setIsFilterVisible(!isFilterVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setIsFilterVisible(false);
        setTeachers(response.data);
    }

    return(
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                { isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria"
                            placeholderTextColor="#C1BCCC"
                        />
                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Qual o dia?</Text>
                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder="Dia da semana"
                                    placeholderTextColor="#C1BCCC"
                                />
                            </View>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#C1BCCC"
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>

                    </View>
                )}
            </PageHeader>
            <ScrollView
                style={styles.teacherList}
                // Usado para aplicar estilos no conteúdo do container (melhor para espaçamentos)
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher} 
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}

            </ScrollView>
        </View>
    );
}

export default TeacherList;