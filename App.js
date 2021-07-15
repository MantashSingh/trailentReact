
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import Routes from './src/Navigation/Routes';
import store from './src/redux/store';
import { getUserData } from './src/utils/utils';
import types from './src/redux/types';


const App = () => {
  useEffect(() => {
    (async () => {
      const userData = await getUserData();
      console.log("user data", userData)
      const { dispatch } = store;
      if (userData && !!userData.passphase_key) {
        console.log("enter")
        dispatch({
          type: types.LOGIN,
          payload: userData,
        });

      }
      setTimeout(()=>{
        SplashScreen.hide();
      },1000)
      
    })();

    return () => { };
  }, []);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
      <FlashMessage position="top" />
    </SafeAreaProvider>
  );
};


export default App;



// import React, {useEffect, useState, useRef} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Touchable,
//   Keyboard,
//   TextInput,
// } from 'react-native';
// import {WebView} from 'react-native-webview';

// export default function App() {

//   useEffect(() => {
    
//           setTimeout(()=>{
//             SplashScreen.hide();
//           },600)
          

    

//       }, []);
//   const [data, setData] = useState({});
//   const [text, setText] = useState('123');
// const [count, setcount] = useState(0)

 
//   const webViewRef = useRef();

//   useEffect(()=>{
//     webViewRef.injectJavaScript(script(text));
// setcount(count+1)
// console.log(count , "here count")
//   } ,[text])
//   let script = text => `
//   var inputElem = document.getElementsByTagName('input');
// for(let i = 0; i < inputElem.length; i++) {
// inputElem[i].addEventListener('focus', function(){
  
//     this.value= "${text}"
//     window.ReactNativeWebView.postMessage(JSON.stringify(this))
// }, false);
// }
// true;

//   `;


//   return (
//     <View style={{flex: 1}}>
//       <WebView
//        javaScriptEnabled={true}
//        domStorageEnabled={true}
//         // injectedJavaScript={script(text)}
//         ref={webViewRef}
//         onMessage={data => {
//           setData(data);
//           console.log(data, 'the data value i get is as follow');
//         }}
//         source={{uri: `https://www.amazon.com`}}
//       />

//       <Text
//         style={{backgroundColor: '#f2f2f2', padding: 20, marginRight: 20}}
//         onPress={() => {
            
           

//           setText('hllo');
//         }}>
//         Hello
//       </Text>
//       <Text
//         style={{backgroundColor: '#f2f2f2', padding: 20, marginRight: 20}}
//         onPress={() => {
//           setText('bye');
//         }}>
//         bye
//       </Text>
//     </View>
//   );
// }
// // Speech to Text Conversion in React Native – Voice Recognition
// // https://aboutreact.com/speech-to-text-conversion-in-react-native-voice-recognition/

// // import React in our code
// import React, {useState, useEffect} from 'react';

// // import all the components we are going to use
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableHighlight,
//   ScrollView,
// } from 'react-native';

// // import Voice
// import Voice from 'react-native-voice';

// const App = () => {
//   const [pitch, setPitch] = useState('');
//   const [error, setError] = useState('');
//   const [end, setEnd] = useState('');
//   const [started, setStarted] = useState('');
//   const [results, setResults] = useState([]);
//   const [partialResults, setPartialResults] = useState([]);
//   useEffect(() => {
    
//               setTimeout(()=>{
//                 SplashScreen.hide();
//               },600)
              
    
        
    
//           }, []);
//   useEffect(() => {
//     //Setting callbacks for the process status
//     Voice.onSpeechStart = onSpeechStart;
//     Voice.onSpeechEnd = onSpeechEnd;
//     Voice.onSpeechError = onSpeechError;
//     Voice.onSpeechResults = onSpeechResults;
//     Voice.onSpeechPartialResults = onSpeechPartialResults;
//     Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

//     return () => {
//       //destroy the process after switching the screen
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const onSpeechStart = (e) => {
//     //Invoked when .start() is called without error
//     console.log('onSpeechStart: ', e);
//     setStarted('√');
//   };

//   const onSpeechEnd = (e) => {
//     //Invoked when SpeechRecognizer stops recognition
//     console.log('onSpeechEnd: ', e);
//     setEnd('√');
//   };

//   const onSpeechError = (e) => {
//     //Invoked when an error occurs.
//     console.log('onSpeechError: ', e);
//     setError(JSON.stringify(e.error));
//   };

//   const onSpeechResults = (e) => {
//     //Invoked when SpeechRecognizer is finished recognizing
//     console.log('onSpeechResults: ', e);
//     setResults(e.value);
//   };

//   const onSpeechPartialResults = (e) => {
//     //Invoked when any results are computed
//     console.log('onSpeechPartialResults: ', e);
//     setPartialResults(e.value);
//   };

//   const onSpeechVolumeChanged = (e) => {
//     //Invoked when pitch that is recognized changed
//     console.log('onSpeechVolumeChanged: ', e);
//     setPitch(e.value);
//   };

//   const startRecognizing = async () => {
//     //Starts listening for speech for a specific locale
//     try {
//       await Voice.start('en-US');
//       setPitch('');
//       setError('');
//       setStarted('');
//       setResults([]);
//       setPartialResults([]);
//       setEnd('');
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };

 

//   return (
//     <SafeAreaView style={styles.container}>
      
//         <TouchableHighlight onPress={startRecognizing}>
//           <Image
//             style={styles.imageButton}
//             source={{
//               uri:
//                 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
//             }}
//           />
//         </TouchableHighlight>
//         <Text style={styles.textStyle}>
//           Partial Results
//         </Text>
//         <Text style={styles.textStyle}>
//             {partialResults[0]}
//         </Text>
        
       
        
    
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     alignItems: 'center',
//     padding: 5,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//   },
//   titleText: {
//     fontSize: 22,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   buttonStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     marginTop: 15,
//     padding: 10,
//     backgroundColor: '#8ad24e',
//     marginRight: 2,
//     marginLeft: 2,
//   },
//   buttonTextStyle: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   horizontalView: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 0,
//   },
//   textStyle: {
//     textAlign: 'center',
//     padding: 12,
//   },
//   imageButton: {
//     width: 50,
//     height: 50,
//   },
//   textWithSpaceStyle: {
//     flex: 1,
//     textAlign: 'center',
//     color: '#B0171F',
//   },
// });