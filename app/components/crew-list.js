import React from 'react';
import CrewMemberView from './crew-member-view'

class CrewList extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    var crewMembers = []
    for (var member of this.props.data.values()) {
      crewMembers.push(member);
    }

    var crewMemberNodes = crewMembers.map(function(crew) {
      return (
        <li>
          <CrewMemberView full_name={crew.full_name} />
        </li>
      );
    });

    return (
      <div className="crewList">
        <h2>Crew Members</h2>
        <ul>
          {crewMemberNodes}
        </ul>
      </div>
    );
  }

}

export default CrewList;
