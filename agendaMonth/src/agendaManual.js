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

                <View style={{ backgroundColor: '#000', width: wp('95%'), height: hp('5%'), alignItems: 'center', borderRadius: 5, marginTop: hp('-20%') }}>
                    <Text style={{ color: '#B8860B', fontSize: 24 }}>Maio</Text>
                </View>

                <View style={{marginTop: hp('1%') }}>

                    <Frames style={{ justifyContent: 'center', opacity:hp('0.5%'), backgroundColor:'#1C1C1C', borderRadius: 15, padding: 10, width: wp('95%')}}>


                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>01/05 - Gumas Bar - 18hs</Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>06/05 - Vapt-Vupt - 20hs</Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>07/05 - Água Clara - 18hs</Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>08/05 - Gumas Bar - 18hs</Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>15/05 - Gumas Bar - 18hs</Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>20/05 - Vapt-Vupt - 20hs</Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>21/05 - Boteco do Netinho - 20hs</Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>22/05 - Gumas Bar - 18hs</Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>28/05 - Vapt-Vupt - 20hs</Text>
                        <Text style={{ height: 25, fontSize: 18, color: '#B8860B' }}>29/05 - Gumas Bar - 18hs</Text>










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
