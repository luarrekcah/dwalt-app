/* eslint-disable no-unused-vars */
import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Alert,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {TextInput, Checkbox, Text, Button} from 'react-native-paper';
import database from '@react-native-firebase/database';
import Geolocation from 'react-native-geolocation-service';
import Colors from '../../globalStyles/colors';

const RegistrarCliente = ({navigation}) => {
  const [forceLocation, setForceLocation] = React.useState(true);
  const [highAccuracy, setHighAccuracy] = React.useState(true);
  const [locationDialog, setLocationDialog] = React.useState(true);
  const [useLocationManager, setUseLocationManager] = React.useState(false);
  const [location, setLocation] = React.useState(null);

  const [cod, setCod] = React.useState('');
  const [nome, setNome] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [datanasc, setDatanasc] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [celular, setCelular] = React.useState('');
  const [nomemae, setNomemae] = React.useState('');
  const [rg, setRg] = React.useState('');
  const [patrimonio, setPatrimonio] = React.useState('');
  const [ocupacao, setOcupacao] = React.useState('');
  const [profissao, setProfissao] = React.useState('');
  const [anosatuando, setAnosatuando] = React.useState('');
  const [mesesatuando, setMesesatuando] = React.useState('');
  const [renda, setRenda] = React.useState('');
  const [endereco, setEndereco] = React.useState('');

  const [sexoM, setSexoM] = React.useState(true);
  const [sexoF, setSexoF] = React.useState(false);
  const [casado, setCasado] = React.useState(false);
  const [solteiro, setSolteiro] = React.useState(true);

  const [enviado, setEnviado] = React.useState(false);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position);
        console.log(position);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
      },
    );
  };

  const checkSexo = () => {
    if (sexoM) {
      return 'Masculino';
    } else {
      return 'Feminino';
    }
  };

  const checkEstadoCivil = () => {
    if (casado) {
      return 'Casado(a)';
    } else {
      return 'Solteiro(a)';
    }
  };

  const enviarDados = () => {
    let clientes = [];
    database()
      .ref('/clientes')
      .once('value')
      .then(snapshot => {
        if (snapshot.val() !== null) {
          clientes = snapshot.val();
        }
        clientes.push({
          cod,
          nome,
          cpf,
          datanasc,
          email,
          celular,
          nomemae,
          rg,
          sexo: checkSexo(),
          estadocivil: checkEstadoCivil(),
          patrimonio,
          ocupacao,
          profissao,
          anosatuando,
          mesesatuando,
          renda,
          endereco,
          location,
        });

        database()
          .ref('/clientes')
          .set(clientes)
          .then(() => {
            setEnviado(true);
            navigation.navigate('GenCustomers');
          });
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={styles.space}
          label="Código do Produto"
          value={cod}
          onChangeText={newText => setCod(newText)}
        />
        <TextInput
          style={styles.space}
          label="Nome Completo"
          value={nome}
          onChangeText={newText => setNome(newText)}
        />
        <TextInput
          style={styles.space}
          label="CPF"
          value={cpf}
          onChangeText={newText => setCpf(newText)}
        />
        <TextInput
          style={styles.space}
          label="Data de Nascimento"
          value={datanasc}
          onChangeText={newText => setDatanasc(newText)}
        />
        <TextInput
          style={styles.space}
          label="Email"
          value={email}
          onChangeText={newText => setEmail(newText)}
        />
        <TextInput
          style={styles.space}
          label="Celular"
          value={celular}
          onChangeText={newText => setCelular(newText)}
        />
        <TextInput
          style={styles.space}
          label="Nome da Mãe"
          value={nomemae}
          onChangeText={newText => setNomemae(newText)}
        />
        <TextInput
          style={styles.space}
          label="RG"
          value={rg}
          onChangeText={newText => setRg(newText)}
        />
        <View style={styles.checkBoxes}>
          <Text>Masculino</Text>
          <Checkbox
            status={sexoM ? 'checked' : 'unchecked'}
            onPress={() => {
              setSexoM(!sexoM);
              setSexoF(!sexoF);
            }}
          />
          <Text>Feminino</Text>
          <Checkbox
            status={sexoF ? 'checked' : 'unchecked'}
            onPress={() => {
              setSexoF(!sexoF);
              setSexoM(!sexoM);
            }}
          />
        </View>
        <View style={styles.checkBoxes}>
          <Text>Casado(a)</Text>
          <Checkbox
            status={casado ? 'checked' : 'unchecked'}
            onPress={() => {
              setCasado(!casado);
              setSolteiro(!solteiro);
            }}
          />
          <Text>Solteiro(a)</Text>
          <Checkbox
            status={solteiro ? 'checked' : 'unchecked'}
            onPress={() => {
              setSolteiro(!solteiro);
              setCasado(!casado);
            }}
          />
        </View>
        <TextInput
          style={styles.space}
          label="Patrimônio"
          value={patrimonio}
          onChangeText={newText => setPatrimonio(newText)}
        />
        <TextInput
          style={styles.space}
          label="Ocupação"
          value={ocupacao}
          onChangeText={newText => setOcupacao(newText)}
        />
        <TextInput
          style={styles.space}
          label="Profissão"
          value={profissao}
          onChangeText={newText => setProfissao(newText)}
        />
        <TextInput
          style={styles.space}
          label="Anos Atuando"
          value={anosatuando}
          onChangeText={newText => setAnosatuando(newText)}
        />
        <TextInput
          style={styles.space}
          label="Meses Atuando"
          value={mesesatuando}
          onChangeText={newText => setMesesatuando(newText)}
        />
        <TextInput
          style={styles.space}
          label="Renda Mensal"
          value={renda}
          onChangeText={newText => setRenda(newText)}
        />
        <TextInput
          style={styles.space}
          label="Endereço Completo"
          value={endereco}
          onChangeText={newText => setEndereco(newText)}
        />
        <View style={styles.buttonsGroup}>
          <Button
            style={styles.button}
            icon="camera"
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Adicionar Fotos (NÃO FUNCIONAL)
          </Button>
          {location === null ? (
            <Button
              style={styles.button}
              icon="crosshairs-gps"
              mode="contained"
              onPress={() => {
                getLocation();
              }}>
              Adicionar Localização Atual
            </Button>
          ) : (
            <Button
              style={styles.sucessButton}
              icon="check"
              mode="contained"
              onPress={() => {
                getLocation();
              }}>
              Localização Adicionada
            </Button>
          )}
          {enviado === false ? (
            <Button
              style={styles.button}
              icon="send"
              mode="contained"
              onPress={() => enviarDados()}>
              Enviar
            </Button>
          ) : (
            <Button style={styles.sucessButton} icon="check" mode="contained">
              Enviado
            </Button>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  space: {
    marginBottom: 10,
  },
  checkBoxes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  button: {
    width: '100%',
    margin: 10,
    backgroundColor: Colors.color.primary,
  },
  sucessButton: {
    backgroundColor: 'green',
    width: '100%',
    margin: 10,
  },
});

export default RegistrarCliente;
