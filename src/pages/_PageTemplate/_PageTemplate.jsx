import React, { useEffect } from 'react';
import { changeTitle } from '../../utils';
import { Container, Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { history } from '../../utils'

import "./_PageTemplate.scss";

/**
 * This component define a template
 * @category Page
 * @class _PageTemplate
 * @param {string} title Title of the page, this will show as a H1 header and as the tab name
 * @param {ReactComponent} page This acccets any React Componnet to render as a page
 * @param {string} backButtonPath If this parameter is not null, a back button will be rendered along with new URL path as the input
 * @return {ReactComponent}
 */
const _PageTemplate = (props) => {
  useEffect(() => {
    changeTitle(props.title);
  }, [props]);

  const componentProps = { ...props, title: null, page: null, backButtonPath: null };

  const backInteractionHandler = (event) => {
    event.preventDefault();
    history.push(props.backButtonPath);
  }

  return (
    <div className="page-template">
      <Container maxWidth="xl" className="">
        <h1 className="page-template__header">
          {
            (props.backButtonPath) ? (<Button size="small" onClick={backInteractionHandler} className="page-template__back-arrow"><ArrowBack fontSize="small" /></Button>) : <></>
          }
          {props.title}
        </h1>
          <props.page {...componentProps} />
      </Container>
    </div>
  );
};

export default _PageTemplate;
