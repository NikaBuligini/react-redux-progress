import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Contributor from '../components/Contributor';
import { loadContributors } from '../actions';
import { getContributors } from '../selectors';

const OWNER = 'NikaBuligini';
const REPO = 'react-redux-progress';

const ContributorsWrapper = styled.div`
  margin-bottom: 12px;
`;

const ReloadButton = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: cornflowerblue;
  border: 2px solid cornflowerblue;
  cursor: pointer;
  outline: 0;
  transition: 0.5s;
`;

const ContributorList = ({ isFetching, contributors, onReload }) => {
  if (isFetching) {
    return <span>Loading...</span>;
  }

  return (
    <ContributorsWrapper>
      <div>
        <ReloadButton type="button" onClick={onReload}>
          Refetch
        </ReloadButton>
      </div>
      {contributors.map(contributor => (
        <Contributor key={contributor.id} {...contributor} />
      ))}
    </ContributorsWrapper>
  );
};

const Contributors = props => {
  const loadData = React.useCallback(
    (force = false) => props.loadContributors(OWNER, REPO, force),
    [props.loadContributors],
  );

  React.useEffect(() => {
    loadData();
  }, []);

  const { isFetching, isLoaded, contributors } = props;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h4>{`${OWNER}/${REPO}'s contributors:`}</h4>
          <ContributorList
            isFetching={isFetching || !isLoaded}
            contributors={contributors}
            onReload={event => {
              event.preventDefault();
              loadData(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => getContributors(state, OWNER, REPO),
  {
    loadContributors,
  },
)(Contributors);
