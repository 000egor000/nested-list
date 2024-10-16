import { FC } from "react";
import styled from "styled-components";
import { PiLampPendant, PiLampPendantFill } from "react-icons/pi";

import { WraperPropsT, initThemeT } from "../../App.types";
import StatisticsList from "../StatisticsList";
import { useStoreTheme } from "../../store";

const initTheme: initThemeT = {
  true: { title: "светлую", svg: <PiLampPendantFill /> },
  false: { title: "темную", svg: <PiLampPendant /> },
};

const Wraper: FC<WraperPropsT> = ({ children }) => {
  const { theme, changeTheme } = useStoreTheme((state) => state);
  const titltToolTip = `Перейти на ${
    initTheme[theme.toString()]["title"]
  } тему`;

  return (
    <S.Shell $theme={theme}>
      <S.Header>
        <p>-- Вложенные списки --</p>
        <S.Btn $theme={theme} onClick={changeTheme}>
          {initTheme[theme.toString()]["svg"]}
          <span> {titltToolTip}</span>
        </S.Btn>
      </S.Header>
      <S.Main>{children}</S.Main>
      <S.Foter>
        <StatisticsList />
      </S.Foter>
    </S.Shell>
  );
};

export default Wraper;

const S = {
  Shell: styled.div<{ $theme: boolean }>`
    background-color: ${({ $theme }) => ($theme ? "grey" : "white")};
    color: ${({ $theme }) => ($theme ? "white" : "inherit")};
  `,

  Header: styled.header`
    padding: 0 20px;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 1px 10px black;
  `,
  Main: styled.main`
    padding: 30px;
    margin: 10px auto;
    max-width: 600px;
    width: 100%;
    min-height: calc(100vh - 120px);
    height: 100px;
    overflow-y: scroll;
    box-shadow: 1px 1px 10px black;
    ul.parentSome:not(:first-child) {
      border-top: none;
    }
  `,
  Foter: styled.footer`
    padding: 10px;
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    box-shadow: 1px 1px 10px black;
    gap: 10px;
  `,
  Btn: styled.button<{ $theme: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 30px;
    padding: 5px 10px;
    margin: 5px;
    background-color: ${({ $theme }) => (!$theme ? "#ededed" : "white")};
    cursor: pointer;
    border: none;
    border-radius: 10px;

    & span {
      visibility: hidden;
      min-width: 220px;
      word-wrap: break-word;
      background-color: ${({ $theme }) => ($theme ? "white" : "grey")};
      color: ${({ $theme }) => ($theme ? "black" : "white")};
      text-align: center;
      border-radius: 6px;
      padding: 5px 0;
      position: absolute;
      top: 30px;
      right: 30px;
      z-index: 1;
    }
    &:hover {
      & span {
        visibility: visible;
      }
    }
  `,
};
