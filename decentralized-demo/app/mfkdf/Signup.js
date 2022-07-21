import React from 'react';
import { Modal, Button, Input, Alert } from 'antd';
import Loading from './Loading';
var axios = require('axios');

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, done: false };
    this.go = this.go.bind(this);
    this.ref = React.createRef();
  }

  go() {
    const pw = this.ref.current.state.value;
    const mfkdf = window.mfkdf;
    this.setState({ loading: true });

    (async () => {
      const setup = await mfkdf.setup.key([
        await mfkdf.setup.factors.password(pw),
        await mfkdf.setup.factors.hmacsha1(),
        await mfkdf.setup.factors.uuid()
      ], {
        size: 32,
        threshold: 2,
        kdf: 'argon2id',
        argon2time: 4,
        argon2mem: 131072,
        argon2parallelism: 1
      });

      await setup.addEnvelopedSecret('seed', Buffer.from(this.props.seed));
      await setup.addEnvelopedSecret('password', Buffer.from(this.props.password));

      const data = JSON.stringify({
        "pinataOptions": { "cidVersion": 1 },
        "pinataMetadata": { "name": setup.policy.$id },
        "pinataContent": setup.policy
      });

      // public write-only token
      const config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJlYjY1ODdmZi05Zjg0LTQwZWItYWU1NS0yNmU2YzY0MTBlOWMiLCJlbWFpbCI6InZpdmVrQG5haXIubWUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNmI1NzhiZWRhMzk2ODQxYTNkN2UiLCJzY29wZWRLZXlTZWNyZXQiOiIyZDhiNTE5MjI5ODdlMzI4MGNlNmY4NWFmYTg1MTE0OTM0YzkwNzQ1MTg5Mzc2NGFlODg4ZmQxMjQ3YTI2NTJmIiwiaWF0IjoxNjU2NTI3MDg1fQ._kxIkyv7vTbWAYJq6hXXRDYyI6ukx4gcrrNG1cnCltE'
        },
        data : data
      };

      const res = await axios(config);

      this.setState({
        loading: false,
        done: true,
        hash: res.data.IpfsHash,
        hmac: setup.outputs.hmacsha1.secret.toString('hex'),
        uuid: setup.outputs.uuid.uuid
      });

      // this.props.onGenerateWallet();

      // for await (const { cid } of results) {
      //   console.log(cid.toString())
      // }
    })();
  }

  render() {
    return (<div>
      {this.state.loading ? <Loading /> : <React.Fragment>
        {this.state.done ? <React.Fragment>
          <Alert
            message={<React.Fragment><b>Username:</b> {this.state.hash}</React.Fragment>}
            type="info"
          />
          <br />
          <Alert
            message={<React.Fragment><b>HMAC Key:</b> {this.state.hmac}</React.Fragment>}
            type="info"
          />
          <br />
          <Alert
            message={<React.Fragment><b>Recovery Code:</b> {this.state.uuid}</React.Fragment>}
            type="info"
          />
          <br />
          <Button style={{marginTop: '16px'}} key="submit" block type="primary" onClick={this.props.onGenerateKeystore}>
            Finish
          </Button>
        </React.Fragment> : <React.Fragment>
          <Input type="password" placeholder="Password" ref={this.ref} />
          <br />
          <Button style={{marginTop: '16px'}} key="submit" block type="primary" onClick={this.go} disabled={this.state.loading}>
            Continue
          </Button>
        </React.Fragment>}
      </React.Fragment>}
    </div>)
  }
}

export default Signup;
