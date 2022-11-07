const subscribeWidget = document.querySelector('.subscribe');
const subscribeForm = subscribeWidget.querySelector('.subscribe-form');
const btnDelete = subscribeWidget.getElementsByClassName('ticket-delete');
const btnStatus = subscribeWidget.getElementsByClassName('ticket-status');
const btnAddOk = document.getElementsByClassName('btn-add-ok');
const textDescription = document.getElementsByClassName('text-description');
const textDescriptionFull = document.getElementsByClassName('text-description-full');

const ticketUserFull = {
  id: null,
  name: '',
  description: '',
  status: false,
  created: null,
};

export function addNewTicket() {
  subscribeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      addElTicket(JSON.parse(xhr.responseText));

      const popupAddTicket = document.createElement('DIV');
      popupAddTicket.classList.add('popup-ticket-add');
      popupAddTicket.innerHTML = `<button class="btn-add-ok">ОК</button>
        <button class="btn-add-cancel">Отмена</button>
        <p class="confirm-title-add">Добавить тикет</p>
        <p class="title-description">Краткое описание</p>
        <textarea class="text-description"></textarea>
        <p class="title-description-full">Полное описание</p>
        <textarea class="text-description-full"></textarea>`;
      subscribeWidget.before(popupAddTicket);
      btnAddOk[0].addEventListener('click', () => {
        document.getElementsByClassName('popup-ticket-add')[0].remove();
      });
      textDescription[0].addEventListener('keydown', () => {
        ticketUserFull.name = textDescription[0].value;
      });
      textDescriptionFull[0].addEventListener('keydown', () => {
        ticketUserFull.description = textDescriptionFull[0].value;
      });

      for (const btn of btnDelete) {
        btn.addEventListener('click', (e) => {
          removeTicket(e.target.parentElement.getAttribute('id'));
          e.target.closest('div.ticket-container').parentElement.remove();
        });
      }

      for (const changeStatus of btnStatus) {
        changeStatus.addEventListener('click', (e) => {
          statusTicket(e.target.parentElement.getAttribute('id'));
          e.target.parentElement.firstChild.classList.add('status-true');
        });
      }
    };

    if (xhr.status === 404) return;

    xhr.open('POST', 'http://localhost:7020/?createTicket');
    xhr.send(JSON.stringify(ticketUserFull));
  });
}

export function removeTicket(idt) {
  const body = new FormData(subscribeForm);
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
  };
  if (xhr.status == 404) return;

  xhr.open('GET', `http://localhost:7020/?method=ticketById&id=${idt}`);
  xhr.send();
}

export function statusTicket(idt) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
  };
  if (xhr.status === 404) return;

  xhr.open('GET', `http://localhost:7020/?method=ticketStatus&id=${idt}`);
  xhr.send();
}

function getDateTime() {
  const timestamp = new Date();
  const date = timestamp.getDate();
  const month = timestamp.getMonth();
  const year = timestamp.getFullYear();
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();

  return `${date}.${month + 1}.${year} ${hours}:${minutes}`;
}

function addElTicket(objTicket) {
  const newContainer = document.createElement('DIV');
  newContainer.classList.add('ticket-container');
  newContainer.innerHTML = `<div class="ticket-container" id=${objTicket.id}><div class="ticket-status">
    </div><div class="ticket-name">${objTicket.name}</div><div class="ticket-datetime">${getDateTime()}</div>
    <div class="ticket-edit edit"></div><div class="ticket-delete delete"></div></div>`;
  subscribeForm.after(newContainer);
}
