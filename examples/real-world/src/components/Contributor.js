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

const Link = ({ to, text }) => (
  <a href={to} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);

const Contributor = (contributor) => (
  <Wrapper>
    <Avatar
      href={contributor.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={contributor.avatarUrl} alt={contributor.login} />
    </Avatar>
    <div className="info">
      <a href={contributor.htmlUrl} target="_blank" rel="noopener noreferrer">
        {contributor.login}
      </a>
      <p>Contributions: +{contributor.contributions}</p>
      <div className="links">
        <Link to={contributor.reposUrl} text="Repositories" />
        <Link to={contributor.followersUrl} text="Followers" />
        <Link to={contributor.organizationsUrl} text="Organizations" />
      </div>
    </div>
  </Wrapper>
);

export default Contributor;
