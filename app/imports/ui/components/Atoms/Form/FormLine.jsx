import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormLine = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: auto;
  margin: 0;
  flex-wrap: wrap;
`;

FormLine.propTypes = {
  children: PropTypes.element.isRequired,
};

export default FormLine;
