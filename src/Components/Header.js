import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GrFormPrevious } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsCircleFill } from "react-icons/bs";
import { BsBellSlash, BsBell, BsBellFill } from "react-icons/bs";
function AlarmChange({ isNew }) {
  if (isNew === 1) {
    return (
      <>
        <BsBell size="24" color="#383838" />
        <Alarm>
          <BsCircleFill color="red" size="10" />
        </Alarm>
      </>
    );
  } else if (isNew === 0) {
    return <BsBell size="24" color="#383838" />;
  } else {
    return <BsBellSlash size="24" color="#383838" />;
  }
}
const Header = ({ isNew, setNew }) => {
  return (
    <HeaderContainer>
      <HeaderWrapper>
        <PreviousButton>
          <GrFormPrevious size="24" color="#383838" />
        </PreviousButton>
        <HeaderTitle>내 차 팔기</HeaderTitle>
        <HeaderMenu>
          <AlarmChange isNew={isNew} />
          {/* <GiHamburgerMenu size="24" color="#383838" />
          {isNew === 1 ? (
            <Alarm>
              <BsCircleFill color="red" size="10" />
            </Alarm>
          ) : null} */}
        </HeaderMenu>
      </HeaderWrapper>
    </HeaderContainer>
  );
};
const Alarm = styled.div`
  position: relative;
  top: -40px;
  right: -20px;
`;
const HeaderContainer = styled.div`
  width: 640px;
  margin: 0px auto;
  @media only screen and (max-width: 640px) {
    width: 95%;
    margin: 0px auto;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 20px;
`;

const PreviousButton = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #383838;
`;

const HeaderMenu = styled.div`
  :hover {
    cursor: pointer;
  }
`;
export default Header;
