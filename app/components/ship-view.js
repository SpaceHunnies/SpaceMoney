import React from 'react'
import ParameterList from './parameter-list'
import CrewList from './crew-list'
import PayloadList from './payload-list'
import ModuleList from './module-list'


class ShipView extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return <div className="shipView">
        <h1>Ship</h1>
        <ParameterList data={this.props.data.parameters} />
        <CrewList data={this.props.data.crew} />
        <PayloadList data={this.props.data.payload} />
        <ModuleList data={this.props.data.modules} />
      </div>
  }

}

export default ShipView;
