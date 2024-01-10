// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import axios from 'axios';

// function Message(props) {
//   const { message } = props;

//   return (
//     <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}>
//       <Text>{message.sender} :</Text>
//       <Text>{message.message_text}</Text>
//     </View>
//   );
// }

// function Ticket(props) {
//   const { ticket } = props;
//   const [status, setStatus] = useState(false);
//   const [ticketData, setTicketData] = useState([]);
//   const [ticketMessage, setTicketMessage] = useState('');
  
//   useEffect(() => {
//     const url = 'http://192.168.167.90:3360/ticketMessage';
//     axios
//       .get(url, {
//         params: {
//           ticket_id: ticket.ticket_id,
//         },
//       })
//       .then((response) => {
//         setTicketData(response.data);
//         console.log('response');
//         console.log(response.data);
//       })
//       .catch((err) => {
//         console.log(err);
//         // Handle error or navigate to an error screen in your React Native app
//       });
//   }, [ticket]);

//   useEffect(() => {
//     setTicketMessage(
//       ticketData.map((message, index) => {
//         return <Message key={index} message={message} />;
//       })
//     );
//   }, [ticketData]);

//   const color_status = () => {
//     if (ticket.status === 'completed') {
//       return '#E67738';
//     } else if (ticket.status === 'on hold') {
//       return '#f2a676';
//     } else if (ticket.status === 'in progress') {
//       return '#FAEBDC';
//     }
//   };

//   return (
//     <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray' }}>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: 10,
//           backgroundColor: 'red'
//         }}
//       >
//         <Text>{ticket.ticket_id}</Text>
//         <Text style={{ marginLeft: 10 }}>{ticket.subject}</Text>
//         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//           <View
//             style={{
//               width: 3,
//               height: 3,
//               borderRadius: 50,
//               backgroundColor: color_status(),
//               marginRight: 2,
//             }}
//           />
//           <Text>{ticket.status}</Text>
//         </View>
//         <Text>{ticket.update.slice(0, 10)}</Text>
//         <TouchableOpacity onPress={() => setStatus(!status)}>
//           <Text>{status ? '-' : '+'}</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={{ borderTopWidth: status ? 1 : 0 }}>
//         {status ? ticketMessage : null}
//         {status ? (
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <TextInput
//               style={{
//                 height: 34,
//                 flex: 1,
//                 borderColor: 'black',
//                 borderWidth: 1,
//                 borderRadius: 5,
//                 padding: 8,
//                 backgroundColor: 'lightgray',
//                 marginRight: 10,
//               }}
//               placeholder="Send message..."
//             />
            
//           </View>
//         ) : null}
//       </View>
//     </View>
//   );
// }

// export default Ticket;
