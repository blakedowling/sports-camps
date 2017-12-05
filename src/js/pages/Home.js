import React from "react";
import styles from "./home.css";
import { Link } from "react-router";
import axios from 'axios';
import renderHTML from 'react-render-html';

import Article from "../components/Article";
import Ads from "../components/Ads";
import Tint from "../components/Tint";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
      
  componentDidMount() {
    var th = this;
    this.serverRequest = axios.get("https://byucougars.com/dl/feeds/sports-camps")
      .then(function(response) {
        console.log(response.data);
        th.setState({
          data: response.data
      });
    })
    .catch(function(error) {
      console.log(error);
    });
  }
  
  
  render() {
    var sports = [];
    this.state.data.forEach(item => {
      var link = 'sports/' + item.tid;
      sports.push(
        <Link key={item.tid} to={link} className={"col-md-6 col-xs-12"}>{item.name}</Link>
      )
    })
    
    // const Articles = [
    //   "Some Article",
    //   "Some Other Article",
    //   "Yet Another Article",
    //   "Still More",
    //   "Some Article",
    //   "Some Other Article",
    //   "Yet Another Article",
    //   "Still More",
    //   "Some Article",
    //   "Some Other Article",
    //   "Yet Another Article",
    //   "Still More",
    // ].map((title, i) => <Article key={i} title={title}/> );

    // const adText = [
    //   "Ad spot #1",
    //   "Ad spot #2",
    //   "Ad spot #3",
    //   "Ad spot #4",
    //   "Ad spot #5",
    // ];

    // const randomAd = adText[Math.round( Math.random() * (adText.length-1) )];
    return (
      <div>
        <div className={ styles.videoLoopContainer }>
          <video autoPlay loop muted preload webkit-playsinline="true" className={ styles.homeVideo }>
            <source src="media/videos/SportsCamps_WIDE.mp4" type="video/mp4"/>
            Your browser does not support the video tag
          </video>
          
          <div className={ styles.videoContent }>
            <h1>Registration is now open for all 2018 camps</h1>
          </div>
        </div>
        <Ads/>
        <div className={ styles.sportsDiv+ ' container'}>
            <div className={"row " + styles.row}>
              {sports}
            </div>
        </div>
        <Tint/>
      </div>
    );
  }
}
