// @flow

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;

  .info {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .links a:not(:last-child) {
      margin-right: 15px;
    }
  }
`;

const Avatar = styled.a`
  padding: 10px;

  img {
    width: 150px;
    height: 150px;
  }
`;

type Props = {
  id: number,
  avatarUrl: string,
  contributions: number,
  followersUrl: string,
  htmlUrl: string,
  login: string,
  organizationsUrl: string,
  reposUrl: string,
  type: 'User',
};

const Contributor = (contributor: Props) => (
  <Wrapper>
    <Avatar href={contributor.htmlUrl} target="_blank">
      <img src={contributor.avatarUrl} alt={contributor.login} />
    </Avatar>
    <div className="info">
      <a href={contributor.htmlUrl} target="_blank">
        {contributor.login}
      </a>
      <p>Contributions: +{contributor.contributions}</p>
      <div className="links">
        <a href={contributor.reposUrl} target="_blank">
          Repositories
        </a>
        <a href={contributor.followersUrl} target="_blank">
          Followers
        </a>
        <a href={contributor.organizationsUrl} target="_blank">
          Organizations
        </a>
      </div>
    </div>
  </Wrapper>
);

export default Contributor;
