import React from 'react';
import PayloadView from './payload-view';
import _ from "lodash";

class PayloadList extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    var payloadNodes = _.map(this.props.data, function(quantity, payloadType) {

      return (
        <li>
          <PayloadView payloadType={payloadType}>{quantity}</PayloadView>
        </li>
      );
    });

    return (
      <div className="payloadList">
        <h2>Payloads</h2>
        <ul>
          {payloadNodes}
        </ul>
      </div>
    );
  }

}

export default PayloadList;
