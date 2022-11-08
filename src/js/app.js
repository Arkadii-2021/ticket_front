import { addNewTicket, removeTicket, statusTicket, descriptionTicket, changeTicket } from './newTickets';
import ticketContainerHtmlEl from './ticketContainer';

const subscribeWidget = document.querySelector('.subscribe');
const subscribeForm = subscribeWidget.querySelector('.subscribe-form');
const btnDelete = subscribeWidget.getElementsByClassName('ticket-delete');
const btnStatus = subscribeWidget.getElementsByClassName('ticket-status');
const btnCancel = document.getElementsByClassName('btn-cancel');
const btnChCancel = document.getElementsByClassName('btn-change-cancel');
const btnOk = document.getElementsByClassName('btn-ok');
const btnChOk = document.getElementsByClassName('btn-change-ok');
const popupTicket = document.getElementsByClassName('popup-ticket');
const editTicket = document.getElementsByClassName('ticket-edit');
const ticketContainerGeneral = document.getElementsByClassName('ticket-container');

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
      popupDeleteConfirm.innerHTML = `<button class="btn-ok">РћРљ</button>
      <button class="btn-cancel">РћС‚РјРµРЅР°</button><p class="confirm-title">РЈРґР°Р»РёС‚СЊ С‚РёРєРµС‚</p>
      <p class="confirm-description">Р’С‹ СѓРІРµСЂРµРЅС‹, С‡С‚Рѕ С…РѕС‚РёС‚Рµ СѓРґР°Р»РёС‚СЊ С‚РёРєРµС‚? Р­С‚Рѕ РґРµР№СЃС‚РІРёРµ РЅРµРѕР±СЂР°С‚РёРјРѕ.</p>`;
      subscribeWidget.before(popupDeleteConfirm);
	  evt.stopPropagation();
      btnCancel[0].addEventListener('click', (evt) => {
        popupTicket[0].remove();
      });
      btnOk[0].addEventListener('click', () => {
        popupTicket[0].remove();
        removeTicket(evt.target.parentElement.getAttribute('id'));
        evt.target.closest('div.ticket-container').parentElement.remove();
      });
    }, false);
  }
  
  for (const changeStatus of btnStatus) {
    changeStatus.addEventListener('click', (e) => {
      statusTicket(e.target.parentElement.getAttribute('id'));
      e.target.parentElement.firstChild.classList.add('status-true');
	  e.stopPropagation();
    }, false);
  }
  
  for (const edit of editTicket) {
    edit.addEventListener('click', (e) => {
		const popupEditTicket = document.createElement('DIV');
        popupEditTicket.classList.add('popup-ticket-add');
        popupEditTicket.innerHTML = `<button class="btn-change-ok">РћРљ</button>
        <button class="btn-change-cancel">РћС‚РјРµРЅР°</button>
        <p class="confirm-title-add">РР·РјРµРЅРёС‚СЊ С‚РёРєРµС‚</p>
        <p class="title-description">РљСЂР°С‚РєРѕРµ РѕРїРёСЃР°РЅРёРµ</p>
        <textarea class="text-description"></textarea>
        <p class="title-description-full">РџРѕР»РЅРѕРµ РѕРїРёСЃР°РЅРёРµ</p>
        <textarea class="text-description-full"></textarea>`;
        subscribeWidget.before(popupEditTicket);
		btnChCancel[0].addEventListener('click', (evt) => {
          popupEditTicket.remove();
        });
        btnChOk[0].addEventListener('click', (e) => {
		  changeTicket(e.target.parentElement.getAttribute('id'));
          popupEditTicket.remove();
		});  
		e.stopPropagation();
		
		
    }, false);
  }
  
  for (const ticketGeneral of ticketContainerGeneral) {
    ticketGeneral.addEventListener('click', (e) => {
      const modalDescription = document.createElement('DIV');
      modalDescription.classList.add('modal__description');
      modalDescription.innerHTML = `<div class="close">&times</div><p class="confirm__modal__description">${descriptionTicket(e.target.getAttribute('id'))}</p>`;
      subscribeWidget.before(modalDescription);
	  document.getElementsByClassName('close')[0].addEventListener('click', (e) => {
		  modalDescription.remove();
	  })
	 
    }, false);
  }
}

xhr.open('GET', 'http://localhost:7010/?method=allTickets');
xhr.send();

addNewTicket();
