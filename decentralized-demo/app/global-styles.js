import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #f8f8f8;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  body {
    text-align: center;
  }
  hr {
    width: 200px;
    text-align:center !important;
    margin: 0 auto !important;
  }

  .splash-bg {
    background-image: linear-gradient(45deg,#ff0401,#fc6e02);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }

  .bg-image {
    background-image: url("https://mfkdfanon.github.io/bg-md.jpg");
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    bottom: 0;
    height: 100%;
    left: 0;
    opacity: .1;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 0;
  }

  .form {
    left: 50%;
    max-width: 100%;
    position: absolute;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    width: 1000px;
    z-index: 1;
  }

  .card {
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: none;
    overflow: hidden;
    min-height: 325px;
  }

  .hmax {
    max-height: 680px;
    overflow-y: hidden;
  }

  .logo {
    height: 100px;
    margin-bottom: 2rem;
    margin-top: 0;
  }

  .video-abs {
    position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .intro-abs {
    position: absolute !important;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 2rem !important;
    text-align: left;
  }

  .intro-abs h3 {
    font-size: 1.75rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: #212529;
  }

  .intro-abs p {
    margin-top: 1rem !important;
    margin-bottom: 1rem !important;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    color: rgb(73, 80, 87);
  }

  p.mt-0 {
    margin-top: -1rem !important;
  }

  .embed-container {
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    position: relative !important;
  }

  .embed-container embed, .embed-container iframe, .embed-container object {
    height: 100%;
    left: 0;
    position: absolute !important;
    top: 0;
    width: 100%;
  }
`;
