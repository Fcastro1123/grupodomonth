import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Frames } from "frames-react-native";


export default function agendaManual({ navigation }) {

    useEffect(() => {




    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <ImageBackground source={require('../assets/novo.png')} style={styles.imageView} />

                <View style={{ backgroundColor: '#000', width: wp('95%'), height: hp('4%'), alignItems: 'center', borderRadius: 5, marginTop: hp('-20%') }}>
                    <Text style={{ color: '#B8860B', fontSize: 24 }}>Abril</Text>
                </View>

                <View style={{marginTop: hp('1%') }}>

                    <Frames style={{ justifyContent: 'center', opacity:hp('0.5%'), backgroundColor:'#1C1C1C', borderRadius: 15, padding: 10, width: wp('95%')}}>


                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>01/04 - Festa Luciano Suzano - 20hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>02/04 - Village do Lago - 14hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>02/04 - Recanto das Palmeiras - 18hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>03/04 - Gumas Bar - 18hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>09/04 - Recanto das Palmeiras - 13hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>09/04 - Vila Romana - 22hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>10/04 - Gumas Bar - 18hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>16/04 - Feijoada do Maloca Suzano - 15hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>16/04 - Festa Formatura - 19hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>17/04 - Aniversário - 12hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>17/04 - Gumas Bar - 18hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>21/04 - Aniversário - 12hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>23/04 - Resenha do Paulão - 17hs </Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>24/04 - Gumas Bar - 18hs</Text>









                    </Frames>


                </View>






            </View>
        </View >






    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#363636',
        alignItems: 'center',
        justifyContent: 'flex-start',

    },   
    imageView: {
        width: wp('100%'),
        height: hp('60%'),
        marginTop: hp('4%')

    },

});
