/**
*
* SubHeader
*
*/

import React from 'react';
import { Button, Popconfirm, Row, Col } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LockButton from 'components/LockButton';
import IconButton from 'components/IconButton';
const Div = styled.div`
  margin-top: 45px;
  .ant-btn {
  margin-right: 8px;
  margin-bottom: 12px;
  }

  .anticon-lock {
    color: red;
  }
  .anticon-unlock {
    color: blue;
  }
`;

function SubHeader(props) {
  const {
    onGenerateWallet, onShowRestoreWallet, isComfirmed, onCloseWallet,
    onLockWallet, password, onUnlockWallet,
    /* optional laod / save buttons
     onSaveWallet, saveWalletLoading, saveWalletError,
     onLoadWallet, loadWalletLoading, loadWalletError, */
  } = props;

  const lockButtonProps = { onLockWallet, password, onUnlockWallet };

  const noWalletSubHeader = <React.Fragment>
    <Row type="flex" justify="left">
      <Col span={12} className="intro-abs">
        <h3>MFKDF Wallet Demo</h3>
        <p>A strong trustless decentralized cryptocurrency wallet application featuring multi-factor key derivation with self-service key recovery. It uses IPFS and IPNS to store MFKDF policy files.</p>
        <p><a href="https://github.com/mfkdfanon/mfkdf">GitHub repository for MFKDF <i className="fa-solid fa-arrow-up-right-from-square" /></a></p>
        <p className="mt-0"><a href="https://github.com/mfkdfanon/mfkdf-wallet-demo">GitHub repository for this demo <i className="fa-solid fa-arrow-up-right-from-square" /></a></p>
        <Button key="new_wallet" type="primary" size="large" onClick={onGenerateWallet}>
          <i className="fa fa-user-plus"></i>&nbsp; Sign Up
        </Button>
        <Button key="restore_wallet" type="default" size="large" onClick={onShowRestoreWallet}>
          <i className="fa fa-right-to-bracket"></i>&nbsp; Log In
        </Button>
      </Col>
      <Col span={12} className="video-abs">
        <div class="embed-container"><iframe src="https://www.youtube.com/embed/cB44BMGnFIs" frameborder="0" title="embed" class="ui-droppable"></iframe></div>
      </Col>
    </Row>
  </React.Fragment>;

  const existingWalletSubHeader = [
    <LockButton key="lock_button" {...lockButtonProps} />,
    <Popconfirm key="close_wallet" placement="bottom" title="Wallet will be deleted from memory and LocalStorage" onConfirm={onCloseWallet} okText="Confirm" cancelText="Abort">
      <Button key="close_wallet" type="default" icon="close-square-o" size="large">
        Close wallet
      </Button>
    </Popconfirm>,
    /* optional laod / save buttons
    <IconButton
      key="save"
      text="Save to disk"
      icon="download"
      onClick={onSaveWallet}
      loading={saveWalletLoading}
      error={saveWalletError}
      popconfirmMsg="Encrypted wallet will be saved to browser localStorage"
    />, */
  ];


  const subHeader = isComfirmed ? existingWalletSubHeader : noWalletSubHeader;

  return (
    <Div>
      {subHeader}
    </Div>
  );
}

SubHeader.propTypes = {
  onGenerateWallet: PropTypes.func,
  onShowRestoreWallet: PropTypes.func,
  isComfirmed: PropTypes.bool,
  onCloseWallet: PropTypes.func,
  onLockWallet: PropTypes.func,
  password: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onUnlockWallet: PropTypes.func,
  /* optional laod / save buttons
  onSaveWallet: PropTypes.func,
  saveWalletLoading: PropTypes.bool,
  saveWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]),
   onLoadWallet: PropTypes.func,
  loadWalletLoading: PropTypes.bool,
  loadWalletError: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]), */
};

export default SubHeader;
