// //MAYBE dont use
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

// const AdminTicketForm = () => {
//   const [subject, setSubject] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = () => {
//     // Perform the submission logic here, e.g., send the ticket data to your backend
//     // For this example, we'll just log the data
//     console.log('Submitted Ticket:');
//     console.log('Subject:', subject);
//     console.log('Description:', description);

//     // Clear the form fields
//     setSubject('');
//     setDescription('');
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.header}>Admin Ticket Form</Text>
//       <View style={styles.form}>
//         <Text style={styles.label}>Subject:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter subject"
//           value={subject}
//           onChangeText={(text) => setSubject(text)}
//         />
//         <Text style={styles.label}>Description:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter description"
//           multiline
//           numberOfLines={4}
//           value={description}
//           onChangeText={(text) => setDescription(text)}
//         />
//         <Button title="Submit" onPress={handleSubmit} />
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   form: {
//     width: '100%',
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     backgroundColor: 'white',
//     borderRadius: 5,
//     borderWidth: 1,
//     borderColor: 'gray',
//     padding: 10,
//     marginBottom: 20,
//   },
// });

// export default AdminTicketForm;
