// Main JavaScript for MarkDone App
// Author: Sara Gray
// Date created: 16th August 2019


// Initial data setup - will be saved (not sure how at the mo)
var title, classes, blockStart, blockEnd, markingTypes, markingSchedule;
getData();

// Set header Title
document.getElementById("title").textContent = title;

let day = 1000 * 60 * 60 * 24;
let week = day * 7;


// The blockStart is a Monday and the blockEnd is a Friday
blockTidy();

// Calculate the block length in weeks
let blockWeeks = Math.ceil((blockEnd - blockStart) / week);

// Calculate the maximum number of hours to meet the average marking for all your classes
let requiredMins = calcMaxPlanned();
let allocatedMins = calcAllocated();

// TO DO *****************************
if (allocatedMins<requiredMins) {
// DO SOMETHING!
alert('You need to up your weekly allocation.');

} 

// Calculate the current week
let toDay = Date.now();

// REMOVE
toDay = new Date(2019, 8, 8);

let currentWeek = Math.floor((toDay - blockStart) / week) + 1;
if (currentWeek < 1) {
  alert("Getting ready for a new start!");
  currentWeek = 1;
}

// Set the week number in display
document.getElementById("wkNum").textContent = "Week " + currentWeek;

// Set the date for each day in the table
// Sunday - Saturday : 0 - 6
// We will assume a week starts on Mon
currentWeek = 2;
let wkBg = new Date(blockStart);
wkBg.setDate(wkBg.getDate() + (7 * (currentWeek - 1)));

var dayStr;
for (d = 0; d < 7; d++) {

  // Set the table day headers
  dayStr = wkBg.toDateString().slice(0, 3) + " " + formatDate(wkBg);
  document.getElementById("dayTitles").childNodes[2 * d + 1].textContent = dayStr;
  wkBg.setDate(wkBg.getDate() + 1);

  // Update the week 'bars'
  // Find max planned minutes or max done minutes to set the max height of each bax
  // convert planned and done minutes into % of max height
  // convert into px from height of table row (set in main.sccs)

}


// Calculate the minutes done this week

// Calculate the planned minutes

// Update confidence indicator




let thisWeek = [{
  class: '',
  plan: 0,
  done: 0
}, {
  class: '',
  plan: 0,
  done: 0
}, {
  class: '',
  plan: 0,
  done: 0
}, {
  class: '',
  plan: 0,
  done: 0
}, {
  class: '',
  plan: 0,
  done: 0
}, {
  class: '',
  plan: 0,
  done: 0
}, {
  class: '',
  plan: 0,
  done: 0
}]





// Trap 'Settings' icon click on navigation bar
const settingsIcon = document.getElementById("changeSettings").addEventListener('click', openSettings);

function openSettings(e) {
  const pageOneOpen = document.getElementById("week");
  const pageTwoOpen = document.getElementById("settings");

  if (pageOneOpen.classList.length > 0) {
    pageOneOpen.classList.remove("inView");
    pageTwoOpen.classList.add("inView");
  } else {
    pageTwoOpen.classList.remove("inView");
    pageOneOpen.classList.add("inView");
  }
}


// Change title in navigation bar from from settings
document.getElementById("setTitle").addEventListener('change', switchTitle);

function switchTitle(e) {
  document.getElementById("title").textContent = e.target.value;
}





// Trap 'addClass' click
document.querySelector('.addClass').addEventListener('click', addClass);

function addClass(e) {
  const displayTable = document.querySelector('.classTable');
  if (displayTable.classList.length === 1) {
    displayTable.classList.add("show");
  }
  // Create a new table row

}



// Toggle Light/Dark Mode
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
toggleSwitch.addEventListener('change', switchTheme, false);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

function getData() {
  title = "AHS";

  classes = [{
      name: '7Kx',
      numPupils: 28,
      colour: '#ffffff'
    },
    {
      name: '8b1',
      numPupils: 12,
      colour: '#ff0000'
    },
    {
      name: '11b1',
      numPupils: 28,
      colour: '#ffff00'
    }
  ];

  blockStart = new Date(2019, 8, 2);
  blockEnd = new Date(2019, 9, 25);

  markingTypes = [{
    name: 'Book',
    time: 5,
    frequency: 2
  }, {
    name: 'Assessment',
    time: 20,
    frequency: 1
  }];

  markingSchedule = [30, 30, 30, 30, 0, 60, 30];
}

function blockTidy() {
  let startDay = blockStart.getDay() - 1;
  let endDay = blockEnd.getDay();

  // Set blockStart to the Monday
  let dayDate = blockStart.getDate();
  dayDate -= startDay;
  blockStart.setDate(dayDate);

  dayDate = blockEnd.getDate();
  switch (endDay) {
    case 0:
      dayDate -= 2;
      break;
    case 5:
      break;
    case 6:
      dayDate -= 1;
      break;
    default:
      dayDate += 5 - endDay;
  }

  blockEnd.setDate(dayDate);
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [day, month].join('/');
}

function calcMaxPlanned() {
  let maxMins = 0;
  for (i=0; i<classes.length; i++) {
    maxMins += classes[i].numPupils*(markingTypes[0].time+markingTypes[1].time);
  }
  return maxMins;
}

function calcAllocated() {
  let allocated =0;
  for (i=0; i<7; i++) {
    allocated += markingSchedule[i];
  }
  return allocated*blockWeeks;
}