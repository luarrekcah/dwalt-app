import React from 'react';
import {View, StyleSheet} from 'react-native';
import {FadeLoading} from 'react-native-fade-loading';

const Loading = () => {
  return (
    <View style={styles.container}>
      <FadeLoading
        style={styles.title}
        primaryColor="gray"
        secondaryColor="lightgray"
        duration={5000}
      />
      <FadeLoading
        style={styles.card}
        primaryColor="gray"
        secondaryColor="lightgray"
        duration={5000}
      />
      <FadeLoading
        style={styles.title}
        primaryColor="gray"
        secondaryColor="lightgray"
        duration={5000}
      />
      <FadeLoading
        style={styles.title}
        primaryColor="gray"
        secondaryColor="lightgray"
        duration={5000}
      />
      <FadeLoading
        style={styles.card}
        primaryColor="gray"
        secondaryColor="lightgray"
        duration={5000}
      />
      <FadeLoading
        style={styles.title}
        primaryColor="gray"
        secondaryColor="lightgray"
        duration={5000}
      />
      <FadeLoading
        style={styles.title}
        primaryColor="gray"
        secondaryColor="lightgray"
        duration={5000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    width: '100%',
    height: 25,
    marginVertical: 10,
  },
  card: {
    width: '100%',
    height: 150,
    marginVertical: 10,
  },
});

export default Loading;
