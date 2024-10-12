import React, { FC, useState } from "react";
import styled from "styled-components";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { mokeDataT, childrenT } from "../../App.types";
import { mokeData } from "./const";
import { handleClickAdd, handleClickRemove } from "./helpers";

import NoData from "../NoData";

const ListParseItems: FC = () => {
  const [arrayInit, setArrayInit] = useState<mokeDataT[]>(mokeData);
  const [animationParent] = useAutoAnimate();

  const addItem = (el: childrenT | "newParent" | undefined) => () => {
    const resFunc = handleClickAdd(arrayInit, el);
    setArrayInit(resFunc());
  };
  const removeItem = (el: childrenT) => () => {
    const resFunc = handleClickRemove(arrayInit, el);
    setArrayInit(resFunc());
  };

  if (!arrayInit.length) {
    return <NoData addItem={addItem(undefined)} />;
  }

  const parseItems = (el: childrenT) => {
    return (
      <>
        <S.Li $children={el.children} $idParents={el?.idParents}>
          <S.ParentS $children={el.children} $idParents={el?.idParents}>
            {el?.id}
          </S.ParentS>
          <span>
            {!(!el?.idParents || (el?.idParents && el?.children)) && (
              <S.Btn $minus onClick={removeItem(el)}>
                -
              </S.Btn>
            )}
            {!el?.children && <S.Btn onClick={addItem(el)}>+</S.Btn>}
          </span>
        </S.Li>
        {el?.children && (
          <S.Ul ref={animationParent}>
            {el?.children?.map((el: childrenT) => (
              <React.Fragment key={el.id}>{parseItems(el)}</React.Fragment>
            ))}
            {(!el?.idParents || (el?.idParents && el?.children)) && (
              <S.Btn onClick={addItem(el)}>+</S.Btn>
            )}
          </S.Ul>
        )}
        {!el?.idParents && el?.children && (
          <S.Btn onClick={addItem("newParent")}>+</S.Btn>
        )}
      </>
    );
  };

  return arrayInit?.map((el: mokeDataT) => (
    <S.Ul className="parentSome" key={el?.id}>
      {parseItems(el)}
    </S.Ul>
  ));
};

export default ListParseItems;

const S = {
  Ul: styled.ul`
    border: 1px solid red;
    list-style-type: upper-roman;
    padding: 10px;
    margin: 0;
  `,

  Li: styled.li<{ $idParents?: string; $children?: childrenT[] }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: ${({ $idParents, $children }) =>
      !$idParents || ($idParents && $children) ? "none" : "1px solid green"};
    &:last-child {
      border-bottom: none;
    }
  `,
  ParentS: styled.span<{ $idParents?: string; $children?: childrenT[] }>`
    box-shadow: ${({ $idParents, $children }) =>
      (!$idParents || ($idParents && $children)) && "1px 1px 5px black"};
    padding: 10px;
    margin: 10px;
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
