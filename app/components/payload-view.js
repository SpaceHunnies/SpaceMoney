import React from 'react';

class payloadView extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return <div className="payload">
        <b>{this.props.payloadType}:</b> {this.props.children}
      </div>
  }

}

export default payloadView;
