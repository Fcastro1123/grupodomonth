import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { CalendarList, Calendar, Agenda, LocaleConfig } from 'react-native-calendars';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { APP_API_BACKEND_GETALLAGENDA } from './data/data';
import axios from "axios";
import { Frames } from "frames-react-native";
import Moment from 'moment';

export default function calendarioPage({ navigation }) {
  const [listAllValues, setListAllValues] = useState([]);
  const [message, setMessage] = useState();
  const [messageerror, setMessageError] = useState();
  const [currentDate, setCurrentDate] = useState('');
  const [mes, setMes] = useState();
  const [dateString, setDateString] = useState();
  const [markDay, setMarkDay] = useState();

  let markedDay = {};
  
  useEffect(() => {
    axios.get(APP_API_BACKEND_GETALLAGENDA)
      .then(res => {
        setListAllValues(res.data);
      })
      .catch(error => {
        setMessageError('Erro no retorno dos dados...', error);
      })

    listAllValues.map((item) => {
      markedDay[Moment(item.data).format('YYYY-MM-DD')] = { selected: true, selectedColor: "green" };

      setMarkDay(markedDay)
    });

    //getAgenda()
    
  }, [listAllValues, setMarkDay]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/MonthNova.jpg')} style={styles.imageView} />

        <View style={{ marginLeft: hp('-1.5%'), marginTop: hp('1%') }}>

        </View>
      </View>
      
      <View style={styles.calendarView}>
        <Calendar
          onDayPress={day => {
            setDateString(day.dateString);
           
          }}
          onMonthChange={month => {            
            setMes(month.month)
           
          }}
          markedDates={markDay}

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
