import React from 'react';
import './ManagerPage.scss';
import Container from '@material-ui/core/Container';
import { Manager } from '../../components';

/**
 * This component is just a shell for the Manager Settings Component
 * @category Page
 * @class ManagerPage
 * @return {ReactComponent}
 */
const ManagerPage = () => (<div className="manager-page">
  <Container maxWidth="xl">
    <Manager />
  </Container>
</div>
);

export default ManagerPage;
