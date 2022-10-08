import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const TextRender = ({label, value}: any) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.labelText}>{label}: </Text>
      <Text style={styles.valueText}>{value}</Text>
    </View>
  );
};

export default TextRender;

const styles = StyleSheet.create({
  mainContainer: {flexDirection: 'row', alignItems: 'center'},
  labelText: {fontSize: 16, fontWeight: 'bold'},
  valueText: {fontSize: 14},
});
