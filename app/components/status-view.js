import React from 'react';

class Status extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return <div className="statusView">
        <span>
          {this.props}
        </span>
        // {this.props.children}
      </div>
  }

}

export default StatusView;
