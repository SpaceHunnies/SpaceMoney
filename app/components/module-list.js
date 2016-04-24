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
        <div className="margin-bottom-md">
          <h2 className="no-margin">Modules</h2>
          <span className="japanese">モジュール</span> / <span className="russian">модули</span>
        </div>
        <ul>
          {moduleNodes}
        </ul>
      </div>
    );
  }

}

export default ModuleList;
