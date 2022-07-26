/**
*
* GenerateWalletModal
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Signup from '../../mfkdf/Signup';
// import styled from 'styled-components';
import { Modal, Button, Alert } from 'antd';

function GenerateWalletModal(props) {
  const {
    isShowGenerateWallet,
    generateWalletLoading,
    // generateWalletError,
    seed,
    password,

    onGenerateWallet,
    onGenerateWalletCancel,
    onGenerateKeystore,
    } = props;

  return (
    <Modal
      visible={isShowGenerateWallet}
      title="Sign Up"
      onOk={onGenerateKeystore}
      onCancel={onGenerateWalletCancel}
      footer={null}
    >
      <Signup seed={seed} password={password} onGenerateKeystore={onGenerateKeystore} />
    </Modal>
  );
}

GenerateWalletModal.propTypes = {
  isShowGenerateWallet: PropTypes.bool,
  generateWalletLoading: PropTypes.bool,
  /* generateWalletError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
  ]), */
  seed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  password: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  onGenerateWallet: PropTypes.func,
  onGenerateWalletCancel: PropTypes.func,
  onGenerateKeystore: PropTypes.func,
};

export default GenerateWalletModal;
