export function getCurrentMonth() {
  let now = new Date();

  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}

export function FilterListByMonth(list, date) {
  let newList = [];
  let [year, month] = date.split("-");

  for (let i in list) {
    if (
      list[i].date.getFullYear() === parseInt(year) &&
      (list[i].date.getMonth() + 1) === parseInt(month)
    ) {
      newList.push(list[i]);
    }
  }

  return newList;
}

export function formatDate(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${toFixeD(day)}/${toFixeD(month)}/${year}`;
}

const toFixeD = number => number < 10 ? `0${number}` : `${number}`

export function formatCurrentMonth(currentMonth){
  let [year, month] = currentMonth.split('-')
  let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  return `${months[parseInt(month) - 1]} de ${year}`
}

export const newDateAdjusted = (dateField) => {
  let [year, month, day] = dateField.split('-')
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}