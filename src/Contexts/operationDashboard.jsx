import { createContext, useState, useEffect } from "react";
import { items } from "../services/item";
import { categories } from "../services/categories";
import {
  getCurrentMonth,
  FilterListByMonth,
  newDateAdjusted,
} from "../helpers/dateFiler";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const operationDashboardContexts = createContext({});

export default function OperationProvider({ children }) {
  const [list, setList] = useState(items);
  const [newList, setNewList] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const [date, setDate] = useState("");
  const [categorySelect, setCategorySelect] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);

  let categoryKeys = Object.keys(categories);

  // salvar no storage
  
  function userStorage(data) {

    localStorage.setItem("financ", JSON.stringify(data));

  }

  // buscar dados no storage

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem("financ");

      

      if (storageUser) {

       

        let data = []

        data.push(JSON.parse(storageUser))

        let newItem = {
            date: newDateAdjusted(data[0].date),
            category: data[0].category,
            title: data[0].title,
            value: parseInt(data[0].value),
          };

        handleAddItem(newItem);
      
      }
    }

    loadStorage();
  }, []);



  useEffect(() => {
    setNewList(FilterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  useEffect(() => {
    {
      let Income = 0;
      let Expense = 0;

      for (let i in newList) {
        if (categories[newList[i].category].expense) {
          Expense += newList[i].value;
        } else {
          Income += newList[i].value;
        }
      }

      setIncome(Income);
      setExpense(Expense);
    }
  }, [newList]);

  function handlePrevMonth() {
    let [year, month] = currentMonth.split("-");
    let day = 1;
    let currentDate = new Date(parseInt(year), parseInt(month) - 1, day);
    currentDate.setMonth(currentDate.getMonth() - 1);
    let results = `${currentDate.getFullYear()}-${currentDate.getMonth() - 1}`;

    setCurrentMonth(results);
  }

  function handleNextMonth() {
    let [year, month] = currentMonth.split("-");
    let day = 1;
    let currentDate = new Date(parseInt(year), parseInt(month) + 1, day); // carregar como um date normal
    currentDate.setMonth(currentDate.getMonth() - 1); // mudar o mês
    let results = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`;

    setCurrentMonth(results);
  }

  const handleAddItem = (item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
  };

  function handleSubmit() {
    let errors = [];

    if (isNaN(new Date(date).getTime())) {
      errors.push("Data inválida!");
    }
    if (!categoryKeys.includes(categorySelect)) {
      errors.push("Categoria inválida!");
    }
    if (title === "") {
      errors.push("Título vazio!");
    }
    if (value <= 0) {
      errors.push("Valor inválido!");
    }

    if (errors.length > 0) {
      toast.error(errors.join("\n"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      
    } else {
      let newItem = {
        date: newDateAdjusted(date),
        category: categorySelect,
        title: title,
        value: parseInt(value),
      };

      handleAddItem(newItem);
      userStorage(newItem);
    
    }
  }


  return (
    <operationDashboardContexts.Provider
      value={{
        handlePrevMonth,
        handleNextMonth,
        handleSubmit,
        setDate,
        setTitle,
        setValue,
        setCategorySelect,
        date,
        title,
        value,
        currentMonth,
        income,
        expense,
        categorySelect,
        newList,
        categories,
        categoryKeys,
      }}
    >
      {children}
    </operationDashboardContexts.Provider>
  );
}
