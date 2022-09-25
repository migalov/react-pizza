import React, { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/filter/slice";

export const Search: React.FC = () => {
  const [value, setValue] = useState(""),
    dispatch = useDispatch(),
    inputRef = useRef<HTMLInputElement>(null),
    onClickClear = (event: React.MouseEvent<HTMLSpanElement>) => {
      dispatch(setSearchValue(""));
      setValue("");
      inputRef.current?.focus();
    },
    updateSearchValue = useCallback(
      debounce((str: string) => {
        dispatch(setSearchValue(str));
      }, 700),
      []
    ),
    onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      updateSearchValue(event.target.value);
    };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        ></circle>
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        ></line>
      </svg>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={value}
      />
      {value && (
        <span onClick={onClickClear} className={styles.clearIcon}>
          ❌
        </span>
      )}
    </div>
  );
};
