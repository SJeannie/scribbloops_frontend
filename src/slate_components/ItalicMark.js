import React from 'react'; // rsc <-- react stateless component, vs. rcc <-- react container component

const ItalicMark = (props) => {
  return <em property="italic">{props.children}</em>;
};

export default ItalicMark;
