import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {WebView} from 'react-native-webview';
import WrapperContainer from '../../Components/WrapperContainer';
import navigationStrings from '../../constants/navigationStrings';
import actions from '../../redux/actions';
export default function WebViewForNewUser({navigation}) {
  const passphrase = useSelector(state => state.auth.passphrase);
  console.log(
    // passphrase,
    'http://15.184.181.58/web/register/' + `${passphrase}` + '/edit',
  );

  //   const onMessage = data => {
  //     alert(data);
  //     console.log(data.nativeEvent.data);
  //     // props.navigation.navigate('Home');
  //   };
  const moveToNewScreen = (screenName, data) => () => {
    navigation.navigate(screenName, {});
  };

  const onNavigationStateChange = navState => {
    console.log(navState, 'navState>>>>>>>>>>>PAYMENT');
    let Url = 'http://15.184.181.58/web/register/' + `${passphrase}`;
    let login = 'http://15.184.181.58/api/user/login?token=' + `${passphrase}`;
    //     if (!navState.url.includes("/edit"))
    //     {
    //         actions.login(login)
    //         .then(res =>{
    // // navigation.navigate(navigationStrings.TAB_ROUTES)
    // console.log(res,"afeterlogin")

    //     })

    //     }

    if (navState.url.includes('?message=success')) {
      actions.login(login).then(res => {
        //  navigation.navigate(navigationStrings.TAB_ROUTES)
        console.log(res, 'afeter login');
      });
    }
  };
  return (
    <WrapperContainer>
      <WebView
        source={{
          uri: 'http://15.184.181.58/web/register/' + `${passphrase}` + '/edit',
        }}
        onNavigationStateChange={navState => onNavigationStateChange(navState)}
      />
    </WrapperContainer>
  );
}
