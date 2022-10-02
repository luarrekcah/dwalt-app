import React from 'react';
import {Modal, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import Colors from '../globalStyles/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const AlertModal = ({data, onPress, visible, onClose}) => {
  if (data !== null) {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon name={data.icon} size={60} color={Colors.color.primary} />
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.description}>{data.description}</Text>
              {data.loading ? (
                <ActivityIndicator size="large" color={Colors.color.primary} />
              ) : (
                ''
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.color.primary,
  },
  description: {
    color: '#000000',
  },
});

export default AlertModal;
