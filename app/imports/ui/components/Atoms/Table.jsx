import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableEl = styled.table`
  overflow:hidden;
  empty-cells: show;
  border-collapse: separate;
  border-spacing: 0;
  padding: 0;
  margin: 50px 0 0;
  width: 100%;
  box-shadow: 0 0 2px 0 rgba(50, 50, 50, .6);
  border-radius: 2px;
  text-align: center;
`;

const Thead = styled.thead`
  border-collapse: separate;
  padding: 0;
  margin: 0;
  line-height: 1em;
  font-size: 1em;
  background: #555555;
  color: #eef0f0;
`;

const TheadRow = styled.tr`
  height: 4.6em;
`;

const TheadEl = styled.span`
  font-weight: 300;
  line-height: 2em;
  border-right: 1px solid #fff;
  display:block;
`;

const Th = styled.th`
  padding: 0;
  font-weight: 300;
  &:last-child ${TheadEl} {
    border: 0;
  }
`;

const Tbody = styled.tbody`
  border-collapse: separate;
`;

const TbodyRow = styled.tr`
  height: 4em;
  min-height: 4em;
  background: ${props => props.theme.colors.primary};
  &:nth-child(even) {
    background: ${props => props.theme.colors.secondary};
  }
`;

const TbodyEl = styled.td`
  border-collapse: separate;
  padding: 0;
  margin: 0;
  box-shadow: 0 0 1px 0 rgba(50, 50, 50, .3);
  font-weight: 300;
  height: 1px; // This is purely so children can use the height: 100% property. The 1 px of height will be increased by the children anyways.
  width: 1px; // Same thing here.
  &:last-child {
    border-right-width: 0;
  }
`;

const TbodyFiller = styled.tr`
  height: auto;
`;

const Table = ({ headers, rows }) => (
  <TableEl>
    <Thead>
      <TheadRow>
        {headers.map(header => <Th key={header}><TheadEl>{header}</TheadEl></Th>)}
      </TheadRow>
    </Thead>
    <Tbody>
      {rows.map(({ key, values }) => (
        <TbodyRow key={key}>
          {values.map((column, index) => <TbodyEl key={column + index}>{column}</TbodyEl>)}
        </TbodyRow>
      ))}
      <TbodyFiller>
        {headers.map(header => <td key={header} />)}
      </TbodyFiller>
    </Tbody>
  </TableEl>
);

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
};

export default Table;
