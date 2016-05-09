import React from 'react';
import StatusView from './status-view'

class StatusList extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    let a = this.props.data.position.toArray();
      let f = 1;
    for (var i = a[0].length - 1; i >= 0; i--) {
      a[0][i] = Math.round(a[0][i] * f) / f;
    }
    let text = '<' + a + '>';

    return (
      <div className="statusList">
        <div className="margin-bottom-md">
          <h2 className="no-margin">Status</h2>
          <span className="japanese">状態</span> / <span className="russian">положение</span>
        </div>
        <ul>
          {text}
        </ul>
      </div>
    );
  }

}

export default StatusList;
