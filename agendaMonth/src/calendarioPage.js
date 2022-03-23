import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { CalendarList, Calendar, Agenda, LocaleConfig } from 'react-native-calendars';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { APP_API_BACKEND_GETALLAGENDA } from './data/data';
import axios from "axios";
import { Frames } from "frames-react-native";
//import { shallowEqual, useSelector } from 'react-redux'

LocaleConfig.locales['br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.']
};
LocaleConfig.defaultLocale = 'br';

export default function calendarioPage({ navigation }) {
  const [listAllValues, setListAllValues] = useState([]);
  const [message, setMessage] = useState();
  const [messageerror, setMessageError] = useState();
  const [currentDate, setCurrentDate] = useState('');
  const [mes, setMes] = useState();
  const [dateString, setDateString] = useState();

  //const calendar = useSelector((state) => state.calendarClasses.calendar);

  let markedDay = {};

  const maia = { key: 'maia', color: 'red', selectedDotColor: 'white' };
  const Crossfit = { key: 'Crossfit', color: 'blue', selectedDotColor: 'white' };

  useEffect(() => {
    //console.log('Caiu no useEffect...')
    var date = new Date().getDate();
    var Mes = new Date().getMonth() + 1;
    var Ano = new Date().getFullYear();
    var hours = new Date().getHours() - 4;
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    setCurrentDate(date + '/' + Mes + '/' + Ano
      + ' ' + hours + ':' + min + ':' + sec);

    var createdAt = currentDate;  


    axios.get(APP_API_BACKEND_GETALLAGENDA).then(res => {
      setListAllValues(res.data);
      //console.log(listAllValues); 
    })
      .catch(error => {
        setMessageError('Erro no retorno dos dados...', error);
        //console.log("erro no retorno dos ", err);
        //console.log(userAuth.clientID);
      })

    listAllValues.map((item) => {
      markedDay[item.data] = {
        selected: true,
        marked: true,
        selectedColor: "purple",
      };
    });

    //console.log(dateString)

  }, [setCurrentDate, setListAllValues, setMessageError, dateString]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/month_agua.jpeg')} style={styles.imageView} />

        {/* <View style={{ backgroundColor: '#000', width: wp('95%'), height: hp('4%'), alignItems: 'center', borderRadius: 5, marginTop: hp('-4%') }}>
          <Text style={{ color: '#B8860B', fontSize: 24 }}>{mes}</Text>
        </View> */}

        <View style={{ marginLeft: hp('-1.5%'), marginTop: hp('1%') }}>

          {/* <Frames style={{ justifyContent: 'center' }}>
            <View style={{ backgroundColor: '#1C1C1C', width: wp('95%'), borderRadius: 5, padding: 10, marginTop: hp('2%'), marginLeft: 10 }}>
              <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>05/03 - Aniversário Bruna - 19:00hs </Text>
              <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>06/03 - GumasBar - 18:00hs </Text>
              <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>12/03 - Recanto das Palmeiras - 19:00hs </Text>
              <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>13/03 - GumasBar - 18:00hs </Text>
              <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>19/03 - Próximo a pousada - 11:30hs </Text>
              <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>20/03 - GumasBar - 18:00hs </Text>
              <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>26/03 - Condomínio Dumont - 17:00hs </Text>
              <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>27/03 - Beneficente Osmir Lima </Text>
              <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>27/03 - GumasBar - 18:00hs </Text>
              <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>29/03 - Aniversário Mariane </Text> */}


          {/* <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>02/04 - Village do Lago - 14hs </Text> */}
          {/* <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>02/04 - Fazenda São João - 19hs </Text> */}
          {/* <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>05/04 - Rancho do cartório - Definir horário </Text> */}
          {/* <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>16/04 - Feijoada do Maloca - 15hs </Text> */}
          {/* <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>16/04 - Festa Formatura - 19hs </Text> */}
          {/* <Text style={{ height: 25, fontSize: 16, color: '#B8860B' }}>17/04 - Aniversário - 12hs </Text> */}












          {/* </View>

          </Frames> */}




        </View>
      </View>




      {/* <Divider style={styles.dividerStyle} /> */}
      <View style={styles.calendarView}>
        <Calendar
          onDayPress={day => {            
            setDateString(day.dateString);
            //console.log(dateString);
          }}
          onMonthChange={month => {
            //console.log('month changed', month);
            setMes(month.month)
            //console.log(mes)
          }}
          markedDates={{
            '2022-03-16': {selected: true, marked: true, selectedColor: 'green'},
            '2022-03-18': {selected: true, marked: true, selectedColor: 'green'},
            
          }}
         
          // Agenda container style
          style={styles.calendar}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  calendarView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: wp('97%'),
    borderRadius: 20,
    marginTop: hp('-15%')
  },
  calendar: {
    width: wp('97%'),
    marginTop: hp('0%')
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

});