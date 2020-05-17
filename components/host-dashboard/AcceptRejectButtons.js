import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';

import AppRejectionReasonModal from './AppRejectionReasonModal';
import StyledButton from '../StyledButton';

const ApproveCollectiveMutation = gql`
  mutation approveCollective($id: Int!) {
    approveCollective(id: $id) {
      id
      isActive
    }
  }
`;

const AcceptRejectButtons = ({ collective, host }) => {
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [collectiveId, setcollectiveId] = useState(null);
  return (
    <Fragment>
      <Mutation mutation={ApproveCollectiveMutation}>
        {(approveCollective, { loading }) => (
          <StyledButton
            m={1}
            loading={loading}
            onClick={() => approveCollective({ variables: { id: collective.id } })}
            data-cy={`${collective.slug}-approve`}
            buttonStyle="success"
            minWidth={125}
          >
            <FormattedMessage id="host.pending-applications.approve" defaultMessage="Approve" />
          </StyledButton>
        )}
      </Mutation>
      <StyledButton
        buttonStyle="danger"
        minWidth={125}
        m={1}
        onClick={() => (setShowRejectionModal(true), setcollectiveId(collective.id))}
      >
        <FormattedMessage id="host.pending-applications.reject" defaultMessage="Reject" />
      </StyledButton>
      {showRejectionModal && (
        <AppRejectionReasonModal
          show={showRejectionModal}
          onClose={() => setShowRejectionModal(false)}
          collectiveId={collectiveId}
          hostCollectiveSlug={host.slug}
        />
      )}
    </Fragment>
  );
};

AcceptRejectButtons.propTypes = {
  collective: PropTypes.shape({
    id: PropTypes.number,
    slug: PropTypes.string,
  }),
  host: PropTypes.shape({
    slug: PropTypes.string,
  }),
};

export default AcceptRejectButtons;
