import React, { FC, useRef, useEffect } from "react";
import styled from "styled-components";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { mokeDataT, childrenT, addItemsT } from "../../App.types";
import { useStore, useStoreTheme } from "../../store";
import NoData from "../NoData";

const configScroll: ScrollIntoViewOptions = {
  behavior: "smooth",
  block: "center",
};

const ListParseItems: FC = () => {
  const [animationParent] = useAutoAnimate();
  const arrayInit = useStore((state) => state.mokeData);
  const idFocus = useStore((state) => state.idFocus);
  const serchId = useStore((state) => state.searchId);
  const addItemsFunc = useStore((state) => state.addItem);
  const removeItems = useStore((state) => state.removeItem);
  const { theme } = useStoreTheme((state) => state);

  const lastItemRef = useRef<HTMLLIElement | null>(null);
  const addItems: addItemsT = (flag) => (event?) => {
    serchId(event);
    addItemsFunc(flag)();
  };

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView(configScroll);
    }
  }, [arrayInit]);

  if (!arrayInit.length) {
    return <NoData addItem={addItems(undefined)} />;
  }

  const parseItems = (el: childrenT) => (
    <>
      <S.Li
        $children={el.children}
        $idParents={el?.idParents}
        $theme={theme}
        ref={el.id === idFocus ? lastItemRef : null}
      >
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
        <S.Ul ref={animationParent} $theme={theme}>
          {el?.children?.map((el: childrenT) => (
            <React.Fragment key={el.id}>{parseItems(el)}</React.Fragment>
          ))}
          {(!el?.idParents || (el?.idParents && el?.children)) && (
            <S.Btn onClick={addItems(el)}>+</S.Btn>
          )}
        </S.Ul>
      )}
      {(!el?.idParents || el?.children) && arrayInit?.at(-1)?.id === el.id && (
        <S.Btn onClick={addItems("newParent")}>+</S.Btn>
      )}
    </>
  );

  return arrayInit?.map((el: mokeDataT) => (
    <S.Ul $theme={theme} className="parentSome" key={el?.id}>
      {parseItems(el)}
    </S.Ul>
  ));
};

export default ListParseItems;

const S = {
  Ul: styled.ul<{ $theme?: boolean }>`
    border: ${({ $theme }) => (!$theme ? "1px solid grey" : "1px solid white")};
    list-style-type: upper-roman;
    padding: 10px;
    margin: 0;
    height: auto;
  `,

  Li: styled.li<{
    $idParents?: string;
    $children?: childrenT[];
    $theme?: boolean;
  }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-image: linear-gradient(to right, red, green) 1;
    position: ${({ $idParents, $children }) =>
      !$idParents || $children ? "sticky" : "relative"};
    z-index: ${({ $idParents, $children }) =>
      $children ? $idParents?.split("-").join("") || 1 : "0"};
    background-color: ${({ $idParents, $children }) =>
      !$idParents || $children ? "white" : "none"};
    color: ${({ $theme }) => ($theme ? "black" : "inherit")};
    width: ${({ $idParents, $children }) =>
      !$idParents || $children ? "fit-content" : "auto"};
    border-bottom: ${({ $idParents, $children }) =>
      $idParents && !$children ? "1px solid transparent" : "none"};
    top: 0;

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
