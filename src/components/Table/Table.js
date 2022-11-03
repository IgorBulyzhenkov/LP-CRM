import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import dataJson from "../data.json";
import s from "./Table.module.css";
import image from "../image/Group.png";

function Table() {
  const [data, setData] = useState(dataJson);
  const [filterData, setFilterData] = useState(dataJson);
  const [selectShow, setSelectShow] = useState(false);
  const [inputName, setInputName] = useState("");
  const [isShown, setIsShown] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [inputId, setInputId] = useState("");
  const [newInputName, setNewInputName] = useState("");
  const [isShowPlus, setIsShowPlus] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const newData = {
    Статус: checkbox,
    Товар: "хххх-",
    ID: Number(inputId),
    img: "./image/kyivstar.svg",
    name: newInputName,
    check: false,
  };

  const handleChange = ({ target: { value } }) => {
    setInputName(value.trim());
    if (value.trim() === "") {
      return setData(dataJson);
    }

    const updateData = data.filter((item) => {
      if (item.name.toLowerCase().includes(value.toLowerCase())) {
        return item;
      }
      return null;
    });

    setData(updateData);
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
    if (
      e.code === "Enter" &&
      e.target.id === "newInputName" &&
      inputId.length <= 3
    ) {
      setIsShowPlus(false);
      setData((prevState) => [newData, ...prevState]);
      setInputId("");
      setNewInputName("");
      setFilterData((prevState) => [newData, ...prevState]);
    }
  };

  const clickDelete = () => {
    if (!checkbox) {
      setIsShowPlus(false);
    }
  };

  const handleAllDelete = () => {
    setInputName("");
    const updateDate = data.filter((item) => {
      if (item.Статус) {
        return item;
      }
      return null;
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

  const statusDelete = data.find((item) => item.Статус === false);

  const handleNameFilter = (e) => {
    if (e.target.id === "Все") {
      const updateDate = filterData.map(({ checked, ...item }) => {
        if (checked === true) {
          const newItem = { ...item, checked: false };
          return newItem;
        }
        return { checked, ...item };
      });
      setData(updateDate);
      setFilterData(updateDate);
      return setInputName("");
    } else {
      const updateDate = filterData.map(({ checked, ...item }) => {
        if (e.target.id === item.name) {
          const newItem = { ...item, checked: e.target.checked };
          return newItem;
        }
        return { checked, ...item };
      });
      setFilterData(updateDate);
      const newData = updateDate.filter((item) => {
        if (item.checked === true) {
          return item;
        }
        return null;
      });
      setData(newData);
      return setInputName(newData.map((item) => item.name));
    }
  };

  const handleUpdateText = (e) => {
    const updateDate = data.map(({ ID, ...item }) => {
      if (Number(e.target.id) === ID) {
        setNewInputName(item.name);
        setUpdateId(ID);
        const newName = { ...item, ID, name: "" };
        return newName;
      }
      return { ID, ...item };
    });

    return setData(updateDate);
  };

  const handleUpdateTextEnter = (e) => {
    if (e.code === "Enter") {
      const updateDate = data.map(({ ID, ...item }) => {
        if (Number(updateId) === ID) {
          setNewInputName("");
          const newName = { ...item, ID, name: newInputName };
          return newName;
        }
        return { ID, ...item };
      });
      setUpdateId("");
      return setData(updateDate);
    }
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
              {isShown && <AiFillCaretDown className={s.iconGoods} />}
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
                id="name"
                autoComplete="off"
                onMouseEnter={() => setSelectShow(true)}
                onMouseLeave={() => setSelectShow(false)}
              />
              {isShown && <AiFillCaretDown className={s.iconName} />}
              <div
                className={s.modal}
                style={{
                  opacity: selectShow && 1,
                  pointerEvents: selectShow && "auto",
                  transform: selectShow && "translateX(0%)",
                  transition:
                    selectShow &&
                    "transform 700ms ease-in-out,opacity 1000ms ease-in-out",
                }}
                id="modal"
                onMouseEnter={() => setSelectShow(true)}
                onMouseLeave={() => setSelectShow(false)}
              >
                <ul className={s.list}>
                  <li
                    className={s.item}
                    onClick={handleNameFilter}
                    id="Все"
                    style={{ marginLeft: "20px" }}
                  >
                    <p className={s.text} id="Все">
                      Все
                    </p>
                  </li>
                  {filterData.map(({ name, ID, checked }) => {
                    return (
                      <li
                        key={ID}
                        className={s.item}
                        onClick={checked ? null : handleNameFilter}
                        id={name}
                        style={{
                          marginLeft: !checked && "20px",
                        }}
                      >
                        {checked && <div className={s.dot}></div>}
                        <p className={s.text} id={name}>
                          {name.length > 15
                            ? name.split("").splice(0, 16).join("") + "..."
                            : name}
                        </p>
                        <input
                          type="checkbox"
                          name="checkbox"
                          className={s.checkFilter}
                          style={{ cursor: checked && "auto" }}
                          id={name}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {isShowPlus && (
            <tr className={s.newTr}>
              <td className={s.newTdStatus}>
                <div className={s.span}></div>
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
                {isShown && (
                  <CgClose onClick={clickDelete} className={s.btnDelete} />
                )}
              </td>
            </tr>
          )}
          {data.map(({ Статус, Товар, ID, name }) => {
            return (
              <tr
                className={s.newTr}
                key={ID}
                style={{
                  backgroundColor: name ? null : "rgba(81, 81, 81, 0.7)",
                }}
              >
                <td className={s.newTdStatus}>
                  <div
                    className={s.span}
                    style={{
                      backgroundColor: name ? null : "#515151",
                      position: name ? null : "absolute",
                      left: name ? null : 0,
                      top: name ? null : 0,
                      zIndex: name ? null : 3,
                      height: name ? null : "21.5px",
                      width: name ? null : "8px",
                      borderTopLeftRadius: name ? null : "5px",
                      borderBottomLeftRadius: name ? null : "5px",
                    }}
                  ></div>
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
                <td className={s.newTd}>
                  <p className={s.tdGrove}></p>
                  {Товар}
                </td>
                <td className={s.newTdId} onKeyDown={handleUpdateTextEnter}>
                  <p className={s.tdText}>{ID}</p>
                </td>
                <td
                  className={s.newTdName}
                  id={ID}
                  onKeyDown={handleUpdateTextEnter}
                >
                  <img src={image} className={s.img} alt="" />
                  {name ? (
                    <p
                      className={s.textName}
                      id={ID}
                      onClick={handleUpdateText}
                    >
                      {name.length > 11
                        ? name.split("").splice(0, 12).join("") + "..."
                        : name}
                    </p>
                  ) : (
                    <input
                      type="text"
                      name="newInputName"
                      value={newInputName}
                      id="newInputName"
                      onChange={changeIdInput}
                      className={s.inputName}
                      autoFocus="on"
                      style={{
                        backgroundColor: "transparent",
                      }}
                    />
                  )}
                  {isShown && (
                    <CgClose
                      onClick={handleDelete}
                      className={s.btnDelete}
                      id={ID}
                    />
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
        {statusDelete ? (
          <div className={s.delete}>
            <CgClose className={s.deleteIcon} onClick={handleAllDelete} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Table;
