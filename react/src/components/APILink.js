import React from 'react';
import { StyledAPILink } from '../styles/components/Base';

const APILink = (props) => {
  let name = props.apiLinkData.name;
  let apiLink = props.apiLinkData.properties[0].url;

  const handleClick = () => {
    props.updateDefinitionLink(apiLink);
  };

  return (
    <StyledAPILink onClick={() => handleClick()}>
      {name}
    </StyledAPILink>
  );
}

export default APILink;
