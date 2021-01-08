import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import styles from './styles';
import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

function Landing() {

    const navigaion = useNavigation();

    const [ totalConnections, setTotalConnections  ] = useState(0);

    useEffect( () => {
        api.get('connections').then(response => {
            const { total } = response.data;
            setTotalConnections(total)
        })
    }, [])

    function handleNavigateToGiveClassesPage(){
        navigaion.navigate('GiveClasses');
    }
    
    function handleNavigateToStudyPages() {
        navigaion.navigate('Study');

    }


    return(
        <View style={styles.container} >
            <Image source={landingImg} style={styles.banner} />

            <Text style={styles.title}>
                Seja bem-vendo, { '\n' }
                <Text style={styles.titleBold}> O que deseja fazer? </Text>
            </Text>

            <View style={styles.buttonsContainer}>
                 {/* Para passar mais de um estilo ao mesmo elemento, usa-se um array [] */}
                <RectButton 
                    style={ [ styles.button, styles.buttonPrimary ] } 
                    onPress={handleNavigateToStudyPages}
                >
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton 
                    onPress={handleNavigateToGiveClassesPage} 
                    style={ [ styles.button, styles.buttonSecondary ] }
                >
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>

            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas { ' ' }
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}

export default Landing;