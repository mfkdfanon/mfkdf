import React from 'react';
import { Modal, Button, Input, Alert } from 'antd';
import Loading from './Loading';
var axios = require('axios');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, done: false, error: false };
    this.go = this.go.bind(this);
    this.user = React.createRef();
    this.pass = React.createRef();
    this.hmac = React.createRef();
    this.uuid = React.createRef();
  }

  go() {
    const user = this.user.current.state.value ? this.user.current.state.value : '';
    const pass = this.pass.current.state.value ? this.pass.current.state.value : '';
    const hmac = this.hmac.current.state.value ? this.hmac.current.state.value : '';
    const uuid = this.uuid.current.state.value ? this.uuid.current.state.value : '';

    this.setState({loading: true});

    (async () => {
      const mfkdf = window.mfkdf;
      if (user.length === 0) {
        this.setState({loading: false, error: 'Please enter a valid username.'})
      } else if ((pass.length === 0 && (hmac.length === 0 || uuid.length === 0)) || (hmac.length === 0 && uuid.length === 0)) {
        this.setState({loading: false, error: 'Please enter at least two factors.'})
      } else {
        try {
          const policy = await axios.get('https://cloudflare-ipfs.com/ipfs/' + user);
          const factors = {};
          if (pass.length > 0) factors.password = mfkdf.derive.factors.password(pass);
          if (hmac.length > 0) factors.hmacsha1 = mfkdf.derive.factors.hmacsha1(hmac);
          if (uuid.length > 0) factors.uuid = mfkdf.derive.factors.uuid(uuid);
          const key = await mfkdf.derive.key(policy.data, factors);

          const seed = (await key.getEnvelopedSecret('seed')).toString();
          const password = (await key.getEnvelopedSecret('password')).toString();

          document.getElementById('enterseed').value = seed;
          this.props.onChangeUserSeed({target: {value: seed}});
          document.getElementById('enterpassword').value = password;
          this.props.onChangeUserPassword({target: {value: password}});

          setTimeout(() => {
            document.getElementById('restorebtn').click();
          }, 100)
        } catch (e) {
          console.log(e)
          this.setState({loading: false, error: 'Couldn\'t find that wallet.'})
        }
      }
    })();
  }

  render() {
    return (<div>
      {this.state.loading ? <Loading /> : <React.Fragment>
        <Input
          placeholder="Enter username"
          ref={this.user}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <p style={{marginTop: '16px', marginBottom: '-16px'}}>Enter 2 of the 3 authentication factors below to continue</p>
        <br />
        <Input
          type="password"
          placeholder="Enter password"
          ref={this.pass}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          style={{marginBottom: '8px'}}
        />
        <br />
        <Input
          placeholder="Enter YubiKey response"
          type="password"
          ref={this.hmac}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          style={{marginBottom: '8px'}}
        />
        <br />
        <Input
          placeholder="Enter recovery code"
          ref={this.uuid}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <br />
        <Button style={{marginTop: '16px'}} key="submit" block type="primary" onClick={this.go}>
          Continue
        </Button>
      </React.Fragment>}
    </div>)
  }
}

export default Login;
