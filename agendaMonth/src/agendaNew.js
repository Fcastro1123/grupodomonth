import React, { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Alert, ImageBackground, TextInput, ActivityIndicator, Modal, Pressable, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CalendarList, Calendar, LocaleConfig } from 'react-native-calendars';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Frames } from "frames-react-native";
import { APP_API_BACKEND_AGENDAR } from './data/data';
import axios from "axios";
import Moment from 'moment';

LocaleConfig.locales['br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
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
  const [dateMoment, setDateMoment] = useState('');
  const [mesSelected, setMesSelected] = useState('');
  const [dateFormat, setDateFormat] = useState('');

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();

  const trySave = () => {
    if (!dateMoment.trim() || !horario.trim() || !evento.trim() || !local.trim() || !contato.trim() || !responsavel.trim() || !valor.trim()) {
      setMessage('Todos os campos são obrigatórios!!!')
      setModalVisible(true)
      
      return
    }
    setIsLoading(true);

    axios.post(APP_API_BACKEND_AGENDAR, {
      data: dateMoment,
      horario: horario,
      evento: evento,
      local: local,
      contato: contato,
      responsavel: responsavel,
      valor: valor,
      mes: mesSelected,
      ano: Ano,
      created_at: dateFormat,

    }).then(res => {            
      setStatus(res.status);
      setMessage(res.data)

      if (status == 200) {
        setModalSaveVisible(true)
        setIsLoading(false);
      }
      else{
        setModalVisible(true)
        setIsLoading(false);
      }


    })
      .catch(err => {
        setMessageError(err);
        console.log(messageerror);
        setIsLoading(false);
      })    


    setIsLoading(false);

} 


  useEffect(() => {
    var date = new Date();
    setDateFormat(Moment(date).format('DD-MM-YYYY'))     
     
    

  }, [setDateFormat,    
    setIsLoading,
    setModalSaveVisible,
    setModalVisible,
    currentDate,
    modalSaveVisible,
    modalVisible,
    dateFormated,
    dateMoment,
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
      <ScrollView>
        <View style={styles.calendarView}>
          <Calendar
            onDayPress={day => {
              const date = Moment(day.dateString).format('DD-MM-YYYY')
              setDateFormated(date);
              setDateMoment(day.dateString)
              setMesSelected(day.month);
              setAno(day.year);              

            }}            
            
            style={styles.calendar}
          />

        </View>

        <Frames style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View style={{ alignItems: 'center', backgroundColor: '#1C1C1C', width: wp('45%'), borderRadius: 5, padding: 7, marginTop: hp('1%'), marginLeft: 10 }}>
            <Text style={styles.textStyle}>{dateFormated}</Text>

          </View>
          <View style={{ alignItems: 'center', backgroundColor: '#1C1C1C', width: wp('45%'), borderRadius: 5, padding: 7, marginTop: hp('1%'), marginRight: 10 }}>
            <TextInput style={styles.textStyle} placeholder="Horário:" placeholderTextColor='#ffff' autoFocus={false} returnKeyType="next" onSubmitEditing={() => ref_input2.current.focus()} onChangeText={horario => setHorario(horario)} />

          </View>
        </Frames>

        <Frames style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View style={{ backgroundColor: '#1C1C1C', width: wp('95%'), borderRadius: 5, padding: 7, marginTop: hp('1%'), marginLeft: 10 }}>
            <TextInput style={styles.textStyle} placeholder="Local:" placeholderTextColor='#ffff' returnKeyType="next" onSubmitEditing={() => ref_input3.current.focus()}  ref={ref_input2} onChangeText={local => setLocal(local)} />

          </View>
        </Frames>

        <Frames style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View style={{ backgroundColor: '#1C1C1C', width: wp('95%'), borderRadius: 5, padding: 7, marginTop: hp('1%'), marginLeft: 10 }}>
            <TextInput style={styles.textStyle} placeholder="Evento:" placeholderTextColor='#ffff' returnKeyType="next" onSubmitEditing={() => ref_input4.current.focus()}  ref={ref_input3} onChangeText={evento => setEvento(evento)} />

          </View>
        </Frames>

        <Frames style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <View style={{
            alignItems: 'center', backgroundColor: '#1C1C1C',
            width: wp('45%'), borderRadius: 5, padding: 7,
            marginTop: hp('1%'), marginLeft: 10
          }}>
            <TextInput style={styles.textStyle} placeholder="Contato:" placeholderTextColor='#ffff' returnKeyType="next" onSubmitEditing={() => ref_input5.current.focus()}  ref={ref_input4} onChangeText={contato => setContato(contato)} />

          </View>
          <View style={{
            alignItems: 'center', backgroundColor: '#1C1C1C',
            width: wp('45%'), borderRadius: 5, padding: 7, marginTop: hp('1%'), marginRight: 10
          }}>
            <TextInput style={styles.textStyle} placeholder="Responsável:" placeholderTextColor='#ffff' returnKeyType="next" onSubmitEditing={() => ref_input6.current.focus()}  ref={ref_input5} onChangeText={responsavel => setResponsavel(responsavel)} />

          </View>
        </Frames>

        <Frames style={{ flexDirection: "row", justifyContent: 'center' }}>
          <View style={{
            backgroundColor: '#1C1C1C', width: wp('50%'), borderRadius: 5,
            padding: 7, marginTop: hp('1%'), marginLeft: 10, alignItems: 'center'
          }}>
            <TextInput style={styles.textStyle} keyboardType="numeric" placeholder="Valor:" placeholderTextColor='#ffff' ref={ref_input6} onChangeText={valor => setValor(valor)} />

          </View>
        </Frames>        

        <View style={{ backgroundColor: 'transparent', padding: 10, marginTop: hp('-16%'), alignItems: 'center' }}>

          <ActivityIndicator animating={isLoading} size="large" color="#B8860B" style={{ scaleX: 1.5, scaleY: 1.5, marginTop: hp('-8%') }} />

        </View>

        <TouchableOpacity onPress={trySave} style={{ padding: hp('2%'), marginTop: hp('15%'), marginLeft: hp('3%'), backgroundColor: '#000', width: wp('90%'), alignItems: 'center', borderRadius: hp('10%') }}>
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
                <Text style={styles.modalText}>{message}</Text>
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
