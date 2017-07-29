import React from 'react';
import { Component } from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1, H2 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';

class NFC extends Component {

  componentDidMount() {
    if (Meteor.isCordova) {
      Meteor.startup(() => {
        // nfc.addNdefListener(() => {
        //   console.log('Read nfc');
        // }, () => {
        //   console.log('Added listener');
        // }, () => {
        //   console.log('Fail adding listener');
        // });
        // nfc.addTagDiscoveredListener((data) => {
        //   console.log(data);
        // }, () => console.log('success'), () => console.log('failure'));
        //nfc.enabled(() => console.log('success'), () => console.log('error'));
        const message = [
            ndef.uriRecord("hello"),
        ];
        // message.forEach(e => console.log(Object.keys(e)));
        // nfc.unshare(
        //   () => console.log('un-shared'),
        //   () => console.log('failed to unshare'),
        // );
        nfc.share(message, () => console.log('success'), (error) => console.error("there is an error" + error));
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
