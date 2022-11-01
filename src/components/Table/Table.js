import { useState, useEffect } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import dataJson from "../data.json";
import s from "./Table.module.css";
import image from "../image/Group.png";

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
  const [isShowPlus, setIsShowPlus] = useState(false);
  const [input, setInput] = useState(false);

  useEffect(() => {
    setSelectValue(data.map(({ Название }) => Название));
    const handleModal = ({ target }) => {
      if (!selectShow && target.id === "Название") {
        return setSelectShow(true);
      }
      if (target.id === "modal" || target.id === "modal-text") return;
      setSelectShow(false);
    };
    bodyEl.addEventListener("click", handleModal);
    if (isShowPlus) {
      return bodyEl.removeEventListener("click", handleModal);
    }
  }, [data, isShowPlus, selectShow]);

  const newData = {
    Статус: checkbox,
    Товар: "хххх-",
    ID: Number(inputId),
    img: "./image/kyivstar.svg",
    Название: newInputName,
  };

  const handleChange = ({ target: { value } }) => {
    setInputName(value.trim());
  };

  const handlePlus = () => {
    setIsShowPlus(true);
  };

  const changeIdInput = ({ target: { value, name, checked } }) => {
    switch (name) {
      case "inputId":
        return setInputId(value);

      case "newInputName":
        return setNewInputName(value);

      case "checkbox":
        return setCheckbox(checked);

      default:
        break;
    }
  };

  const handleDelete = (e) => {
    const updateDate = data.filter((item) => {
      if (item.Статус) {
        return item;
      }
      return item.ID !== Number(e.target.id);
    });
    setData(updateDate);
  };

  const handleEnter = (e) => {
    if (e.code === "Enter" && e.target.id === "newInputName") {
      setIsShowPlus(false);
      setData((prevState) => [newData, ...prevState]);
      setInputId("");
      setNewInputName("");
    }
  };

  const clickDelete = () => {
    if (!checkbox) {
      setIsShowPlus(false);
    }
  };

  const handleAllDelete = () => {
    const updateDate = data.filter((item) => {
      if (item.Статус) {
        return item;
      }
      return;
    });
    setData(updateDate);
  };

  const handleUpdateStatus = (e) => {
    const updateDate = data.map((item) => {
      if (Number(e.target.id) === item.ID) {
        return { ...item, Статус: e.target.checked };
      }
      return item;
    });
    setData(updateDate);
  };

  const handleUpdateText = (e) => {
    console.log(e);
    const updateDate = data.map((item) => {
      if (Number(e.target.id) === item.ID) {
        return { ...item, Название: e.target.value };
      }
      return item;
    });
  };

  return (
    <div className={s.container}>
      <table
        className={s.table}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        cellSpacing="0"
        cellPadding="0"
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
                              ? item.split("").splice(0, 9).join("") + "..."
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
        <tbody>
          {isShowPlus && (
            <tr className={s.newTr}>
              <td className={s.newTd}>
                <div className={s.containerCheck}>
                  {checkbox ? (
                    <div className={s.customCheckLeft}></div>
                  ) : (
                    <div className={s.customCheckRight}></div>
                  )}
                  <input
                    type="checkbox"
                    name="checkbox"
                    value={checkbox}
                    onChange={changeIdInput}
                    className={s.check}
                  />
                </div>
              </td>
              <td className={s.newTd}>хххх-</td>
              <td className={s.newTdId} onKeyDown={handleEnter}>
                <input
                  type="text"
                  name="inputId"
                  value={inputId}
                  id="inputId"
                  autoFocus="on"
                  onChange={changeIdInput}
                  className={s.inputId}
                  maxLength="3"
                />
              </td>
              <td className={s.newTdName} onKeyDown={handleEnter}>
                <img src={image} className={s.img} alt="img" />
                <input
                  type="text"
                  name="newInputName"
                  value={newInputName}
                  id="newInputName"
                  onChange={changeIdInput}
                  className={s.inputName}
                />
                <div onClick={clickDelete} className={s.btnDelete}>
                  x
                </div>
              </td>
            </tr>
          )}
          {data.map(({ Статус, Товар, ID, Название }) => {
            return (
              <tr className={s.newTr} key={ID}>
                <td className={s.newTdStatus}>
                  <span className={s.span}></span>
                  <div
                    className={s.containerCheck}
                    id={ID}
                    onClick={handleUpdateStatus}
                  >
                    {Статус ? (
                      <div className={s.customCheckLeft}></div>
                    ) : (
                      <div className={s.customCheckRight}></div>
                    )}
                    <input
                      type="checkbox"
                      name="checkbox"
                      value={Статус}
                      className={s.check}
                      id={ID}
                    />
                  </div>
                </td>
                <td className={s.newTd}>{Товар}</td>
                <td className={s.newTdId} onKeyDown={handleEnter}>
                  {ID}
                </td>
                <td className={s.newTdName} onKeyDown={handleEnter}>
                  <img src={image} className={s.img} alt="" />
                  {Название ? (
                    <p
                      className={s.textName}
                      onClick={handleUpdateText}
                      id={ID}
                    >
                      {Название.length > 7
                        ? Название.split("").splice(0, 7).join("") + "..."
                        : Название}
                    </p>
                  ) : (
                    <input
                      type="text"
                      name="newInputName"
                      value={newInputName}
                      id="newInputName"
                      onChange={changeIdInput}
                      className={s.inputName}
                    />
                  )}
                  {isShown && (
                    <div onClick={handleDelete} className={s.btnDelete} id={ID}>
                      x
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={s.btnContainer}>
        <div className={s.plus}>
          <BsPlus className={s.plusIcon} onClick={handlePlus} />
        </div>
        {data.length ? (
          <div className={s.delete}>
            <CgClose className={s.deleteIcon} onClick={handleAllDelete} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Table;
