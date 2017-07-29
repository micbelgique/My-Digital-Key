import React from 'react';
import Main from '/imports/ui/components/Atoms/Main';
import { H1, H2 } from '/imports/ui/components/Atoms/Headings';
import Wrapper from '/imports/ui/components/Atoms/Wrapper';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

const Keys = () => (
  <Main>
    <Wrapper>
      <H1>Clés</H1>
    </Wrapper>
  </Main>
);

Keys.propTypes = {};

export default Keys;
