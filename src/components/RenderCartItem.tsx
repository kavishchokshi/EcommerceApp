import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import TextRender from './TextRender'
import Counter from './Counter' 
import { RenderItemProps } from './RenderProductItem'

const RenderCartItem = ({item}: RenderItemProps) => {
  return (
    <View style={styles.itemContainer} testID='cart-list'>
    <Image
      source={{
        uri: item.id === 1 ? item.img.replace('http', 'https') : item.img,
      }}
      style={styles.imgContainer}
      resizeMode="stretch"
    />
    <View style={{flex: 1}}>
      <Text style={styles.titleText}>{item.name}</Text>
      <View style={styles.textRender}>
        <TextRender label="Color" value={item.colour} />
        <TextRender label="Price" value={`$${item.price}`} />
      </View>
      <View style={styles.countView}>
        <Text style={{fontWeight: 'bold'}}>
          Total: <Text>${item.count ?? 0 * item.price}</Text>
        </Text>
        <Counter item={item} />
      </View>
    </View>
  </View>
  )
}
export default RenderCartItem

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 10,
        borderWidth: 1,
        flexDirection: 'row',
        marginBottom: 10,
        borderRadius: 8,
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
      },
      imgContainer: {
        width: 100,
        height: 120,
        borderRadius: 8,
        overflow: 'hidden',
        marginEnd: 5,
      },
      titleText: {
        flexWrap: 'wrap',
        marginBottom: 15,
        fontWeight: 'bold',
        marginTop: 5,
        marginEnd: 3,
      },
      textRender: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginEnd: 20,
      },
      countView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginEnd: 20,
      },
})