import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { APP_API_BACKEND_GETSHOWAGENDA, APP_API_BACKEND_GETALLAGENDA } from './data/data';
import axios from "axios";
import { Divider } from 'react-native-paper';
import Moment from 'moment';
import { Frames } from 'frames-react-native';
import { green700 } from 'react-native-paper';


LocaleConfig.locales['br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.']
};
LocaleConfig.defaultLocale = 'br';

export default function showAgenda({ navigation }) {
  const [listValues, setListValues] = useState([]);
  const [message, setMessage] = useState();
  const [messageerror, setMessageError] = useState();
  const [currentDate, setCurrentDate] = useState('');
  const [mes, setMes] = useState();
  const [sortListValues, setSortListValues] = useState([]);


  const maia = { key: 'maia', color: 'red', selectedDotColor: 'white' };
  const Crossfit = { key: 'Crossfit', color: 'blue', selectedDotColor: 'white' };

  useEffect(() => {
    //console.log('Caiu no useEffect...')
    var date = new Date().getDate();
    var Mes = new Date().getMonth() + 1;
    var Ano = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    setCurrentDate(date + '/' + Mes + '/' + Ano
      + ' ' + hours + ':' + min + ':' + sec);

    switch (Mes) {
      case 1:
        setMes('Janeiro')
        break;
      case 2:
        setMes('Fevereiro')
        break;
      case 3:
        setMes('Março')
        break;
      case 4:
        setMes('Abril')
        break;
      case 5:
        setMes('Maio')
        break;
      case 6:
        setMes('Junho')
        break;
      case 7:
        setMes('Julho')
        break;
      case 8:
        setMes('Agosto')
        break;
      case 9:
        setMes('Setembro')
        break;
      case 10:
        setMes('Outubro')
        break;
      case 11:
        setMes('Novembro')
        break;
      case 12:
        setMes('Dezembro')
        break;
        }



    axios.post(APP_API_BACKEND_GETSHOWAGENDA, {
      mes: Mes,
      ano: Ano
    }).then(res => {
      setListValues(res.data);

      if (listValues != undefined && listValues.length > 0){
        let sortedAsceding = listValues.sort((a, b) => {return a.data > b.data;})

        setSortListValues(sortedAsceding)

        
      }

      //console.log(sortListValues)

                 
    })
      .catch(error => {
        setMessageError('Erro no retorno dos dados...', error);
        //console.log("erro no retorno dos ", err);
        //console.log(userAuth.clientID);
      })



  }, [setCurrentDate,
    setListValues,
    //setSortListValues,
    setMessageError,
    setMes,
    listValues,
    //sortListValues
    ]);


  if (listValues != null && listValues.length > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <ImageBackground source={require('../assets/MonthNova.jpg')} style={styles.imageView} />
        </View>

        <View style={{ backgroundColor: '#000', width: wp('95%'), height:hp('4%'), alignItems: 'center', borderRadius: 5, marginTop: hp('-19%') }}>
          <Text style={{ color: '#B8860B', fontSize: hp('3%') }}>{mes}</Text>
        </View>



        <View style={{ flex: 1, width: wp('95%'), marginTop: hp('1%') }}>
          <ScrollView>
            <View style={{ backgroundColor: '#1C1C1C', padding: 10, margin: 5, borderRadius: 10, elevation: 1 }}>
              {sortListValues.map(lista => (
                <View style={{ paddingTop: 10 }}>
                  <View style={{ flexDirection: 'row', }}>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ height: 50, fontWeight: 'bold', fontSize: 40, color: '#fff', marginLeft: hp('2%') }}>{Moment(lista.data).format('DD')}</Text>
                      <Text style={{ height: 20, fontSize: 18, color: '#fff', marginLeft: hp('2%') }}>{lista.horario}</Text>

                    </View>

                    <View style={{ marginLeft: hp('3%'), padding: 2 }}>
                      <Text style={{ height: 20, fontWeight: 'bold', fontSize: 16, color: '#B8860B' }}>Local: {lista.local}</Text>
                      <Text style={{ height: 20, fontSize: 16, color: '#B8860B' }}>Evento: {lista.evento}</Text>
                      <Text style={{ height: 20, fontSize: 16, color: '#B8860B' }}>Contato: {lista.contato}</Text>
                      <Text style={{ height: 20, fontSize: 16, color: '#B8860B' }}>Responsavel: {lista.responsavel}</Text>
                      <Text style={{ height: 20, fontSize: 16, color: '#B8860B' }}>Valor: {`R$ ${lista.valor}`}</Text>

                    </View>
                  </View>
                  <Divider style={styles.dividerStyle} />
                </View>
              ))}
            </View>
          </ScrollView>

        </View>


      </View>
    );

  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <ImageBackground source={require('../assets/month_agua.jpeg')} style={styles.imageView} />

          <View style={{ backgroundColor: '#000', width: wp('95%'), alignItems: 'center', borderRadius: 5, marginTop: hp('-3%') }}>
            <Text style={{ color: '#B8860B', fontSize: 18 }}>{mes}</Text>
          </View>
        </View>

        <View style={{ backgroundColor: 'transparent', width: wp('95%'), alignItems: 'center' }}>
          <Text style={{ color: '#B8860B', fontSize: 18, marginTop: hp('-30%') }}>Sem agenda para esse mes...</Text>
        </View>

      </View>

    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  calendarView: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: wp('80%'),
    height: hp('15%'),
  },
  calendar: {
    width: wp('100%'),
    marginTop: hp('-58%')
  },
  agendaView: {
    backgroundColor: '#1874CD',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: hp('5%'),
    width: wp('100%'),
    height: hp('50%'),
    padding: hp('2%'),
    marginTop: hp('-30%'),
    flex: 0.3

  },

  buttonIcon: {
    width: 50,
    height: 50,
    marginTop: hp('-2%'),
    marginLeft: hp('44')

  },
  imageView: {
    width: wp('100%'),
    height: hp('35%'),
    marginTop: hp('4%')

  },
  dividerStyle: {
    padding: 1,
    marginTop: hp('1%'),
    backgroundColor: '#B8860B'

  },


});
