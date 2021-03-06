import styled from "styled-components";
import { useEffect, useState } from "react";
import MapInfo from "./MapInfo";
import DaumPostcode from "react-daum-postcode";

function ContactInfo() {
  const [phone, setPhone] = useState();
  const [isModal, setModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [addr, setAddr] = useState();
  const [postcodeAddr, setPostcodeAddr] = useState();
  const [isFindAddr, setFindAddr] = useState(false);
  const [detailAddr, setDetailAddr] = useState();

  let carNumber = localStorage.getItem("carNumber");
  const handleInput = (text) => {
    let regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (regPhone.test(text) === true) {
      setPhone(text);
      localStorage.setItem(`${carNumber}_contact`, text);
    } else {
      if (phone) setPhone();
    }
  };
  const onChange = (e) => {
    setDetailAddr(e.target.value);
    localStorage.setItem(`${carNumber}_detailAddress`, e.target.value);
  };
  useEffect(() => {
    setDetailAddr(localStorage.getItem(`${carNumber}_detailAddress`));
    setPhone(localStorage.getItem(`${carNumber}_contact`));
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem(`${carNumber}_address`) === undefined ||
      localStorage.getItem(`${carNumber}_address`) === null ||
      localStorage.getItem(`${carNumber}_address`) === "undefined"
    ) {
      if (addr !== undefined)
        localStorage.setItem(`${carNumber}_address`, addr);
    } else if (postcodeAddr !== "undefined" && postcodeAddr !== undefined) {
      localStorage.setItem(`${carNumber}_address`, postcodeAddr);
      setAddr(postcodeAddr);
    } else {
      if (
        localStorage.getItem(`${carNumber}_address`) !== undefined &&
        localStorage.getItem(`${carNumber}_address`) !== "undefined"
      ) {
        console.log("aavb", localStorage.getItem(`${carNumber}_address`));
        setAddr(localStorage.getItem(`${carNumber}_address`));
        setPostcodeAddr(localStorage.getItem(`${carNumber}_address`));
      } else {
        console.log("hey");
      }
    }
  }, [postcodeAddr, addr]);

  return (
    <Box>
      <P>????????? ??????????????? ??????</P>
      <P>???????????? ????????? ????????? ?????????.</P>
      <Contact>
        <Text>?????????</Text>
        <Input
          active={phone ? true : false}
          placeholder="010-0000-0000"
          onChange={(e) => {
            handleInput(e.target.value);
          }}
          value={phone}
        ></Input>
      </Contact>
      <Location>
        <Text>??????</Text>
        <FindBtn
          onClick={() => {
            setModal(true);
            setShowMap(!showMap);
          }}
        >
          ?????? ??????
        </FindBtn>
      </Location>
      {showMap ? (
        <>
          <MapInfo addr={addr} setAddr={setAddr} postcodeAddr={postcodeAddr} />
          <Address>
            <Text>??????</Text>
            <AddrText>{addr}</AddrText>

            <Text>????????????</Text>
            <AddrInput onChange={onChange} value={detailAddr} />
            {!isFindAddr ? (
              <FindBtn
                onClick={() => {
                  setFindAddr(!isFindAddr);
                }}
              >
                ????????????
              </FindBtn>
            ) : null}
            {isFindAddr ? (
              <Postcode setAddr={setAddr} setPostcodeAddr={setPostcodeAddr} />
            ) : null}
          </Address>
        </>
      ) : null}
    </Box>
  );
}
const Postcode = ({ setAddr, setPostcodeAddr }) => {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddr(fullAddress);
    setPostcodeAddr(fullAddress);
  };

  return <DaumPostcode onComplete={handleComplete} />;
};

const AddrText = styled.p`
  margin-right: 1.4em;
  letter-spacing: 0.7px;
  text-align: left;
  margin-right: 50px;
  margin-bottom: 20px;
`;
const Address = styled.div`
  align-items: center;
  margin-top: 20px;
`;
const AddrInput = styled.input`
  padding: 0px;
  font-size: 1.3em;
  height: 1.3em;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px;
  border-bottom-style: solid;
  border-color: black;
  &:focus {
    outline: none;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px;
    border-bottom-style: solid;
    border-color: red;
  }
`;
const FindBtn = styled.button`
  font-size: 1em;
  font-weight: 600;
  box-shadow: 5px 5px 10px #d8d8d8;
  border: 0px;
  background-color: white;
  border-radius: 20px;
  text-align: center;
  padding: 15px;
  margin: 5px;
  margin-bottom: 20px;
  font-size: 1em;
  cursor: pointer;
  &:hover {
    background-color: #5c1049;
    color: white;
  }
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 0px;
  margin: 0px;
  font-size: 1em;
  height: 1.3em;
  width: 110px;
  border: 0px;
  &:focus {
    outline: none;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 2px;
    border-bottom-style: solid;
    border-color: ${(props) => (props.active === true ? "green" : "red")};
  }
`;
const Contact = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 1.4em 0;
`;
const Text = styled.p`
  margin-right: 1.4em;
  letter-spacing: 0.7px;
  text-align: left;
`;
const P = styled.p`
  font-size: 1.2em;
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 25px;

  text-align: left;
`;

const Box = styled.div`
  border-top: 1px dotted #adadad;
  padding-top: 55px;
  width: 640px;
  box-sizing: border-box;
  margin: 0px auto;
  margin-top: 40px;
  text-align: center;
  @media only screen and (max-width: 640px) {
    width: 90%;
    padding: 0px;
    margin: 0px auto;
    margin-top: 40px;
    justfiy-content: center;
  }
`;
export default ContactInfo;
