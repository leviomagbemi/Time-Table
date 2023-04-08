//subject constructor
function Subject(subject, day) {
  this.subject = subject;
  this.day = day;
}

// id and target to get clicked time or suject
let id;
let target;

//time constructor
function Time(time) {
  this.time = time;
}

//storage constructor
function Storage() {}

//add subject to storage
Storage.prototype.addSubjectToStorage = function (subject) {
  let subjects;

  if (localStorage.getItem('subject') === null) {
    subjects = [];
  } else {
    subjects = JSON.parse(localStorage.getItem('subject'));
  }

  subjects.push(subject);

  localStorage.setItem('subject', JSON.stringify(subjects));
};

//get subject from storage
Storage.prototype.getSubjectFromStorage = function () {
  let subjects;

  if (localStorage.getItem('subject') === null) {
    subjects = [];
  } else {
    subjects = JSON.parse(localStorage.getItem('subject'));
  }

  subjects.forEach((subject) => {
    AllSelector('.days').forEach((day) => {
      if (subject.day == day.id) {
        // create element
        const td = document.createElement('td');

        //set id
        td.id = subject.id;

        //className
        td.className = 'subject';

        td.innerHTML = `<span class="btn btn-success rounded-pill" id="${subject.id}">${subject.subject}</span>`;

        day.appendChild(td);
      }
    });
  });
};

//update subject on storage
Storage.prototype.updateSubjectOnStorage = function () {
  let subjects = JSON.parse(localStorage.getItem('subject'));

  subjects.forEach((subject) => {
    if (
      target.parentElement.parentElement.id == subject.day &&
      id == subject.id
    ) {
      subject.subject = selector('#subject').value;
    }
  });

  localStorage.setItem('subject', JSON.stringify(subjects));
};

//add time to storage
Storage.prototype.addTimeToStorage = function (time) {
  let times;

  if (localStorage.getItem('time') === null) {
    times = [];
  } else {
    times = JSON.parse(localStorage.getItem('time'));
  }

  times.push(time);

  localStorage.setItem('time', JSON.stringify(times));
};

// get time from storage
Storage.prototype.getTimeFromStorage = function () {
  let times;

  if (localStorage.getItem('time') === null) {
    times = [];
  } else {
    times = JSON.parse(localStorage.getItem('time'));
  }

  times.forEach((times) => {
    const timeTable = selector('#table-time');
    // create element
    const th = document.createElement('th');

    //set id
    th.id = times.id;

    //className
    th.className = 'time';

    th.innerHTML = `<span class="btn btn-info time-btn" id= ${times.id}>${times.time}<i class="fas fa-clock fa-lg"></i></span>`;

    timeTable.appendChild(th);
  });
};

//update time on storage
Storage.prototype.updateTimeOnStorage = function () {
  let times = JSON.parse(localStorage.getItem('time'));

  times.forEach((time) => {
    if (id == time.id) {
      time.time = selector('#time').value;
    }
  });

  localStorage.setItem('time', JSON.stringify(times));
};

//UI constructor
function UI() {}

//add to table
UI.prototype.addSubjectToTable = function (table) {
  AllSelector('.days').forEach((day) => {
    if (table.day === day.id && day.childElementCount === 7) {
      this.showAlert(
        'You can only add max of six subject',
        'alert alert-warning mt-5 text-center'
      );
    }
    //check if dayInput equals day
    else if (table.day === day.id && day.childElementCount < 7) {
      // add subject to that day

      // create element
      const td = document.createElement('td');

      //set id
      table.id = day.childElementCount;

      //className
      td.className = 'subject';

      td.innerHTML = `<span class="btn btn-success rounded-pill" id="${day.childElementCount}">${table.subject}</span>`;

      day.appendChild(td);

      //alert
      this.showAlert('Subject added', 'alert alert-success mt-5 text-center');

      //instantiate store
      const store = new Storage();

      //add to storage
      store.addSubjectToStorage(table);
    }
  });
};

//edit subject
UI.prototype.editSubject = function (e) {
  if (e.target.classList.contains('btn-success')) {
    //instantiate state
    const state = new State();

    state.editSubjectState();

    selector('#subject').value = e.target.textContent;

    // set id to clicked subject id
    id = e.target.id;

    // set target to clicked subject
    target = e.target;
  }
};

//change subject
UI.prototype.changeSubject = function () {
  //instantiate state
  const state = new State();

  //instantiate storage
  const store = new Storage();

  if (target.id === id) {
    target.textContent = selector('#subject').value;

    //update subject on localstorage
    store.updateSubjectOnStorage();
  }

  //set to mainstate
  state.init();

  this.clearFields();
};

//add time to table
UI.prototype.addTimeToTable = function (time) {
  //add time
  const timeTable = selector('#table-time');
  // create element
  const th = document.createElement('th');

  //set id
  time.id = timeTable.childElementCount;

  //className
  th.className = 'time';

  //set th innerhtml
  th.innerHTML = `<span class="btn btn-info time-btn" id= ${timeTable.childElementCount}>${time.time}<i class="fas fa-clock fa-lg"></i></span>`;

  timeTable.appendChild(th);
};

//edit time
UI.prototype.editTime = function (e) {
  if (e.target.classList.contains('btn-info')) {
    //instantiate state
    const state = new State();

    //edit time function
    state.editTimeState();

    selector('#time').value = e.target.textContent;

    // set id to clicked time id
    id = e.target.id;

    // set target to clicked item
    target = e.target;
  }
};

//change subject
UI.prototype.changeTime = function () {
  //instantiate state
  const state = new State();

  // instantiate storage
  const store = new Storage();

  if (target.id === id) {
    target.textContent = selector('#time').value;

    // update subject on localstorage
    store.updateTimeOnStorage();
  }

  state.init();

  this.clearFields();
};

//subject back button function
UI.prototype.subjectBack = function () {
  const state = new State();

  state.init();
  this.clearFields();
};

//time back button function
UI.prototype.timeBack = function () {
  const state = new State();

  state.init();
  this.clearFields();
};

//clear fields
UI.prototype.clearFields = function () {
  selector('#subject').value = '';
  selector('#time').value = '';
  selector('#day').value = '';
};

//alert function
UI.prototype.showAlert = function (message, className) {
  //create element
  const div = document.createElement('div');

  //set className
  div.className = className;

  //add text
  div.appendChild(document.createTextNode(message));

  // insert it into the dom
  selector('.form-container').insertAdjacentElement('afterend', div);

  setInterval(() => {
    div.remove();
  }, 2000);
};

//state constructor
function State() {}

//mainstate
State.prototype.init = function () {
  selector('#change-time').classList.add('d-none');
  selector('#timeback-button').classList.add('d-none');
  selector('#change-subject').classList.add('d-none');
  selector('#subjectback-button').classList.add('d-none');
  selector('#add-subject').classList.remove('d-none');
  selector('#add-time').classList.remove('d-none');
  selector('#day-container').classList.remove('d-none');
};

//edit subject state
State.prototype.editSubjectState = function () {
  selector('#change-subject').classList.remove('d-none');
  selector('#subjectback-button').classList.remove('d-none');
  selector('#add-subject').classList.add('d-none');
  selector('#day-container').classList.add('d-none');
};

//edit subject state
State.prototype.editTimeState = function () {
  selector('#change-time').classList.remove('d-none');
  selector('#timeback-button').classList.remove('d-none');
  selector('#add-time').classList.add('d-none');
};

//multi selector
function AllSelector(selector) {
  return document.querySelectorAll(selector);
}

//single selector
function selector(selector) {
  return document.querySelector(selector);
}

//event listeners
function loadEventListeners() {
  //add subject button event
  selector('#add-subject').addEventListener('click', submitSubject);

  //add time button event
  selector('#add-time').addEventListener('click', submitTime);

  //edit subject event
  AllSelector('.days').forEach((day) => {
    day.addEventListener('click', (e) => {
      // instantiate UI
      const ui = new UI();

      ui.editSubject(e);
    });
  });

  //change subject event
  selector('#change-subject').addEventListener('click', () => {
    // instantiate UI
    const ui = new UI();

    ui.changeSubject();
  });

  //edit time event
  selector('#table-time').addEventListener('click', (e) => {
    // instantiate UI
    const ui = new UI();

    ui.editTime(e);
  });

  //change time button event
  selector('#change-time').addEventListener('click', () => {
    // instantiate UI
    const ui = new UI();

    ui.changeTime();
  });

  //subject back button event listener
  selector('#subjectback-button').addEventListener('click', () => {
    // instantiate UI
    const ui = new UI();

    ui.subjectBack();
  });

  //time back button event listener
  selector('#timeback-button').addEventListener('click', () => {
    // instantiate UI
    const ui = new UI();

    ui.timeBack();
  });
}

//submit subject to table
function submitSubject() {
  const subject = document.querySelector('#subject').value;
  const day = document.querySelector('#day').value;

  //instantiate table
  const table = new Subject(subject, day);

  //instantiate ui
  const ui = new UI();

  if (subject !== '' && day !== '') {
    //add to table
    ui.addSubjectToTable(table);

    //clearfields
    ui.clearFields();
  } else {
    //show alert
    ui.showAlert(
      'Please fill all fields',
      'alert alert-warning mt-5 text-center'
    );
  }
}

//submit time
function submitTime() {
  const time = selector('#time').value;

  //instantiate time
  const table = new Time(time);

  //instantiate ui
  const ui = new UI();

  //instantiate storage
  const store = new Storage(table);

  if (time !== '' && selector('#table-time').childElementCount < 7) {
    //add time
    ui.addTimeToTable(table);

    //add time to storage
    store.addTimeToStorage(table);
  } else if (time === '') {
    // show alert
    ui.showAlert('Please fill field', 'alert alert-warning mt-5 text-center');
  } else {
    ui.showAlert(
      'You can only add max of six subject',
      'alert alert-warning mt-5 text-center'
    );
  }

  //clear fields
  ui.clearFields();
}

//initialize main state
document.addEventListener('DOMContentLoaded', () => {
  //instantiate state
  const state = new State();

  // main state
  state.init();

  //instantiate storage
  store = new Storage();

  //get subject from storage
  store.getSubjectFromStorage();

  //get time from storage
  store.getTimeFromStorage();
});

//load all events
loadEventListeners();
