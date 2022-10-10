import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import TextRender from './TextRender'
import Counter from './Counter'
import { ProductListResponse } from '../screens/ProductList/ProductList'

export interface RenderItemProps {
    item: ProductListResponse
}
const RenderProductItem = ({item}: RenderItemProps) => {
  return (
    <View style={styles.itemContainer} testID='item-list'>
    <Image
      style={styles.imgContainer}
      source={{
        uri: item.id === 1 ? item.img.replace('http', 'https') : item.img,
      }}
      resizeMode="stretch"
    />
    <View style={styles.subViewContainer}>
      <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
      <View style={styles.descriptionContainer}>
        <View style={{marginTop: 10}}>
          <TextRender label="Color" value={item.colour} />
          <TextRender label="Price" value={`$${item.price}`} />
        </View>
        <Counter item={item}/>
      </View>
    </View>
  </View>
  )
}

export default RenderProductItem

const styles = StyleSheet.create({
    itemContainer: {
      marginHorizontal: 8,
      marginBottom: 15,
      borderWidth: 0.5,
      borderRadius: 5,
      flex: 1,
      borderColor: 'lightgrey',
      shadowColor: 'rgb(0, 0, 0)',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
      backgroundColor: 'white',
      paddingBottom: 5,
    },
    imgContainer: {
      height: 250,
      width: '100%',
      overflow: 'hidden',
      borderRadius: 5,
    },
    subViewContainer: {
      justifyContent: 'space-between',
      flex: 1,
      paddingHorizontal: 5,
    },
    descriptionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginEnd: 5,
    },
  });