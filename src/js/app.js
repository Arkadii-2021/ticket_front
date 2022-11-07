import { addNewTicket, removeTicket, statusTicket } from './newTickets';
import ticketContainerHtmlEl from './ticketContainer';

const subscribeWidget = document.querySelector('.subscribe');
const subscribeForm = subscribeWidget.querySelector('.subscribe-form');
const btnDelete = subscribeWidget.getElementsByClassName('ticket-delete');
const btnStatus = subscribeWidget.getElementsByClassName('ticket-status');
const btnCancel = document.getElementsByClassName('btn-cancel');
const btnOk = document.getElementsByClassName('btn-ok');
const popupTicket = document.getElementsByClassName('popup-ticket');

const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState !== 4) return;
};

xhr.addEventListener('load', () => {
  if (xhr.status >= 200 && xhr.status < 300) {
    try {
      const data = JSON.parse(xhr.responseText);
      getAllTickets(data);
    } catch (e) {
      console.error(e);
    }
  }
});

function getAllTickets(objTickets) {
  for (const ticket of objTickets) {
    const newContainer = document.createElement('DIV');
    newContainer.classList.add('ticket-container');
    newContainer.innerHTML = ticketContainerHtmlEl(ticket.id, ticket.name, ticket.created);
    subscribeForm.after(newContainer);
    if (ticket.status) {
      newContainer.innerHTML = ticketContainerHtmlEl(ticket.id, ticket.name, ticket.created, 'status-true');
    }
    subscribeForm.after(newContainer);
  }
  for (const btn of btnDelete) {
    btn.addEventListener('click', (evt) => {
      const popupDeleteConfirm = document.createElement('DIV');
      popupDeleteConfirm.classList.add('popup-ticket');
      popupDeleteConfirm.innerHTML = `<button class="btn-ok">ОК</button>
      <button class="btn-cancel">Отмена</button><p class="confirm-title">Удалить тикет</p>
      <p class="confirm-description">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>`;
      subscribeWidget.before(popupDeleteConfirm);
      btnCancel[0].addEventListener('click', (evt) => {
        popupTicket[0].remove();
      });
      btnOk[0].addEventListener('click', () => {
        popupTicket[0].remove();
        removeTicket(evt.target.parentElement.getAttribute('id'));
        evt.target.closest('div.ticket-container').parentElement.remove();
      });
    });
  }
  for (const changeStatus of btnStatus) {
    changeStatus.addEventListener('click', (e) => {
      statusTicket(e.target.parentElement.getAttribute('id'));
      e.target.parentElement.firstChild.classList.add('status-true');
    });
  }
}

xhr.open('GET', 'http://localhost:7020/?method=allTickets');
xhr.send();

addNewTicket();
