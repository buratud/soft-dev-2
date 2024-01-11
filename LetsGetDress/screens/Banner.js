import { View, Text, ScrollView, StatusBar, StyleSheet, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, {Component, useEffect, useState} from 'react'
import axios from 'axios'

const AppText = (props) => (
    <Text {...props} style={{fontFamily: "Cuprum-VariableFont_wght", ...props.style, fontSize: 18}}>{props.children}</Text>
  )


// const images = [
//   // require('../assets/clothes/cropped-bustier-top.jpg'),
//   // require('../assets/clothes/fine-knit-cardigan.jpg'),
//   // require('../assets/clothes/flared-twill-trousers.jpg'),
//   // require('../assets/clothes/off-the-shoulder-jumper.jpg'),
//   'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/44dad440378bbb07c6bffc32d4f77875c254e7b3_xxl-1.jpg',
//   'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/e6d4519d1facfae8f8247a82a31cd3c4b00ba8b1_xxl-1.jpg',
//   'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/0a7ad50cc0522ec45b352a2aa511872b63986f9e_xxl-1.jpg',
//   'https://d29c1z66frfv6c.cloudfront.net/pub/media/catalog/product/zoom/2e023236758ed9a5e4c4504aa019f56cc2198d54_xxl-1.jpg',
// ]

// console.log("oldIMG: "+images)

const Banner = () => {
  const [imgActive, setimgActive] = useState(0);
  const [dataCloth, setDataCloth] = useState([]);
  const url = "http://192.168.167.90:3360/new_clothes";

  useEffect(() => {
    axios.get(url)
      .then(response => {
        const data = response.data;
        if (data.status === 'success') {
          if (Array.isArray(data.message)) {
            setDataCloth(data.message);
            console.log('clotheeeee',data.message[0].PIC)
          }
        }
      })
      .catch(error => {
        console.error("AXIOS ERROR:", error);
      });
  }, []);
 
onchange = (nativeEvent) => {
  if (nativeEvent) {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
    if (slide != imgActive) {
      setimgActive(slide)
    }
  }
 } 

const Images = dataCloth.map(item => item.PIC);
console.log('dataCloth',dataCloth.map(item => item.PIC))
console.log("IMG: "+Images)

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.bannerCon}>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}
        >
          {
            Images.map((e, index) => (
              <Image
                key={index}
                resizeMode='center'
                style={styles.wrap}
                source={{ uri: e }}
              />
            ))
          }
          {/* {dataCloth.reverse().map((event, index) => {
            return <EventCard key={index} link={event.link} eventName={event.eventName} detailName={event.detailName} date={event.date} />
          })} */}
        </ScrollView>
        <View style={styles.wrapDot}>
          {
            Images.map((e, index) => (
              <Text
                key={e}
                style={imgActive === index ? styles.dotActive : styles.dot}
              >
                ●
              </Text>
            ))
          }
        </View>
      </View>
    </View>
  </SafeAreaView>
);
};

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.bannerCon}>
//         <View style={styles.wrap}>
//           <ScrollView
//             onScroll = {({nativeEvent}) => onchange(nativeEvent)}
//             showsHorizontalScollIndicator = {false}
//             pagingEnabled
//             horizontal
//             style={styles.wrap}
//           >
//             {
//               Images.map((e, index) =>
//               <Image
//               key={e}
//               resizeMode = 'center'
//               style={styles.wrap}
//               source = {{uri: e}}
//               />
//               )
//             }
//           </ScrollView>
//           {/* <Text style={{fontFamily: "Cuprum-VariableFont_wght", fontSize: 20, color: 'black', marginRight: 'auto', transform: 'rotateZ(-20deg)', marginLeft: 10, top:-320}}>New arrival</Text> */}
//           <View style={styles.wrapDot}>
//             {
//               Images.map((e, index) =>
//               <Text
//                   key = {e}
//                   style={imgActive == index ? styles.dotActive : styles.dot} 
//               > 
//                 ● 
//               </Text>
//               )
//             }

//           </View>
//         </View>

//       </View>
//     </SafeAreaView>
//   )
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    bannerCon: {
      justifyContent: 'center',
      // width: Dimensions.get('window').width *0.9,
      // height: Dimensions.get('window').height * 0.45,
      alignItems: 'center',
      backgroundColor: '#f4f4f4',
      borderRadius: 15,
      overflow: 'hidden'
    },
    wrap: {
      width: Dimensions.get('window').width *0.9,
      height: Dimensions.get('window').height * 0.45,
      backgroundColor: '#f4f4f4',
      borderRadius: 15,
      top: 0
    },
    wrapDot: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      alignSelf: 'center',
    },
    dotActive: {
      margin: 3,
      color: 'black',
    },
    dot: {
      margin: 3,
      color: 'white',
    }
})

export default Banner
