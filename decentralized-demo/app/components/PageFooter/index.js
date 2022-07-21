/**
*
* PageFooter
*
*/

import React from 'react';
import { github } from 'utils/constants';
import { Row, Col } from 'antd';
import styled from 'styled-components';

import { StickyFooter } from './sticky';


const Footer = StickyFooter.extend`
  textAlign: center;
  background: #da292e;
  color: #fff;
  width: auto;
  height: auto;
  display: inline-block;
  padding: 6px 12px;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
`;

const Span = styled.span`
  color: #b9b9b9;
  margin-top:3px;
`;

function PageFooter() {
  return (
    <Footer><i className="fa fa-triangle-exclamation" />&nbsp; This application is for demo purposes only.</Footer>
  );
}

PageFooter.propTypes = {

};

export default PageFooter;
