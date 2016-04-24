import React from 'react';

class CrewMemberView extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return <div className="crewMember">
        <span className="crewMemberName">
          {this.props.full_name}
        </span>
        {this.props.children}
      </div>
  }

}

export default CrewMemberView;
