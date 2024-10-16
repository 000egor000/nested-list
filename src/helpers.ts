import { mokeDataT, childrenT } from "./App.types";

const funcRemove = (el: mokeDataT, arr: mokeDataT[]) =>
  arr.reduce((acc: mokeDataT[], curr) => {
    if (curr.children) {
      const { children, ...rest } = curr;
      const filteredChildren = funcRemove(el, children) as childrenT[];

      acc.push({
        ...(filteredChildren.length
          ? { ...curr, children: filteredChildren }
          : rest),
      });
    } else if (curr.id !== el?.id) {
      acc.push(curr);
    }
    return acc;
  }, []);

const funcMap = (el: mokeDataT, arr: mokeDataT[]) =>
  arr.map((elem) => {
    if (elem.id === el.id) {
      return el;
    }

    return elem;
  });

const handleClickAdd =
  (arr: mokeDataT[], el?: childrenT | "newParent") => () => {
    if (!el || el === "newParent") {
      const newParentId =
        el === "newParent" ? String(Number(arr?.at(-1)?.id) + 1) : "1";

      return [
        ...arr,
        {
          id: newParentId,
          children: [{ id: `${newParentId}-1`, idParents: newParentId }],
        },
      ];
    } else if (!el?.children) {
      el.children = [
        {
          id: `${el?.id}-1`,
          idParents: el.id,
        },
      ];
    } else {
      const lastChild = el?.children?.at(-1);

      el.children.push({
        id: lastChild
          ? `${
              lastChild.id.slice(0, lastChild.id.length - 1) +
              (+lastChild.id[lastChild.id.length - 1] + 1)
            }`
          : `${el.id}-1`,
        idParents: lastChild?.idParents || el.id,
      });
    }

    return funcMap(el, arr);
  };

const countParents = (arr: childrenT[]) => {
  const res = {
    Родители: 0,
    Дети: 0,
  };

  const loop = (arr: childrenT[]) => {
    arr.forEach((el) => {
      if (el.children) {
        res.Родители += 1;
        loop(el.children);
      } else {
        if ((el.children && el.idParents)||(el.children || el.idParents)) {
          res.Дети += 1;
        }
      }
    });
  };

  loop(arr);

  return res;
};

const handleClickRemove =
  (arr: mokeDataT[], el: childrenT | undefined) => () => {
    return el ? funcRemove(el, arr) : arr;
  };

export { handleClickAdd, handleClickRemove, countParents };
