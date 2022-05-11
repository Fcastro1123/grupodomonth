import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { APP_API_BACKEND_GETALLAGENDA } from './data/data';
import axios from "axios";
import Moment from 'moment';

export default function calendarioPage({ navigation }) {
  const [listAllValues, setListAllValues] = useState([]);
  const [message, setMessage] = useState();
  const [messageerror, setMessageError] = useState();
  const [currentDate, setCurrentDate] = useState('');
  const [mes, setMes] = useState();
  const [dateString, setDateString] = useState();
  const [markDay, setMarkDay] = useState();
  const [dateFilter, setDateFilter] = useState([]);

  let markedDay = {};

  const values = useCallback(async () => {
    let filterAgenda = [];

    if (listAllValues != undefined) {
      listAllValues.map((item) => {
        if (item.data == dateString) {
          filterAgenda.push(item)
        }

        let sortedAsc = filterAgenda.sort((a, b) => {return a.data > b.data;})

        setDateFilter(sortedAsc);

      });
    }
  }, [setDateFilter, listAllValues])

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

    values();

  }, [listAllValues, setListAllValues, setMarkDay, setDateString, values]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/MonthNova.jpg')} style={styles.imageView} />
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

        {dateFilter != undefined && dateFilter.length > 0 ?
          dateFilter.map((lista) => (
            <>
              <View style={{ backgroundColor: '#D3D3D3', width: wp('90%'), height: hp('5%'), borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: hp('1%') }}>
                <Text style={{ fontSize: 16 }}>{Moment(lista.data).format('DD/MM')} - {lista.local} - {lista.horario}</Text>
              </View>
            </>
          ))
          :
          null
        }

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
    marginTop: hp('-33%')
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
