import { FC } from "react";
import styled from "styled-components";

import { useStore } from "../../store";

const StatisticsList: FC = () => {
  const countParents = useStore((state) => state.statistics);
  const mokeData = useStore((state) => state.mokeData);
  const clearItems = useStore((state) => state.clearItems);
  const isEmty = +countParents.Родители === 0 && !mokeData.length;

  return (
    <>
      {Object.entries(countParents)?.map(([key, val]) => (
        <S.Main key={key}>
          <span>{key}</span>
          <span>{val}</span>
        </S.Main>
      ))}
      <S.Btn $isEmty={isEmty} onClick={clearItems} disabled={isEmty}>
        Сбросить
      </S.Btn>
    </>
  );
};

export default StatisticsList;

const S = {
  Main: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    & span:last-child {
      font-weight: bold;
    }
  `,

  Btn: styled.button<{ $isEmty?: boolean }>`
    padding: 5px 10px;
    margin: 5px;
    background-color: #db7575;
    border: none;
    border-radius: 10px;
    color: ${({ $isEmty }) => ($isEmty ? "white" : "inherit")};
    cursor: ${({ $isEmty }) => ($isEmty ? "not-allowed" : "pointer")};
  `,
};
