import React from 'react';

class StatusView extends React.Component {

  constructor(props, context){
    ///<param name = "props" type = "Ship">The ship to display information about</param>
    super(props, context);
  }

  render() {
    return <div className="statusView">
        <span>
          {this.props}
        </span>
        {this.props.children}
      </div>
  }

}

export default StatusView;
