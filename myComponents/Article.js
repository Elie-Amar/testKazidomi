import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const Article = (props) => {
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center'}}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri: props?.data?.image}} />
        </View>
      </View>
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1}>
          {props?.data?.title}
        </Text>
        <Text style={styles.desc} numberOfLines={5}>
          {props?.data?.desc}
        </Text>
      </View>
    </View>
  );
};

export default Article;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
  },
  imageContainer: {
    width: 86,
    height: 116,
  },
  image: {flex: 1, borderRadius: 4, resizeMode: 'cover'},
  text: {
    flexDirection: 'column',
    flex: 1,
    paddingLeft: 8,
  },

  title: {flex: 1, paddingBottom: 8, fontWeight: 'bold'},
  desc: {},
});
