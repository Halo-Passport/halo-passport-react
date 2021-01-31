import React, { Component } from "react";
import { Typography } from "@material-ui/core";

import bg from "./assets/appIcon.png";
class WelcomeScreen extends Component {
  render() {
    return (
      <div>
        <img
          src={bg}
          style={{ width: 320, height: 140, alignItems: "center" }}
        ></img>
        <Typography style={{}}>Welcome,</Typography>
        <Typography>Chan Tai Man</Typography>
      </div>
    );
  }
}

export default WelcomeScreen;
