import React, { Component } from "react";
import { Typography } from "@material-ui/core";

import qrcode from "./assets/QRcode.png";
class PassportScreen extends Component {
  render() {
    return (
      <div className={classes.root}>
        <Typography>This is your Halo Passport</Typography>
        <Typography>Present This Code when Boarding</Typography>
        <Typography>This code will only be valid for 3 minutes</Typography>
        <img src={qrcode} style={{ maxWidth: 640 }}></img>
      </div>
    );
  }
}

export default PassportScreen;
