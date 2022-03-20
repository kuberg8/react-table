import React, { useState, useEffect } from "react";
import style from "./table.module.css";
import Loader from "../Loader/Loader";

const initTableProp = {
  columns: [],
  items: [],
  sort: () => {},
  portionSize: 3,
  loading: false,
};

export default function Table(props = initTableProp) {
  const [state, setState] = useState({
    descending: null,
    portionNumber: 1,
    currentPage: 1,
    pageSize: 10,
  });

  useEffect(() => {
    state.descending !== null && props.sort(state.descending);
  }, [state.descending]);

  useEffect(() => {
    if (state.currentPage > 1) {
      setState({
        ...state,
        currentPage: 1,
        portionNumber: 1,
      });
    }
  }, [props.items.length, state.pageSize]);

  let pagesCount = Math.ceil(props.items.length / state.pageSize);
  let pageMas = [];

  for (var i = 1; i <= pagesCount; i++) {
    pageMas.push(i);
  }

  let portionCount = Math.ceil(pagesCount / props.portionSize);
  let leftPageNumber = (state.portionNumber - 1) * props.portionSize + 1;
  let rightPageNumber = state.portionNumber * props.portionSize;

  console.log("table render");
  return (
    <table className="table">
      <thead>
        <tr>
          {props.columns.map(({ name, key }, i) => (
            <th
              key={i}
              onClick={() =>
                key == "age" &&
                setState({ ...state, descending: !state.descending })
              }
            >
              {name}
              {key == "age" && (
                <i
                  className={
                    style.arrow + " " + (state.descending && style.descending)
                  }
                ></i>
              )}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {props.loading ? (
          <tr>
            <td colSpan={props.columns.length}>
              <Loader />
            </td>
          </tr>
        ) : (
          props.items
            .slice(
              state.pageSize * state.currentPage - state.pageSize,
              state.pageSize * state.currentPage
            )
            .map((item, i) => (
              <tr key={i}>
                {props.columns.map(({ key }, i) => (
                  <td key={i + key}>{item[key]}</td>
                ))}
              </tr>
            ))
        )}
      </tbody>

      <tfoot>
        <tr>
          <td colSpan={props.columns.length}>
            <div
              className="d-flex justify-content-center"
              style={{ columnGap: "10px" }}
            >
              <button
                className="btn btn-outline-primary"
                disabled={state.portionNumber == 1}
                onClick={() =>
                  state.portionNumber > 1 &&
                  setState({ ...state, portionNumber: state.portionNumber - 1 })
                }
              >
                Назад
              </button>
              {pageMas
                .slice(leftPageNumber - 1, rightPageNumber)
                .map((page, i) => (
                  <button
                    key={i}
                    className={
                      "btn btn-link" +
                      (page == state.currentPage ? "active" : "")
                    }
                    onClick={() => setState({ ...state, currentPage: page })}
                  >
                    {page}
                  </button>
                ))}
              <button
                className="btn btn-outline-primary"
                disabled={state.portionNumber == portionCount}
                onClick={() =>
                  state.portionNumber < portionCount &&
                  setState({ ...state, portionNumber: state.portionNumber + 1 })
                }
              >
                Вперед
              </button>

              <div className="d-flex align-items-center">
                <select
                  className="form-select"
                  style={{ width: "80px", marginRight: "10px" }}
                  onChange={({ target }) => {
                    setState({ ...state, pageSize: +target.value });
                  }}
                  value={state.pageSize}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  {/* <option value={props.items.length}>Все</option> */}
                </select>
                - Строк в таблице
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
