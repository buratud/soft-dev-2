import { View, Text, ScrollView, StatusBar, StyleSheet, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const EventCard = (props) => {
  const {link, eventName, detailName, date } = props;
  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.ImgCon1}>
        <Image style={styles.ImgCon} source={{ uri: link }} />
      </View>
      <Text style={styles.eventName}>{eventName}</Text>
      <Text style={styles.detailName}>{detailName}</Text>
      <Text style={styles.dateName}>{date}</Text>
    </View>
  )
}

const NewContent = () => {
  const url = "http://192.168.167.90:3360/new_content";
  const [EventData, setEventData] = useState([]);
  useEffect(() => {
    axios.get(url)
      .then(response => {
        const data = response.data;
        // console.log("API response:", data);
        if (data.status === 'success' && Array.isArray(data.message)) {
          const newEventData = data.message.map(event => ({
            key: event.CONTENT_ID,
            link: event.PIC,
            eventName: event.TITLE,
            detailName: event.DETAIL,
            date: event.DATE
          }));
          // console.log("New EventData:", newEventData);
          setEventData(newEventData);
        } else {
          console.error("Unexpected data structure");
        }
      })
      .catch(error => {
        console.error("AXIOS ERROR:", error);
      });
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.insideCon}>
          {/* <View style={styles.ImgCon1}>
            <Image style={styles.ImgCon} source={{ uri: 'https://i.pinimg.com/736x/5c/33/c1/5c33c10bf16cbb56aeef599352830f01.jpg' }} />
          </View>
          <Text style={styles.eventName}>Black Pink</Text>
          <Text style={styles.detailName}>World tour Born Pink</Text>
          <Text style={styles.dateName}>14.11.23</Text>
          <View style={styles.ImgCon}>
            <Image style={styles.ImgCon} source={{uri: 'https://cdn.kpopconcerts.com/wp-content/uploads/2022/08/04114609/2022-TOUR-SEVENTEEN-BE-THE-SUN-NORTH-AMERICA-tour-poster-1350x1909.jpg'}} />
          </View>
          <Text style={styles.eventName}>Seventeen</Text>
          <Text style={styles.detailName}>World tour Be the Sun</Text>
          <Text style={styles.dateName}>09.12.23</Text>
          <View style={styles.ImgCon}>
            <Image style={styles.ImgCon} source={{uri: 'http://cdn.designbump.com/wp-content/uploads/2015/12/colorful-christmas-trees-inspiration-5.jpg'}} />
          </View>
          <Text style={styles.eventName}>Christmas</Text>
          <Text style={styles.dateName}>25.12.23</Text>
          <View style={styles.ImgCon}>
            <Image style={styles.ImgCon} source={{uri: 'https://image.freepik.com/free-vector/minimal-valentine-heart-background_76243-44.jpg'}} />
          </View>
          <Text style={styles.eventName}>Valenstine</Text>
          <Text style={styles.dateName}>14.02.23</Text> */}
          {EventData.map((event, index) => {
            return <EventCard key={index} link={event.link} eventName={event.eventName} detailName={event.detailName} date={event.date} />
          })}
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#FAEBDC',
    justifyContent: 'center',
    flex: 1
  },
  scrollView: {
    backgroundColor: "black",
    width: Dimensions.get('window').width,
    flex: 1,
    elevation: 10
  },
  ImgCon: {
    width: 300,
    height: 410,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    // elevation: 10
  },
  ImgCon1: {
    width: 300,
    height: 410,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    elevation: 10
  },
  insideCon: {
    width: '90%',
    backgroundColor: '#FAEBDC',
    alignItems: 'center',
    padding: 20
  },
  eventName: {
    fontFamily: 'Cuprum-Bold',
    fontSize: 50,
    color: 'black',
    paddingTop: 10,
  },
  dateName: {
    fontFamily: "Cuprum-VariableFont_wght",
    fontSize: 25,
    color: 'black',
    paddingBottom: 30
  },
  detailName: {
    fontFamily: "Cuprum-Bold",
    fontSize: 30,
    color: 'black',
  }

}
)

export default NewContent