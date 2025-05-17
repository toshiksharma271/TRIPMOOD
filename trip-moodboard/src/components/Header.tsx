import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: var(--text-primary);
  margin: 0;
  font-weight: 600;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Title>Visual Trip Moodboard</Title>
    </HeaderContainer>
  );
};

export default Header; 