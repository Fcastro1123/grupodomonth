import React, { useState, useEffect, useCallback } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert, ImageBackground, TextInput, ActivityIndicator, Modal, Pressable, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CalendarList, Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Frames } from "frames-react-native";
import { APP_API_BACKEND_AGENDAR } from './data/data';
import axios from "axios";
import Moment from 'moment';

LocaleConfig.locales['br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezambro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.']
};
LocaleConfig.defaultLocale = 'br';

export default function agendaNew() {

  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);

  const [horario, setHorario] = useState('');
  const [local, setLocal] = useState('');
  const [evento, setEvento] = useState('');
  const [contato, setContato] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [valor, setValor] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [messageerror, setMessageError] = useState();
  const [Mes, setMes] = useState('');
  const [Ano, setAno] = useState();
  const [message, setMessage] = useState();
  const [status, setStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSaveVisible, setModalSaveVisible] = useState(false);
  const [dateFormated, setDateFormated] = useState('');
  const [mesSelected, setMesSelected] = useState('');


  const setAgenda = useCallback(async () => {

    setIsLoading(true);

    axios.post(APP_API_BACKEND_AGENDAR, {
      data: dateFormated,
      horario: horario,
      evento: evento,
      local: local,
      contato: contato,
      responsavel: responsavel,
      valor: valor,
      mes: mesSelected,
      ano: Ano,
      created_at: currentDate,

    }).then(res => {
      //console.log(res.status);
      setStatus(res.status);
      setMessage(res.data)

      if (status == 200) {
        setModalSaveVisible(true)
        setIsLoading(false);
      }


    })
      .catch(err => {
        setMessageError(err);
        console.log(messageerror);
        setIsLoading(false);
      })

  }, [setIsLoading, setModalSaveVisible]);



  useEffect(() => {
    var date = new Date().getDate();
    var mes = new Date().getMonth() + 1;
    var ano = new Date().getFullYear();
    var hours = new Date().getHours() - 4;
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    setCurrentDate(date + '/' + mes + '/' + ano + ' ' + hours + ':' + min);


  }, [setCurrentDate,
    setAno,
    setAgenda,
    setIsLoading,
    dateFormated,
    mesSelected,
    horario,
    evento,
    local,
    contato,
    responsavel,
    valor,
    Ano,

  ]);




  return (
    <View style={styles.container}>
      {/* <View>
        <ImageBackground source={require('../assets/grupo.jpg')} style={styles.imageView} />
      </View> */}
      <ScrollView>
        <View style={styles.calendarView}>
          <Calendar
            onDayPress={day => {
              const date = Moment(day.dateString).format('DD-MM-YYYY')
              setDateFormated(date);

            }}
            onMonthChange={mes => {
              //console.log('month changed', month);
              const mesSelect = mes.month;
              const anoSelect = mes.year;
              setMesSelected(mesSelect);
              setAno(anoSelect);
            }}
            // markedDates={{
            //   '2022-03-16': {selected: true, marked: true, selectedColor: 'green'},
            //   '2022-03-18': {selected: true, marked: true, selectedColor: 'green'},

            // }}

            // Agenda container style
            style={styles.calendar}
          />

        </View>

        <Frames style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center', backgroundColor: '#1C1C1C', width: wp('45%'), borderRadius: 5, padding: 7, marginTop: hp('1%'), marginLeft: 10 }}>
            <Text style={styles.textStyle}>{dateFormated}</Text>

          </View>
          <View style={{ alignItems: 'center', backgroundColor: '#1C1C1C', width: wp('45%'), borderRadius: 5, padding: 7, marginTop: hp('1%'), marginRight: 10 }}>
            <TextInput style={styles.textStyle} placeholder="Horário:" placeholderTextColor='#ffff' onChangeText={horario => setHorario(horario)} />

          </View>
        </Frames>

        <Frames style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View style={{ backgroundColor: '#1C1C1C', width: wp('95%'), borderRadius: 5, padding: 7, marginTop: hp('1%'), marginLeft: 10 }}>
            <TextInput style={styles.textStyle} placeholder="Local:" placeholderTextColor='#ffff' onChangeText={local => setLocal(local)} />

          </View>
        </Frames>

        <Frames style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View style={{ backgroundColor: '#1C1C1C', width: wp('95%'), borderRadius: 5, padding: 7, marginTop: hp('1%'), marginLeft: 10 }}>
            <TextInput style={styles.textStyle} placeholder="Evento:" placeholderTextColor='#ffff' onChangeText={evento => setEvento(evento)} />

          </View>
        </Frames>

        <Frames style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View style={{
            alignItems: 'center', backgroundColor: '#1C1C1C',
            width: wp('45%'), borderRadius: 5, padding: 7,
            marginTop: hp('1%'), marginLeft: 10
          }}>
            <TextInput style={styles.textStyle} placeholder="Contato:" placeholderTextColor='#ffff' onChangeText={contato => setContato(contato)} />

          </View>
          <View style={{
            alignItems: 'center', backgroundColor: '#1C1C1C',
            width: wp('45%'), borderRadius: 5, padding: 7, marginTop: hp('1%'), marginRight: 10
          }}>
            <TextInput style={styles.textStyle} placeholder="Responsável:" placeholderTextColor='#ffff' onChangeText={responsavel => setResponsavel(responsavel)} />

          </View>
        </Frames>

        <Frames style={{ flexDirection: "row", justifyContent: 'center' }}>
          <View style={{
            backgroundColor: '#1C1C1C', width: wp('50%'), borderRadius: 5,
            padding: 7, marginTop: hp('1%'), marginLeft: 10, alignItems: 'center'
          }}>
            <TextInput style={styles.textStyle} placeholder="Valor:" placeholderTextColor='#ffff' onChangeText={valor => setValor(valor)} />

          </View>
        </Frames>

        {/* <Frames style={{ flexDirection: "row", justifyContent: 'center' }}>
        <View style={{
          backgroundColor: 'transparent', width: wp('95%'), borderRadius: 5,
          padding: 10, marginTop: hp('1%'), marginLeft: 10, alignItems: 'center'
        }}>
          <Text style={{ color: '#EEDD82', fontSize: 16, marginTop: hp('-2%') }}>Não esquecer a consumação e o som</Text>

        </View>
      </Frames> */}

        <View style={{ backgroundColor: 'transparent', padding: 10, marginTop: hp('-16%'), alignItems: 'center' }}>

          <ActivityIndicator animating={isLoading} size="large" color="#B8860B" style={{ scaleX: 1.5, scaleY: 1.5, marginTop: hp('-8%') }} />

        </View>

        <TouchableOpacity onPress={setAgenda} style={{ padding: hp('2%'), marginTop: hp('15%'), marginLeft: hp('3%'), backgroundColor: '#000', width: wp('90%'), alignItems: 'center', borderRadius: hp('10%') }}>
          <Text style={{ color: '#B8860B', fontSize: 22 }} >Marcar</Text>
        </TouchableOpacity>



        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}>

            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Preencher todos os dados!!!</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyleModal}>Return</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalSaveVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalSaveVisible(!modalVisible);
            }}>

            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{message}</Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalSaveVisible(!modalSaveVisible)}>
                  <Text style={styles.textStyleModal}>Return</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>

      </ScrollView>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#363636',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('4%')
  },
  calendarView: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: wp('100%')

  },
  calendar: {
    width: wp('100%'),


  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: hp('10%'),

  },
  imageView: {
    width: wp('100%'),
    height: hp('25%'),

  },
  textStyle: {
    fontSize: wp('5%'),
    color: '#ffff'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp('10%')
  },
  modalView: {
    margin: hp('15%'),
    backgroundColor: "white",
    borderRadius: hp('3%'),
    padding: hp('3%'),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: wp('0%'),
      height: hp('3%')
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: hp('1%')
  },
  button: {
    borderRadius: hp('1%'),
    padding: hp('1%'),
    elevation: hp('0.5%'),
    width: wp('40%')
  },
  buttonClose: {
    backgroundColor: "#000",
  },
  textStyleModal: {
    color: "#B8860B",
    fontWeight: "bold",
    textAlign: "center"
  },
  textBtnStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: hp('3%')

  },
  modalText: {
    marginBottom: hp('5%'),
    textAlign: "center"
  }


});
