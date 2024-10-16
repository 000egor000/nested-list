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
    border-image: linear-gradient(to right, red, green) 1;
    border-bottom: 1px solid transparent;
    padding: 10px;
    margin: auto;
    text-aligh: center;
    display: flex;
    align-items: center;
    justify-content: space-around;
  `,
  Btn: styled.button`
    padding: 5px 10px;
    margin: 5px;
    background-color: #8ae78a;
    cursor: pointer;
    border: none;
    border-radius: 10px;
  `,
};
