import React from 'react';

class ModuleView extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return <div className="moduleView">
        <span>
          {this.props.moduleType}
        </span>
        {this.props.children}
      </div>
  }

}

export default ModuleView;
