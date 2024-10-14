import React, { FC } from "react";
import styled from "styled-components";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { mokeDataT, childrenT } from "../../App.types";
import { useStore } from "../../store";
import NoData from "../NoData";

const ListParseItems: FC = () => {
  const [animationParent] = useAutoAnimate();
  const arrayInit = useStore((state) => state.mokeData);
  const addItems = useStore((state) => state.addItems);
  const removeItems = useStore((state) => state.removeItems);

  if (!arrayInit.length) {
    return <NoData addItem={addItems(undefined)} />;
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
              <S.Btn $minus onClick={removeItems(el)}>
                -
              </S.Btn>
            )}
            {!el?.children && <S.Btn onClick={addItems(el)}>+</S.Btn>}
          </span>
        </S.Li>
        {el?.children && (
          <S.Ul ref={animationParent}>
            {el?.children?.map((el: childrenT) => (
              <React.Fragment key={el.id}>{parseItems(el)}</React.Fragment>
            ))}
            {(!el?.idParents || (el?.idParents && el?.children)) && (
              <S.Btn onClick={addItems(el)}>+</S.Btn>
            )}
          </S.Ul>
        )}
        {!el?.idParents && el?.children && (
          <S.Btn onClick={addItems("newParent")}>+</S.Btn>
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
