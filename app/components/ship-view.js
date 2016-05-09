import React from 'react'
import ParameterList from './parameter-list'
import CrewList from './crew-list'
import PayloadList from './payload-list'
import ModuleList from './module-list'
import StatusList from './status-list'


class ShipView extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return <div className="shipView">
        <h1>{this.props.data.name} <span className="much-smaller japanese">船</span> <span className="much-smaller">/</span> <span className="much-smaller russian">судно</span></h1>
        <div className="slim-container">
          <div className="row">
            {/* <div className="column"><ParameterList data={this.props.data.parameters} /></div> */}
            <div className="column"><StatusList data={this.props.data} /></div>
            <div className="column"><CrewList data={this.props.data.crew} /></div>
            <div className="column"><PayloadList data={this.props.data.payload} /></div>
            <div className="column"><ModuleList data={this.props.data.modules} /></div>
          </div>
        </div>
      </div>
  }

}

export default ShipView;
