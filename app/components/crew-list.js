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
    // TODO: In the future, when we have IDs uniquely identifying crew,
    // we should pass a unique 'key' prop here
    // http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
    var crewMemberNodes = crewMembers.map(function(crew) {
      return (
        <li>
          <CrewMemberView full_name={crew.full_name} />
        </li>
      );
    });

    return (
      <div className="crewList">
        <div className="margin-bottom-md">
          <h2 className="no-margin">Crew Members</h2>
          <span className="japanese">乗組員リスト</span> / <span className="russian">члены экипажа</span>
        </div>
        <ul>
          {crewMemberNodes}
        </ul>
      </div>
    );
  }

}

export default CrewList;
