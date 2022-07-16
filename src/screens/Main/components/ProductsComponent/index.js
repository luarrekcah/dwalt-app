import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Card, FAB} from 'react-native-paper';
import Colors from '../../../../globalStyles/colors';

const Products = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Cover
          source={{
            uri: 'https://cdn.glitch.global/e3790b73-514c-45b3-a987-85c9a4b7481f/JINKO450W.jpg?v=1645209367065',
          }}
        />
        <Text style={styles.title}>KIT GERADOR 200KW - (127477-3)</Text>
        <Text style={styles.desc}>
          GF 1,8KWP JINKO TIGER PRO MONO 450W MIC 1.5KW 1MPPT MONO 220V
        </Text>
        <Text style={styles.value}>R$8.319,00</Text>
        <Text style={styles.time}>POSTADO DIA 17 DE FEV 2022</Text>
      </Card>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('NewProduct')}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 20,
    padding: 20,
  },
  imgGerador: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#009eef',
    fontWeight: 'bold',
  },
  desc: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'black',
  },
  value: {
    color: 'red',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  time: {
    textTransform: 'uppercase',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.color.primary,
  },
});

export default Products;
