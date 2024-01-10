import { View, Text, ScrollView, StatusBar, StyleSheet, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import axios from 'axios'

  // const selectedPlace = 

  const DropdownComponent = ({ setPlace }) => {

      const [value, setValue] = useState(null);
      const [isFocus, setIsFocus] = useState(false);
      const url = "http://192.168.167.90:3360/place";
      const [dataPlace, setDataPlace] = useState([]);
    
      useEffect(() => {
        axios.get(url)
        .then(response => {
          const data = response.data;
          console.log("API response:", data);
          
          if (data.status === 'success') {
            if (Array.isArray(data.results)) {
              const newDataPlace = data.results.map(item => ({
                label: item.CHOICE,
                value: item.PLACE_ID,
              }));
              console.log("New dataPlace:", newDataPlace);
              setDataPlace(newDataPlace);
            } else if (data.results && typeof data.results.CHOICE === 'string' && typeof data.results.PLACE_ID === 'string') {
              setDataPlace([{ label: data.results.CHOICE, value: data.results.PLACE_ID }]);
            } else {
              console.error("Unexpected data structure");
            }
          }
        })
        .catch(error => {
          console.error("AXIOS ERROR:", error);
        });
    }, []);
    
 


    const renderLabel = () => {
      if (value || isFocus) {
        // return (
        //   <Text style={[styles.label, isFocus && { color: 'blue' }]}>
        //     Place
        //   </Text>
        // );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#C06D58',  borderWidth: 0.8 }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={dataPlace}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
        //   searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            setPlace(item.label);
          }}
        //   renderLeftIcon={() => (
        //     <AntDesign
        //       style={styles.icon}
        //       color={isFocus ? 'blue' : 'black'}
        //       name="Safety"
        //       size={20}
        //     />
        //   )}
        />
      </View>
    );

    
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 18,
      width: '100%',
    },
    dropdown: {
      height: 50,
      borderColor: 'black',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      width: '100%',
      borderWidth: 0.8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 18,
      fontFamily: "Cuprum-VariableFont_wght",
      color: 'black',
    },
    placeholderStyle: {
      fontSize: 18,
      fontFamily: "Cuprum-VariableFont_wght",
      color: 'black',
    },
    selectedTextStyle: {
      fontSize: 18,
      fontFamily: "Cuprum-VariableFont_wght",
      color: 'black',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 18,
      fontFamily: "Cuprum-VariableFont_wght",
      color: 'black',
    },
  });