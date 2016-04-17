import React from 'react';
import ModuleView from './module-view'

class ModuleList extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    var shipModules = []
    for (var mod of this.props.data.values()) {
      shipModules.push(mod);
    }

    var moduleNodes = shipModules.map(function(mod) {
      return (
        <li>
          <ModuleView moduleType={mod.constructor.name} />
        </li>
      );
    });

    return (
      <div className="moduleList">
        <h2>Modules</h2>
        <ul>
          {moduleNodes}
        </ul>
      </div>
    );
  }

}

export default ModuleList;
