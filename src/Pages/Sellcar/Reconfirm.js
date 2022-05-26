// modules
import { useNavigate } from "react-router-dom";
//styles
import styled from "styled-components";
// import { useEffect, useState } from "react";

function Reconfirm() {
  const navigate = useNavigate();

  const handleRequest = () => {
    setCarDB();
    navigate("/complete");
  };

  const handleRevise = () => {
    navigate("/sellcar");
  };

  let options = [
    "네비게이션",
    "선루프",
    "통풍시트",
    "디지털키",
    "옵션명",
    "옵션명",
  ];
  let option = "";
  for (let i = 0; i < JSON.parse(localStorage.getItem("options")).length; i++) {
    option = option.concat(",", options[i]);
  }
  option = option.substr(1);
  console.log(option);

  const carNumber = localStorage.getItem("carNumber");
  const distanceDB = localStorage.getItem("driving_distance");
  const commaNumber = distanceDB.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const setCarDB = () => {
    fetch(`/car`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        carNumber: carNumber,
        additionalInfo: localStorage.getItem("additional_info"),
        distance: distanceDB,
        optionIdList: localStorage.getItem("options"),
        contact: localStorage.getItem("contact"),
        address: localStorage.getItem("address"),
        addressDetail: localStorage.getItem("detailAddress"),
        lat: localStorage.getItem("lat"),
        lon: localStorage.getItem("lon"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ss", data);
      });
  };

  return (
    <ReconfirmWrap>
      <ReconfirmTitle>입력하신 추가 정보를 확인해주세요.</ReconfirmTitle>
      <ReconfirmBox>
        <ReconfirmBoxTitle>
          <span>주행거리</span>
          <span>옵션</span>
          <span>추가정보</span>
          <span>연락처</span>
          <span>지역</span>
          <span>상세주소</span>
        </ReconfirmBoxTitle>
        <ReconfirmBoxInfo>
          <span>{commaNumber}</span>
          <span>{option}</span>
          <span>{localStorage.getItem("additional_info")}</span>
          <span>{localStorage.getItem("contact")}</span>
          <span>{localStorage.getItem("address")}</span>
          <span>{localStorage.getItem("detailAddress")}</span>
          {/* <span>{localStorage.getItem("lat")}</span>
          <span>{localStorage.getItem("lon")}</span> */}
        </ReconfirmBoxInfo>
      </ReconfirmBox>
      <ReviseBtn onClick={handleRevise}>수정하기</ReviseBtn>
      <ReconfirmBtn onClick={handleRequest}>견적신청</ReconfirmBtn>
    </ReconfirmWrap>
  );
}
const ReconfirmWrap = styled.div`
  @media only screen and (max-width: 640px) {
    width: 90%;
    padding: 0px;
    margin: 30px auto;
    padding-left: 0;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 640px;
  margin: 30px auto;
  padding: 10px;
  box-sizing: border-box;
`;

const ReconfirmTitle = styled.span`
  margin-bottom: 25px;
  font-size: 20px;
  font-weight: 500;
`;

const ReconfirmBox = styled.div`
  padding: 35px 50px;
  margin-bottom: 30px;
  border: 1px solid #adadad;
  border-radius: 8px;
`;

const ReconfirmBoxTitle = styled.div`
  float: left;
  display: flex;
  flex-direction: column;
  span {
    margin-bottom: 20px;
    font-weight: 500;
    color: gray;
  }
`;

const ReconfirmBoxInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 80px;
  span {
    margin-bottom: 20px;
  }
`;
const ReviseBtn = styled.button`
  width: 180px;
  padding: 12px 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  border: 1px solid #adadad;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #5c1049;
  background-color: white;
  box-shadow: 3px 3px 4px #d8d8d8;
`;
const ReconfirmBtn = styled.button`
  width: 180px;
  padding: 12px 15px;
  border-radius: 5px;
  border: 1px solid #adadad;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: white;
  background-color: #5c1049;
  box-shadow: 3px 3px 4px #d8d8d8;
`;
export default Reconfirm;
