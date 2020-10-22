import React from 'react';
import {Image, Text, StyleSheet, View, Dimensions} from 'react-native';

const HomeHeader = (props) => (
  <View style={([styles.container], props.style)}>
    <Image
      style={styles.image}
      source={require('../assets/logo.png')}
      resizeMode={'contain'}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {backgroundColor: 'white'},
  image: {height: '100%', width: '100%'},
});
export default HomeHeader;
