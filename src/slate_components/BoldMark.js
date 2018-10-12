import React from 'react'; // rsc <-- react stateless component, vs. rcc <-- react container component

const BoldMark = (props) => {
  return <strong>{props.children}</strong>;
};

export default BoldMark;
