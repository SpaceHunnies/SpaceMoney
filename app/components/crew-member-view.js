import React from 'react';

class CrewMemberView extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return <div className="crewMember">
        <h3 className="crewMemberName">
          {this.props.full_name}
        </h3>
        {this.props.children}
      </div>
  }

}

export default CrewMemberView;
