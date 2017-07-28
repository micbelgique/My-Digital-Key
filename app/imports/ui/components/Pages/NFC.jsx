import React from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1, H2 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

const NFC = () => (
  <Main>
    <Wrapper>
      <H1>NFC Test</H1>
    </Wrapper>
  </Main>
);

NFC.propTypes = {};

export default NFC;
