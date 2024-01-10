// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import React, { useState } from 'react';

// const TicketForm = () => {
//   const [subject, setSubject] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = () => {
//     // You can add your logic here to send the ticket data to your server or perform other actions
//     console.log('Submitted Ticket');
//     console.log('Subject:', subject);
//     console.log('Description:', description);

//     // Clear form fields after submission
//     setSubject('');
//     setDescription('');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Subject:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter subject here"
//         value={subject}
//         onChangeText={(text) => setSubject(text)}
//       />

//       <Text style={styles.label}>Description:</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter description here"
//         multiline
//         numberOfLines={4}
//         value={description}
//         onChangeText={(text) => setDescription(text)}
//       />

//       <Button title="Submit Ticket" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     padding: 8,
//     marginBottom: 16,
//   },
// });

// export default TicketForm;
