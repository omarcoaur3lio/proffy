import React from 'react';
import { View, ImageBackground, Text } from 'react-native';

import styles from './styles'

import giveClassesBGImage from '../../assets/images/give-classes-background.png'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses(){

    const { goBack } = useNavigation();

    function handleNavigationBack() {
        goBack();
    }

    return(
        <View style={styles.container} >
            <ImageBackground 
                resizeMode="contain" 
                source={giveClassesBGImage} 
                style={styles.contant} 
            >
                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                </Text>
            </ImageBackground>
            <RectButton onPress={handleNavigationBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;