import React, {Component} from 'react';
import {KeyboardAvoidingView, Keyboard, Animated, View} from 'react-native';

export default class AboveKeyboard extends Component {

  static defaultProps = {
    keyboardAvoidingViewBehaviour: 'padding',
  };

  constructor(props) {
    super(props);
    this.padding = new Animated.Value(0);
    this.state = {
      isVisible: false,
    };
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow,
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide,
    );
  }

  componentWillUnmount() {
    // Keyboard.removeListener('keyboardDidShow', this.keyboardWillShow);
    // Keyboard.removeListener('keyboardDidHide', this.keyboardWillHide);
    Keyboard.removeAllListeners('keyboardDidShow','keyboardDidHide');  }

  keyboardWillShow = event => {
    const{setProfile}= this.props
    setProfile(false)
    this.setState({isVisible: true});
  };

  keyboardWillHide = event => {
    this.setState({isVisible: false});
  };

  render() {
    const {
      children,
      
    } = this.props;
    return (
      <View>

{this.state.isVisible && children}
      </View>
        
          
        
      
    );
  }
}


