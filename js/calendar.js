//meses do ano em português.
const BrMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const BrMonthsAbbr = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function ConstructCalendar() {

  let header = document.createElement('header');
  header.id = 'calendar-header';
  header.innerHTML = `
    <h2><span id="month"></span>, <span id="year"></span></h2>
    <span id="btn-pre" class="material-icons-round">keyboard_arrow_left</span>
    <span id="btn-next" class="material-icons-round">keyboard_arrow_right</span>
    `;

  let table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <td>D</td><td>S</td><td>T</td><td>Q</td><td>Q</td><td>S</td><td>S</td>
      </tr>
    </thead>
      <tbody id="days">
        <tr>
          <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
        <tr>
          <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
        <tr>
          <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
        <tr>
          <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
        <tr>
          <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
        <tr class="last-row-of-calendar">
          <td></td><td></td><td></td><td></td><td></td><td></td><td></td>
        </tr>
      </tbody>
    `;

  let footer = document.createElement('footer');
  footer.id = 'calendar-footer';
  footer.innerHTML = `
    <button id="cancel-calendar">cancelar</button>
    <button id="submit-calendar">ok</button>
    `;

  document.querySelector('#calendar').appendChild(header);
  document.querySelector('#calendar').appendChild(table);
  document.querySelector('#calendar').appendChild(footer);

}

function ConstructYearsInTable(month, year) {

  document.querySelector('#calendar-header').innerHTML = '<h2>' + year + '</h2>';

  document.querySelector('#calendar table').innerHTML = `
      <tbody id="monthsInTable">
            
        <tr>
          <td>2021</td>
          <td>2022</td>
          <td>2023</td>
          <td>2024</td>
        </tr>

        <tr>
          <td>2025</td>
          <td>2026</td>
          <td>2027</td>
          <td>2028</td>
        </tr>

        <tr>
          <td>2029</td>
          <td>2030</td>
          <td>2031</td>
          <td>2032</td>
        </tr>
            
      </tbody>
      `;

  let monthsInTable = document.querySelectorAll('#monthsInTable td');

  monthsInTable.forEach(m => {
    m.addEventListener('click', e => {

      let newYear = parseInt(e.target.innerHTML);

      ConstructMonthsInTable(month, newYear);

    });
  });


}

function ConstructMonthsInTable(month, year) {

  document.querySelector('#calendar-header').innerHTML = '<h2>' + year + '</h2>';

  document.querySelector('#calendar table').innerHTML = `
      <tbody id="monthsInTable">
            
        <tr>
          <td>jan</td>
          <td>fev</td>
          <td>mar</td>
          <td>abr</td>
        </tr>

        <tr>
          <td>mai</td>
          <td>jun</td>
          <td>jul</td>
          <td>ago</td>
        </tr>

        <tr>
          <td>set</td>
          <td>out</td>
          <td>nov</td>
          <td>dez</td>
        </tr>
            
      </tbody>
      `;

  let monthsInTable = document.querySelectorAll('#monthsInTable td');

  monthsInTable.forEach(m => {
    m.addEventListener('click', e => {
      for (let i = 0; i < BrMonthsAbbr.length; i++) {
        if (e.target.innerHTML == BrMonthsAbbr[i]) {
          month = i;
          year = document.querySelector('#calendar-header h2').innerHTML;

          document.querySelector('#calendar').innerHTML = '';
          ConstructCalendar();
          initCalendar(month, year);

        }
      }
    });
  });

  document.querySelector('#calendar-header h2').addEventListener('click', e => {

    ConstructYearsInTable(month, year);

  });

}

let ifCancelFunction;

function ifCancel(callback) {
  ifCancelFunction = callback;
}

let ifOkFunction;

function ifOk(callback) {
  ifOkFunction = callback;
}

function initCalendar(callMonth = null, callYear = null) {

  //tbory que contém as informações dos dias.
  const tableDays = document.querySelector('#days');

  //função que inicia o sistema do calendário, recebe o mês e o ano que deve
  //aparecer no calendário.
  function startCalendar(month, year) {
    //injeta no calendar-header o mês e o ano que estão aparecendo.
    document.querySelector('#month').innerHTML = BrMonths[month];
    document.querySelector('#year').innerHTML = year;

    //recupera o primeiro dia da semana e o último dia do mês.
    let firstDayOfWeek = new Date(year, month, 1).getDay() - 1;
    let LastDayOfThisMonth = new Date(year, month + 1, 0).getDate();

    let columnsToCounter = 42;

    if (firstDayOfWeek < 4) {
      document.querySelector('#calendar .last-row-of-calendar').style.display = 'none';
    } else {
      document.querySelector('#calendar .last-row-of-calendar').style.display = 'table-row';
    }

    //injeta cada um dos dias.
    for (let i = -firstDayOfWeek, index = 0; i < (columnsToCounter - firstDayOfWeek); i++, index++) {
      let dt = new Date(year, month, i);
      let dayTable = tableDays.getElementsByTagName('td')[index];
      dayTable.classList.remove('last-month');
      dayTable.classList.remove('next-month');
      dayTable.innerHTML = dt.getDate();

      if (i < 1) {
        dayTable.classList.add('last-month');
      }
      if (i > LastDayOfThisMonth) {
        dayTable.classList.add('next-month');
      }

    }
  }

  //recupera o mês e ano atual.
  let now = new Date();
  let month = now.getMonth();
  let year = now.getFullYear();

  if (callMonth != null) {
    month = callMonth;
  }

  if (callYear != null) {
    year = callYear;
  }

  //chamada da função que inicia o sistema do calendário.
  startCalendar(month, year);

  //botões de proximo e anterior
  const nextButton = document.querySelector('#btn-next');
  const previousButton = document.querySelector('#btn-pre');

  //funcionamento do botão de proximo
  nextButton.addEventListener('click', e => {
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
    if (markedElement) {
      markedElement.classList.remove('marked-day');
      markedElement = null;
      positionOfMarkedElement = null;
    }
    if (markedElement2) {
      markedElement2.classList.remove('marked-day');
      markedElement2 = null;
      positionOfMarkedElement2 = null;
    }
    selectedStyleToElements('remove', 0, 0);
    startCalendar(month, year);
  });
  //funcionamento do botão de anterior
  previousButton.addEventListener('click', e => {
    month--;
    if (month < 0) {
      month = 11;
      year--;
    }
    if (markedElement) {
      markedElement.classList.remove('marked-day');
      markedElement = null;
      positionOfMarkedElement = null;
    }
    if (markedElement2) {
      markedElement2.classList.remove('marked-day');
      markedElement2 = null;
      positionOfMarkedElement2 = null;
    }
    selectedStyleToElements('remove', 0, 0);
    startCalendar(month, year);
  });

  const monthAndYear = document.querySelector('#calendar-header h2');

  monthAndYear.addEventListener('click', e => {

    ConstructMonthsInTable(month, year);

  });

  let selectedDays = [];

  function selectedStyleToElements(action, positionOfMarkedElement, positionOfMarkedElement2) {

    if (action == 'add') {
      selectedDays = [];
      document.querySelectorAll('#days td').forEach(d => {
        d.classList.remove('selected-day');
      });
      if (positionOfMarkedElement < positionOfMarkedElement2) {

        for (let i = positionOfMarkedElement; i < positionOfMarkedElement2 + 1; i++) {
          selectedDays.push(document.querySelectorAll('#days td')[i]);
        }

        selectedDays.forEach(d => {
          d.classList.add('selected-day');
        });

      } else {

        for (let i = positionOfMarkedElement; i > positionOfMarkedElement2 - 1; i--) {
          selectedDays.push(document.querySelectorAll('#days td')[i]);
        }

        selectedDays.forEach(d => {
          d.classList.add('selected-day');
        });

      }
    } else {
      document.querySelectorAll('#days td').forEach(d => {
        d.classList.remove('selected-day');
      });
    }

  }

  let markedElement = null;
  let positionOfMarkedElement = null;

  let markedElement2 = null;
  let positionOfMarkedElement2 = null;

  function addMarkedFunctionOnElements() {

    let inputDateByCalendar = document.querySelector('#dateByCalendar1');
    let inputDateByCalendar2 = document.querySelector('#dateByCalendar2');

    for (let i = 0; i < document.querySelectorAll('#days td').length; i++) {
      document.querySelectorAll('#days td')[i].addEventListener('click', e => {

        let isLastMonth = e.target.matches('.last-month');
        let isNextMonth = e.target.matches('.next-month');

        if (!isLastMonth && !isNextMonth) {

          if (markedElement == null && markedElement2 != e.target) {

            markedElement = e.target;
            positionOfMarkedElement = i;

            markedElement.classList.add('marked-day');

          } else if (markedElement == e.target) {

            markedElement.classList.remove('marked-day');
            markedElement = null;
            positionOfMarkedElement = null;

          } else if (markedElement2 == null) {

            markedElement2 = e.target;
            positionOfMarkedElement2 = i;

            markedElement2.classList.add('marked-day');

          } else if (markedElement2 == e.target) {

            markedElement2.classList.remove('marked-day');
            markedElement2 = null;
            positionOfMarkedElement2 = null;

          } else {
            markedElement2.classList.remove('marked-day');
            markedElement2 = e.target;
            positionOfMarkedElement2 = i;

            markedElement2.classList.add('marked-day');

          }

          if (markedElement != null && positionOfMarkedElement != null && inputDateByCalendar) {

            if (markedElement.innerHTML < 10) {
              inputDateByCalendar.value = `0${markedElement.innerHTML}/0${month + 1}/${year}`;
            } else {
              inputDateByCalendar.value = `${markedElement.innerHTML}/0${month + 1}/${year}`;
            }

          } else if (inputDateByCalendar) {
            inputDateByCalendar.value = '';
          }

          if (markedElement2 != null && positionOfMarkedElement2 != null && inputDateByCalendar2) {

            if (markedElement2.innerHTML < 10) {
              inputDateByCalendar2.value = `0${markedElement2.innerHTML}/0${month + 1}/${year}`;
            } else {
              inputDateByCalendar2.value = `${markedElement2.innerHTML}/0${month + 1}/${year}`;
            }

          } else if (inputDateByCalendar2) {
            inputDateByCalendar2.value = '';
          }

          if
            (
            markedElement != null && positionOfMarkedElement != null && inputDateByCalendar &&
            markedElement2 != null && positionOfMarkedElement2 != null && inputDateByCalendar2
          ) {
            selectedStyleToElements('add', positionOfMarkedElement, positionOfMarkedElement2);
          } else {
            selectedStyleToElements('remove', positionOfMarkedElement, positionOfMarkedElement2);
          }

        }

      });
    }

  }

  addMarkedFunctionOnElements();


  document.querySelector('#calendar-footer #cancel-calendar').addEventListener('click', e => {
    ifCancelFunction();
  });

  document.querySelector('#calendar-footer #submit-calendar').addEventListener('click', e => {
    ifOkFunction();
  });

}





window.ConstructCalendar = ConstructCalendar;
window.initCalendar = initCalendar;
window.ifCancel = ifCancel;
window.ifOk = ifOk;


addEventListener