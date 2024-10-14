import { FC } from "react";
import styled from "styled-components";

import { NoDataPropsT } from "../../App.types";

const NoData: FC<NoDataPropsT> = ({ addItem }) => {
  return (
    <S.NotData>
      <span>Нет данных!</span>
      <S.Btn onClick={addItem}>+</S.Btn>
    </S.NotData>
  );
};

export default NoData;

const S = {
  NotData: styled.div`
    box-shadow: 0px 5px 5px black;
    padding: 10px;
    margin: auto;
    text-aligh: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
  `,
  Btn: styled.button<{ $minus?: boolean }>`
    padding: 5px 10px;
    margin: 5px;
    background-color: ${({ $minus }) => ($minus ? "#db7575" : "#8ae78a")};
    cursor: pointer;
    border: none;
    border-radius: 10px;
  `,
};
