import React from 'react';
import StatusView from './status-view'

class StatusList extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  getPosString(pos) {
    let a = pos.toArray();
    let f = 1;
    for (var i = a[0].length - 1; i >= 0; i--) {
      a[0][i] = Math.round(a[0][i] * f) / f;
    }
    let text = '<' + a + '>';
    return text;
  }

  render() {
    let updateString = "";
    for (var i = 0; i < Math.floor(this.props.rate / 2); i++) {
      updateString += ">";
    }

    return (
      <div className="statusList">
        <div className="margin-bottom-md">
          <h2 className="no-margin">Status</h2>
          <span className="japanese">状態</span> / <span className="russian">положение</span>
          <p>In space</p>
          <p>{updateString}</p>
          <p>Status code: {this.props.data.code}</p>
        </div>
        <div> 
          <h6 className="no-margin">Position</h6>
          <p>{this.getPosString(this.props.data.transform.position)}</p>
          <h6 className="no-margin"><b>Target: </b> {this.props.data.targetSystem.name}</h6>
          <p className="no-margin"><b>Coordinates: </b>{this.getPosString(this.props.data.targetSystem.transform.position)}</p>
          <p className="no-margin"><b>Distance: </b>{Math.round(this.props.data.targetSystem.transform.distance(this.props.data.transform))} SU</p>
        </div>
      </div>
    );
  }

}

export default StatusList;
