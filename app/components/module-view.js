import React from 'react';

class ModuleView extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return <div className="moduleView">
        <h3>
          {this.props.moduleType}
        </h3>
        {this.props.children}
      </div>
  }

}

export default ModuleView;
