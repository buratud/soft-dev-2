// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, ScrollView } from 'react-native';
// import axios from 'axios';
// import Ticket from './Ticket';

// // Assuming you have created an equivalent component for Ticket

// function Helppage() {
//   const [searchFilter, setSearchFilter] = useState('');
//   const [ticketData, setTicketData] = useState([
//     {
//       ticket_id: 'loading',
//       subject: 'loading',
//       status: 'loading',
//     },
//   ]);

//   const tickets = ticketData
//     .filter((ticket) => {
//       if (searchFilter !== '') {
//         return ticket.ticket_id === Number(searchFilter);
//       } else {
//         return true;
//       }
//     })
//     .map((ticket, index) => {
//       return (
//         <Ticket key={index} ticket={ticket} />
//       );
//     });

//   return (
//     <View style={{backgroundColor: '#E67738'}}>
//       <View style={{ backgroundColor: 'blue', padding: 4 }}>
//         <TextInput
//           value={searchFilter}
//           onChangeText={(text) => setSearchFilter(text)}
//           style={{
//             height: 34,
//             borderRadius: 5,
//             padding: 8,
//             backgroundColor: 'white',
//             borderColor: 'black',
//             borderWidth: 1,
//           }}
//           placeholder="Find ticket..."
//         />
//       </View>
//       <ScrollView>
//         <View>
//           <View style={{alignItems: 'center', backgroundColor: 'blue'}}>
//             <Text style={{ textAlign: 'center' }}>Ticket</Text>
//             <Text style={{ marginLeft: 10 }}>Subject</Text>
//             <Text style={{ textAlign: 'center' }}>Status</Text>
//             <Text style={{ textAlign: 'center' }}>Last Update</Text>
//           </View>
//           {tickets}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// export default Helppage;
