import React from 'react';
import { StyledSideBar, StyledSideBarHeader, StyledSideBarBody } from '../styles/components/SideBar';
import APILink from './APILink';

const Sidebar = (props) => {
  let organizationConfig = props.organizationConfig;
  let apiLinks = [];

  if (props.definitionList === null) {
    props.getOrganizationData(organizationConfig.orgName);
  } else {
      for (let i = 0; i < props.definitionList.length; i++) {
        if (props.definitionList[i].properties[4].value === 'true') {
          apiLinks.push(
            <APILink
              key={i}
              apiLinkData={props.definitionList[i]}
              updateDefinitionLink={props.updateDefinitionLink}
            />
          )
        }
      }
  }

  return (
    <StyledSideBar>
      <StyledSideBarHeader>
        <h1>{organizationConfig.displayName}</h1>
      </StyledSideBarHeader>
      <StyledSideBarBody>
        <h3>API DOCS</h3>
        <p>{apiLinks}</p>
      </StyledSideBarBody>
    </StyledSideBar>
  );
}

export default Sidebar;
