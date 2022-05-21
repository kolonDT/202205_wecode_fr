import React, { useState } from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";

const CarCard = () => {
  //클릭 시 요청내역 관리 숨김-열기 상태값
  const [isShow, setIsShow] = useState(false);

  //checkbox를 관리하는 객체
  const [steps, setSteps] = useState({
    1: false,
    2: true,
    3: true,
    4: true,
    5: true,
  });

  //check값을 관리하는 배열
  const [progress, setProgress] = useState([
    "quote_requested",
    "dealer_assigned",
    "dealer_consulting",
    "selling_requested",
    "selling_completede",
  ]);

  //요청내역 보기 관리 함수
  const clickShow = () => {
    setIsShow((prev) => !prev);
  };

  //과정 관리하는 함수
  const clickCheckBox = (e) => {
    const num = Number(e.target.value);
    //체크 활성화 시키는 함수

    setSteps({ ...steps, [num]: true, [num + 1]: false });
    if (num === 5) {
      setSteps({ ...steps, [num]: true });
    }

    //fetch 함수
    const sendProcess = progress[num - 1];
  };

  return (
    <div>
      <ListContainer>
        <ListWrapper>
          <Car>
            <CarWrapper>
              <CarInfo onClick={clickShow}>
                <CarNumber>12가 3456</CarNumber>
                <FaChevronRight />
              </CarInfo>
              <ManangeProcess isShow={isShow}>
                <QuoteRequested>
                  <CheckInput
                    type="checkbox"
                    onClick={clickCheckBox}
                    disabled={steps[1]}
                    value={1}
                  />
                  <InputMessage>판매 완료</InputMessage>
                </QuoteRequested>
                <DealerAssigned>
                  <CheckInput
                    type="checkbox"
                    onClick={clickCheckBox}
                    disabled={steps[2]}
                    value={2}
                  />
                  <InputMessage>판매 요청</InputMessage>
                </DealerAssigned>
                <DealerConsulting>
                  <CheckInput
                    type="checkbox"
                    onClick={clickCheckBox}
                    disabled={steps[3]}
                    value={3}
                  />
                  <InputMessage>딜러 방문 상담</InputMessage>
                </DealerConsulting>
                <SellingRequested>
                  <CheckInput
                    type="checkbox"
                    onClick={clickCheckBox}
                    disabled={steps[4]}
                    value={4}
                  />
                  <InputMessage>담당 딜러 배정</InputMessage>
                </SellingRequested>
                <SellingComplete>
                  <CheckInput
                    type="checkbox"
                    onClick={clickCheckBox}
                    disabled={steps[5]}
                    value={5}
                  />
                  <InputMessage>견적요청 접수</InputMessage>
                </SellingComplete>
              </ManangeProcess>
            </CarWrapper>
          </Car>
        </ListWrapper>
      </ListContainer>
    </div>
  );
};

const ListContainer = styled.div`
  width: 640px;
  margin: 0px auto;
  margin-top: 30px;
  padding: 10px;
  box-sizing: border-box;
  @media only screen and (max-width: 640px) {
    width: 90%;
    padding: 0px;
    margin: 0px auto;
    padding-left: 0;
  }
`;

const ListWrapper = styled.div``;

const Car = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CarWrapper = styled.div`
  margin-bottom: 30px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
`;

const CarInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px 0px 30px;
  gap: 60px;
  :hover {
    cursor: pointer;
  }
`;

const CarNumber = styled.span`
  font-size: 30px;
`;

const ManangeProcess = styled.div`
  display: flex;
  visibility: ${(props) => (props.isShow ? "visible" : "hidden")};
  opacity: ${(props) => (props.isShow ? "1" : "0")};
  height: ${(props) => (props.isShow ? "30vh" : "0vh")};
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  transition: all 1s;
`;

const QuoteRequested = styled.div``;

const DealerAssigned = styled.div``;

const DealerConsulting = styled.div``;

const SellingRequested = styled.div``;

const SellingComplete = styled.div``;

const CheckInput = styled.input`
  width: 1.4em;
  height: 1.4em;
  margin: 15px;
  border: 2px;
  cursor: pointer;
  border: 3px solid rgba(0, 0, 0, 0.2);
`;

const InputMessage = styled.span`
  font-size: 18px;
`;

export default CarCard;
