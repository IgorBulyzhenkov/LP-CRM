import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import dataJson from "../data.json";
import s from "./Table.module.css";

const bodyEl = document.querySelector("body");

function Table() {
  const [data, setData] = useState(dataJson);
  const [selectValue, setSelectValue] = useState(
    data.map(({ Название }) => Название)
  );
  const [selectShow, setSelectShow] = useState(false);
  const [inputName, setInputName] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [inputId, setInputId] = useState("");
  const [newInputName, setNewInputName] = useState("");

  const handleChange = ({ target: { value } }) => {
    setInputName(value.trim());
  };
  const handleModal = ({ target }) => {
    if (!selectShow && target.id === "Название") {
      return setSelectShow(true);
    }
    if (target.id === "modal" || target.id === "modal-text") return;
    setSelectShow(false);
  };

  bodyEl.addEventListener("click", handleModal);

  const handleNewChange = ({ target: { value } }) => {
    setNewInputName(value);
  };

  const handlePlus = () => {
    const tbodyEl = document.querySelector("tbody");
    const markup = `<tr className={${s.newTr}}>
    <td className={${s.newTd}}>
    <input type="checkbox" name="checkbox" value=${checkbox} />
    </td>
        <td className={${s.newTd}}>хххх-</td>
        <td className={${s.newTd}}>
       <input
            type="text"
            name="inputId"
            id="inputId"
            autofocus="on"
          />
        </td>
        <td className={${s.newTd}}>
          <input
            type="text"
            name="inputName"
            id="inputName"
            autofocus="on"
            />
            <${CgClose}/>
            </td>
      </tr>`;
    tbodyEl.insertAdjacentHTML("afterbegin", markup);
  };
  const inputIdEl = document.querySelector("#inputId");
  const inputNameEl = document.querySelector("#inputName");
  const changeIdInput = ({ target: { value, name } }) => {
    switch (name) {
      case "inputId":
        return setInputId(value);

      case "inputName":
        return setNewInputName(value);

      default:
        break;
    }
  };

  if (inputIdEl) inputIdEl.addEventListener("change", changeIdInput);
  if (inputNameEl) inputNameEl.addEventListener("change", changeIdInput);

  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div className={s.container}>
      <table
        className={s.table}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <thead>
          <tr>
            <th className={s.thStatus}>
              Статус
              <input
                type="text"
                name="text"
                className={s.input}
                disabled={true}
              />
              {isShown && <AiFillCaretDown className={s.icon} />}
            </th>
            <th className={s.thGoods}>
              Товар
              <input
                type="text"
                name="text"
                className={s.input}
                disabled={true}
              />
              {isShown && <AiFillCaretDown className={s.icon} />}
            </th>
            <th className={s.thId}>
              ID
              <input
                type="text"
                name="text"
                className={s.input}
                disabled={true}
              />
              {isShown && <AiFillCaretDown className={s.icon} />}
            </th>
            <th className={s.thName}>
              Название
              <input
                type="text"
                name="text"
                value={inputName}
                onChange={handleChange}
                className={s.inputName}
                id="Название"
                autoComplete="off"
              />
              {isShown && <AiFillCaretDown className={s.iconName} />}
              {selectShow && (
                <div className={s.modal} id="modal">
                  <ul className={s.list}>
                    <li className={s.item}>
                      <p className={s.text} id="modal-text">
                        Все
                      </p>
                    </li>
                    {selectValue.map((item, index) => {
                      return (
                        <li key={index} className={s.item}>
                          <p className={s.text} id="modal-text">
                            {item.length > 7
                              ? item.split("").splice(0, 8).join("") + "..."
                              : item}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div className={s.btnContainer}>
        <div className={s.plus}>
          <BsPlus className={s.plusIcon} onClick={handlePlus} />
        </div>
        <div className={s.delete}>
          <CgClose className={s.deleteIcon} onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default Table;
