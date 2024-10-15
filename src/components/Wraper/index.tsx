import { FC } from "react";
import styled from "styled-components";

import { WraperPropsT } from "../../App.types";
import StatisticsList from "../StatisticsList";

const Wraper: FC<WraperPropsT> = ({ children }) => {
  return (
    <>
      <S.Header>
        <p>-- Вложенные списки --</p>
      </S.Header>
      <S.Main>{children}</S.Main>
      <S.Foter>
        <StatisticsList />
      </S.Foter>
    </>
  );
};

export default Wraper;

const S = {
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
};
