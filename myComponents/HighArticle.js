import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import convertDate from '../utils/utils';

const HighArticle = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: props?.data?.image}} />
      </View>

      <View style={styles.text}>
        <Text style={styles.subtitle}>{props?.data?.subtitle}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {props?.data?.title}
        </Text>
        <Text style={styles.desc} numberOfLines={7}>
          {props?.data?.desc}
        </Text>

        <Text style={styles.date}>{convertDate(props?.data?.date)}</Text>
      </View>
    </View>
  );
};

export default HighArticle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 8,
  },
  imageContainer: {
    width: Dimensions.get('window').width - 32,
    height: 250,
  },
  image: {flex: 1, borderRadius: 4, resizeMode: 'cover'},
  text: {
    flex: 1,
  },
  subtitle: {paddingTop: 8, color: 'gray'},
  title: {
    flex: 1,
    paddingTop: 4,
    fontWeight: 'bold',
    fontSize: 21,
  },
  desc: {flex: 4, paddingTop: 4, paddingBottom: 8},
  date: {color: 'gray', paddingLeft: 6},
});
