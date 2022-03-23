import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useState, useEffect } from "react";
import InitialPage from './initialPage';
//import axios from "axios";
import {
    ImageBackground,
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Animated,
    Keyboard,
    View,
    Modal,
    Text,
    Pressable,
    Alert,
    ActivityIndicator,
} from "react-native";

export default function loginPage({ navigation }) {
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
    const [opacity] = useState(new Animated.Value(0));
    const [buttonLogo] = useState(new Animated.ValueXY({ x: wp('37%'), y: hp('15%') }));
    const [logo] = useState(new Animated.ValueXY({ x: wp('90%'), y: hp('15%') }));
    const [modalLoginVisible, setModalLoginVisible] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [Message, setMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const tryLogin = async () => {
        if (!email.trim() || !senha.trim()) {
            setMessage('Usuário e senha são obrigatórios!!!')
            setModalVisible(true)
            return
        }
        setAnimating(true);        

        navigation.navigate(InitialPage);


        setAnimating(false);


    }

    useEffect(() => {

        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            })
        ]).start();
    }, [setMessage]);

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(buttonLogo.x, {
                toValue: wp('25%'),
                duration: 100,
                useNativeDriver: false
            }),

            Animated.timing(buttonLogo.y, {
                toValue: hp('10%'),
                duration: 100,
                useNativeDriver: false
            }),

            Animated.timing(logo.x, {
                toValue: wp('60%'),
                duration: 100,
                useNativeDriver: false
            }),

            Animated.timing(logo.y, {
                toValue: hp('10%'),
                duration: 100,
                useNativeDriver: false
            }),
        ]).start();
    }

    function keyboardDidHide() {

        Animated.parallel([
            Animated.timing(buttonLogo.x, {
                toValue: wp('37%'),
                duration: 100,
                useNativeDriver: false

            }),
            Animated.timing(buttonLogo.y, {
                toValue: hp('15%'),
                duration: 100,
                useNativeDriver: false

            }),

            Animated.timing(logo.x, {
                toValue: wp('90%'),
                duration: 100,
                useNativeDriver: false
            }),

            Animated.timing(logo.y, {
                toValue: hp('15%'),
                duration: 100,
                useNativeDriver: false
            }),
        ]).start();

    }

    return (
        <ImageBackground source={require('../assets/loginMonth.png')} style={styles.image}>
            <KeyboardAvoidingView style={styles.background}>

                <Animated.View style={[styles.containerinput, {
                    opacity: opacity,
                    transform: [
                        { translateY: offset.y }
                    ]
                }
                ]} >

                    <Animated.Image
                        style={{
                            width: logo.x,
                            height: logo.y,
                            resizeMode: 'contain',
                            marginTop: hp('-5%'),
                            marginBottom: hp('5%')

                        }}
                        source={require('../assets/logoMonth.png')} />

                    <TextInput style={styles.input}
                        placeholder="Usuário"
                        autoCorrect={false}
                        lowercase={true}
                        onChangeText={email => setEmail(email)}
                    />
                    <TextInput style={styles.input}
                        placeholder="Senha"
                        autoCorrect={false}
                        keyboardType="numeric"
                        onChangeText={senha => setSenha(senha)}
                        secureTextEntry={true}
                    />

                    <TouchableOpacity disabled={animating} onPress={tryLogin} style={styles.btnsubmit} >
                        <Text style={styles.textBtnStyle}>Login</Text>

                    </TouchableOpacity>

                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator animating={animating} size="large" color="#CDAD00" style={{ scaleX: 1.7, scaleY: 1.7, marginTop: hp('10%') }} />
                    </View>


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
                                    <Text style={styles.modalText}>{Message}</Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalVisible(!modalVisible)}>
                                        <Text style={styles.textStyle}>Return</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>

                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalLoginVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalLoginVisible);
                            }}>

                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>Usuário não encontrado!!!</Text>
                                    <Pressable
                                        style={[styles.button, styles.buttonClose]}
                                        onPress={() => setModalLoginVisible(!modalLoginVisible)}>
                                        <Text style={styles.textStyle}>Return</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>

                </Animated.View>

            </KeyboardAvoidingView>

        </ImageBackground>

    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerinput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: hp('2%'),
        resizeMode: "cover",
        marginTop: hp('18%')
    },
    input: {
        backgroundColor: '#fff',
        color: '#191970',
        fontSize: hp('3%'),
        borderRadius: hp('2%'),
        padding: hp('2%'),
        margin: hp('1%'),
        justifyContent: 'flex-start',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: '#03267f',
        width: wp('85%')
    },
    btnsubmit: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('85%'),
        height: hp('8%'),
        backgroundColor: '#4e8896',
        borderRadius: hp('2%'),
        marginTop: hp('2%')
    },
    image: {
        flex: 1,

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
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
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

