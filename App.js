import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import LottieView from 'lottie-react-native';

export default function App() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [titulo, setTitulo] = useState('');

  let animacao = null;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    if (currentDate === undefined) return;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };


  return (

    <View style={styles.container}>
      <TextInput 
        style={styles.titulo} 
        placeholder="Meu evento" 
        value={titulo}
        onChangeText={(titulo) => setTitulo(titulo)}
        />
      <View style={styles.seletoresContainer}>
        <View style={styles.seletores}>
          <Button onPress={showDatepicker} title="Data" />
        </View>
        <View style={styles.seletores}>
          <Button onPress={showTimepicker} title="Hora" />
        </View>
      </View>
      { date && (
        <View style={styles.Data}>
          <Text style={styles.dataItem}>
            {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}{"\n"}
            {date.getHours() + ':' + date.getMinutes()}
            </Text>
        </View>
      )}
      <View style={styles.copiar}>
        <Button title="COPIAR LINK DO EVENTO" onPress={() => { 
          copiarLink(titulo, date);
          animacao.play();
        }} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
          minimumDate={new Date()}
          minuteInterval={5}
        />
      )}
      <View>
        <LottieView
          ref={animacaoGato => {
            animacao = animacaoGato
          }}
          loop={false}
          style={{
            height: 170,
            paddingStart: 55,
          }}
          source={require('./assets/gatinho.json')}
        />
      </View>
    </View>
  );
}

function gerarLink(tituloDecodificado, data) {
  let titulo = encodeURIComponent(tituloDecodificado);
  ano = data.getFullYear();
  mes = data.getMonth() + 1;
  dia = data.getDate();
  hora = data.getHours();
  minutos = data.getMinutes();
  let link = `https://globaltimekeeper.com/countdown.php?yr=${ano}&mo=${mes}&dy=${dia}&hr=${hora}&mi=${minutos}&ad=1&tz=America%2FSao_Paulo&tx1=${titulo}&tx2=&ln=en&cl=3&bg=1`;
  return link;
}

function copiarLink(titulo, data) {
  Clipboard.setString(gerarLink(titulo, data));
  ToastAndroid.show('Link copiado com successo', ToastAndroid.SHORT);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 8,
    marginTop: 12,
  },
  seletoresContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  Data: {
    display: 'flex',
    flexDirection: 'row',
  },
  dataItem: {
    marginHorizontal: 4,
    color: 'black',
    fontSize: 32,
    textAlign: 'center',
  },
  seletores: {
    margin: 16,
  },
  copiar: {
    marginTop: 16,
  },
});
