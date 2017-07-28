import React from 'react';
import { Component } from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1, H2 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';

class NFC extends Component {

  componentDidMount(){
    if (Meteor.isCordova) {
      cordova.plugins.cordova.addNdefListener(() => {
        console.log('Read nfc');
      }, () => {
        console.log('Added listener');
      }, () => {
        console.log('Fail adding listener');
      });
    }
  }

  render() {
    return (
      <Main>
        <Wrapper>
          NFC
        </Wrapper>
      </Main>
    );
  }
}

NFC.propTypes = {};
export default NFC;
