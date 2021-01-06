import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './Contractor.scss';

/**
 * This component will render the contractor name, phone number and commpany name
 * @category UI Component
 * @subcategory General
 * @class Contractor
 * @param {string} contractorName contractor's name
 * @param {number} phoneNumber contractor's phone number
 * @param {string} companyName contractor's company name
 * @return {ReactComponent}
 */
const Contractor = ({ contractorName, phoneNumber, companyName }) => (
  <div className="contractor__card-width">
    <Card>
      <CardContent className="contractor__card-wrapper">
        <Typography color="textPrimary" component="h1">
          <span className="contractor_name">{contractorName}</span>
        </Typography>
        <Typography variant="caption" component="p">
          from <span className="contractor__company-name">{companyName}</span>
        </Typography>
        <Typography variant="body2" component="p">
          Mobile number: {phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  </div>
);

export default Contractor;
