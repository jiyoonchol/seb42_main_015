import React, { useEffect, useRef, useState } from "react";
import * as W from "./WriteStyled";
import { BiMicrophone, BiFontColor, BiLock, BiLockOpen } from "react-icons/bi";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { SlQuestion } from "react-icons/sl";
import { PALETTE_V1 } from "../../style/color";
import LetterContent from "./LetterContent";
import SendMeModal from "./SendMeModal";
import Modal from "../commons/Modal";
import FontMenu from "./FontMenu";
import ShadowButton from "../commons/ShadowButton";

function WriteLetter() {
  const [openExplaination, setOpenExplaination] = useState(false);
  const [sendMeChecked, setSendMeChecked] = useState(false);
  const [openSendMe, setOpenSendMe] = useState(false);
  const [activeIcon, setActiveIcon] = useState("");
  const [startDate, setStartDate] = useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    )
  );
  const [contentLength, setContentLength] = useState(0);
  const handleOpenExplanation = () => {
    setOpenExplaination(!openExplaination);
  };
  const handleActiveIcon = (e) => {
    if (e.target.id === activeIcon) {
      setActiveIcon("");
    } else {
      setActiveIcon(e.target.id);
    }
  };

  useEffect(() => {
    // console.log(activeIcon); // 클릭 시 active 에러
  }, [activeIcon]);
  return (
    <W.PageContainer>
      {openExplaination || openSendMe ? <W.ExplainationBackground /> : <></>}
      {openSendMe ? (
        <Modal
          ContainerHeight={"350px"}
          children={
            <SendMeModal
              startDate={startDate}
              setStartDate={setStartDate}
              openSendMe={openSendMe}
              setOpenSendMe={setOpenSendMe}
              sendMeChecked={sendMeChecked}
              setSendMeChecked={setSendMeChecked}
            />
          }
        />
      ) : (
        <></>
      )}
      <W.PageWrapper>
        <W.FlexWrapper2>
          <W.IconWrapper>
            <BiMicrophone
              onClick={handleActiveIcon}
              className={
                activeIcon === "음성인식"
                  ? "active-icon microphone-icon"
                  : "microphone-icon"
              }
              size="50"
              id="음성인식"
            />
            <W.BallonWrapper>
              <BiFontColor
                onClick={handleActiveIcon}
                className={
                  activeIcon === "폰트변경"
                    ? "active-icon font-icon"
                    : "font-icon"
                }
                size="50"
                id="폰트변경"
              />
              {activeIcon === "폰트변경" ? <FontMenu /> : <></>}
              {openExplaination ? (
                <W.BallonTop id="ballon2">
                  글씨체를 변경할 수 있습니다.
                </W.BallonTop>
              ) : (
                <></>
              )}
            </W.BallonWrapper>
          </W.IconWrapper>
          <W.ThemeIcon>
            <MdArrowBackIos className="arrow-backward-icon" size="30" />
          </W.ThemeIcon>
          <W.LetterWrapper>
            <LetterContent
              sendMeChecked={sendMeChecked}
              setSendMeChecked={setSendMeChecked}
              openExplaination={openExplaination}
              openSendMe={openSendMe}
              setOpenSendMe={setOpenSendMe}
              setContentLength={setContentLength}
            />
            <W.BallonWrapper>
              <W.TextCount>{contentLength}/7000</W.TextCount>
              {openExplaination ? (
                <W.BallonTop id="ballon3">
                  글자 수를 확인할 수 있습니다.
                </W.BallonTop>
              ) : (
                <></>
              )}
            </W.BallonWrapper>
          </W.LetterWrapper>
          <W.ThemeIcon>
            <MdArrowForwardIos className="arrow-forward-icon" size="30" />
          </W.ThemeIcon>
        </W.FlexWrapper2>
        <W.ButtonContainer>
          <W.ButtonWrapper>
            <SlQuestion
              onClick={handleOpenExplanation}
              className="question-icon"
              size="30"
            />
            <W.BallonWrapper className="button">
              {openExplaination ? (
                <W.BallonBottom2 id="ballon5">
                  작성한 편지를 미리 볼 수 있습니다.
                </W.BallonBottom2>
              ) : (
                <></>
              )}
              <ShadowButton backgroundColor={PALETTE_V1.yellow_button}>
                미리보기
              </ShadowButton>
            </W.BallonWrapper>
            <W.BallonWrapper className="button">
              {openExplaination ? (
                <W.BallonBottom1 id="ballon4">
                  작성을 마무리하고 편지를 생성합니다.
                </W.BallonBottom1>
              ) : (
                <></>
              )}
              <ShadowButton backgroundColor={PALETTE_V1.yellow_button}>
                편지생성
              </ShadowButton>
            </W.BallonWrapper>
          </W.ButtonWrapper>
        </W.ButtonContainer>
      </W.PageWrapper>
    </W.PageContainer>
  );
}

export default WriteLetter;
