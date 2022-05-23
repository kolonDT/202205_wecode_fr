import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaChevronRight } from "react-icons/fa";

const CarCard = ({ car }) => {
  //클릭 시 요청내역 관리 숨김-열기 상태값
  const [isShow, setIsShow] = useState(false);

  //
  const [checked, setChecked] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
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
    if (num !== 1 && checked[num - 1] === false) {
      alert("전 단계를 완료해주세요");
      return;
    }
    //체크 활성화 시키는 함수
    setChecked({ ...checked, [num]: true });

    const progressStep = progress[num - 1];
    //fetch 함수
    fetch(``, {
      method: "GET",
      headers: { "Content-type": "application/json" },
      body: {
        car_id: car.car_id,
        progress: progressStep,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  //
  useEffect(() => {
    const checked = {
      1: car.quote_requested !== null,
      2: car.dealer_assigned !== null,
      3: car.dealer_consulting !== null,
      4: car.selling_requested !== null,
      5: car.selling_completede !== null,
    };
    setChecked(checked);
  }, []);

  return (
    <div>
      <Car>
        <CarInfo onClick={clickShow}>
          <CarNumber>{car.car_number}</CarNumber>
          <FaChevronRight />
        </CarInfo>
        <ManangeProcess isShow={isShow}>
          <QuoteRequested>
            <CheckInput
              type="checkbox"
              onClick={clickCheckBox}
              disabled={checked[1]}
              value={1}
              checked={checked[1]}
            />
            <InputMessage>판매 완료</InputMessage>
          </QuoteRequested>
          <DealerAssigned>
            <CheckInput
              type="checkbox"
              onClick={clickCheckBox}
              disabled={checked[2]}
              value={2}
              checked={checked[2]}
            />
            <InputMessage>판매 요청</InputMessage>
          </DealerAssigned>
          <DealerConsulting>
            <CheckInput
              type="checkbox"
              onClick={clickCheckBox}
              disabled={checked[3]}
              value={3}
              checked={checked[3]}
            />
            <InputMessage>딜러 방문 상담</InputMessage>
          </DealerConsulting>
          <SellingRequested>
            <CheckInput
              type="checkbox"
              onClick={clickCheckBox}
              disabled={checked[4]}
              value={4}
              checked={checked[4]}
            />
            <InputMessage>담당 딜러 배정</InputMessage>
          </SellingRequested>
          <SellingComplete>
            <CheckInput
              type="checkbox"
              onClick={clickCheckBox}
              disabled={checked[5]}
              value={5}
              checked={checked[5]}
            />
            <InputMessage>견적요청 접수</InputMessage>
          </SellingComplete>
        </ManangeProcess>
      </Car>
    </div>
  );
};

const Car = styled.div`
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
  margin: ${(props) => (props.isShow ? "1.2em" : "0")};
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
