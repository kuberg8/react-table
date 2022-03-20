import React from "react";
import style from "./loader.module.css";

export default function Loader() {
  return (
    <div className={style['wrap-spinner__small']}>
      <div className={style['lds-spinner']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
