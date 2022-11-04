import React, { useContext } from "react";
import { operationDashboardContexts } from "../../Contexts/operationDashboard";
import { formatDate, formatCurrentMonth } from "../../helpers/dateFiler";
import "./dashboard.sass";

function Dashboard() {
  const {
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
  } = useContext(operationDashboardContexts);

  return (
    <main className="dashboard">
      <h1 className="titulo">Sitema Financeiro</h1>

      {/* Informações no header */}
      <div className="header">
        <div className="month">
          <i className="fa-solid fa-arrow-left" onClick={handlePrevMonth}></i>
          <p>{formatCurrentMonth(currentMonth)}</p>
          <i className="fa-solid fa-arrow-right" onClick={handleNextMonth}></i>
        </div>

        <div className="finance">
          <p>Receita</p>
          <h2>R$ {income.toFixed(2)}</h2>
        </div>

        <div className="finance">
          <p>Despesa</p>
          <h2>R$ {expense.toFixed(2)}</h2>
        </div>

        <div className="finance">
          <p>Balanço</p>
          <h2
            style={
              income - expense < 0 ? { color: "red" } : { color: "#55bb0c" }
            }
          >
            R$ {(income - expense).toFixed(2)}
          </h2>
        </div>
      </div>

      {/* opções para adicionar */}

      <div className="informations">
        <div className="information-content">
          <h1>Data</h1>
          <input type="date" onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="information-content">
          <h1>Categoria</h1>
          <select
            value={categorySelect}
            onChange={(e) => setCategorySelect(e.target.value)}
          >
            {categoryKeys.map((key, index) => (
              <option key={index} value={key}>
                {categories[key].title}
              </option>
            ))}
          </select>
        </div>

        <div className="information-content">
          <h1>Titulo</h1>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="information-content">
          <h1>Valor</h1>
          <input type="number" onChange={(e) => setValue(e.target.value)} />
        </div>

        <button type="submit" onClick={handleSubmit}>
          Adicionar
        </button>
      </div>

      {/* tabela dashboard */}

      <div className="table-container">
        {newList.map((item, index) => {
          return (
            <table key={index}>
              <thead>
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Titulo</th>
                  <th scope="col">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatDate(item.date)}</td>
                  <td
                    style={{
                      color: categories[item.category].color,
                      fontWeight: "bold",
                    }}
                  >
                    {categories[item.category].title}
                  </td>
                  <td>{item.title}</td>
                  <td
                    style={
                      categories[item.category].expense
                        ? { color: "red", fontWeight: "600" }
                        : { color: "green", fontWeight: "600" }
                    }
                  >
                    R$ {item.value.toFixed(2)}
                  </td>
                 
                </tr>
              </tbody>
            </table>
          );
        })}
      </div>
    </main>
  );
}

export default Dashboard;
