/**
*
* RestoreWalletModal
*
*/

import React from 'react';
import Login from '../../mfkdf/Login';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal, Button, Input, Icon, Tooltip } from 'antd';

const Div = styled.div`
  margin-top: 12px;
`;

const Span = styled.span`
  color: red;
  font-size: 21px;
  padding-right: 12px;
  vertical-align: sub;
`;

const Description = styled.div`
  margin-bottom: 10px;
`;

function RestoreWalletModal(props) {
  const { isShowRestoreWallet, userSeed, userPassword, restoreWalletError, onChangeUserSeed, onChangeUserPassword, onRestoreWalletCancel, onRestoreWalletFromSeed } = props;
  // const suffix = userSeed ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
  const errorComponent =
    (<Span key="error">
      <Tooltip placement="bottom" title={restoreWalletError}>
        <Icon type="close-circle-o" style={{ color: 'red' }} />
      </Tooltip>
    </Span>);

  return (
    <Modal
      visible={isShowRestoreWallet}
      title="Log In"
      onOk={onRestoreWalletCancel}
      onCancel={onRestoreWalletCancel}
      footer={false}
    >
      <Login onChangeUserSeed={onChangeUserSeed} onChangeUserPassword={onChangeUserPassword} />
      <div style={{display: 'none'}}>
        <br />
        <Input
          placeholder="Enter seed"
          prefix={<Icon type="wallet" />}
          value={userSeed}
          onChange={onChangeUserSeed}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          id="enterseed"
        />
        <Div>
          <Input
            placeholder="Enter password for keystore encryption"
            prefix={<Icon type="key" />}
            value={userPassword}
            onChange={onChangeUserPassword}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            id="enterpassword"
          />
        </Div>
        <Button key="submit" type="primary" size="large" id="restorebtn" onClick={onRestoreWalletFromSeed} >
          Restore
        </Button >
      </div>
    </Modal>
  );
}

RestoreWalletModal.propTypes = {
  isShowRestoreWallet: PropTypes.bool,
  userSeed: PropTypes.string,
  userPassword: PropTypes.string,
  onChangeUserSeed: PropTypes.func,
  onChangeUserPassword: PropTypes.func,
  restoreWalletError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]),
  onRestoreWalletCancel: PropTypes.func,
  onRestoreWalletFromSeed: PropTypes.func,
};

export default RestoreWalletModal;
