import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import web3 from '../../web3';

export class HomeComponent extends Component {


    componentDidMount() {
    }


    render() {


        let content =
        <>
            <p>Please install metamask and come back!</p>
            <h3>Hello LivePeer Alerts!</h3>
        </>;

        if(web3){
            content =
            <>
                <h3>Hello LivePeer Alerts!</h3>
                <p>Descriptions and details</p>
                <Link to="/account">
                    <button>Get Started</button>
                </Link>
            </>;
        }

    return (
      <div>
          {content}
      </div>
    )
  }
}
