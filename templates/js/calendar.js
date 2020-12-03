const calendarHeader = document.getElementById('calendarHeader');
const monthYearHeader = document.getElementById('monthYearHeader');
const calendarHeaderLead = document.getElementById('calendarHeaderLead');
const calendarTable = document.getElementById('calendarTable');
const calendarTableHead = document.getElementById('calendarTableHead');
const calendarTableBody = document.getElementById('calendarTableBody');

calendarTableBody.innerHTML = "";

ipcRenderer.on('calendar-date-data', (event, calendarDateData) => {
    // remove data not for the current month
    let thisMonth = calendarDateData.filter(data => data.type === "current");
    console.log(thisMonth);

    // get first day of month
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay(); // 0 - 6 | sun - sat
    console.log(firstDay);

    let tableRows = [];
    for (let i = 0; i < 4; i++) {
        let row = document.createElement("tr");
        for (let y = 0; y < 7; y++) {
            row.append(document.createElement("td"));
        }
        tableRows.push(row);
    }
    console.log(tableRows);
});

ipcRenderer.send('calendar-date-request', new Date(date.getFullYear(), date.getMonth()));