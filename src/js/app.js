import { changeTicket, addNewTicket } from './queries';
import { ticketContainerHtmlEl, deleteConfirm, renameTicket, descriptionModalWindow } from './ticketContainer';
import { ticketUserFull } from './dataTicketObj';

const subscribeWidget = document.querySelector('.subscribe');
const subscribeForm = subscribeWidget.querySelector('.subscribe-form');

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
    
  for (const btn of subscribeWidget.getElementsByClassName('ticket-delete')) {
    btn.addEventListener('click', (evt) => {
	  deleteConfirm();
	  evt.stopPropagation();
      document.querySelector('.btn-cancel').addEventListener('click', (evt) => {
        document.querySelector('.popup-ticket').remove();
      });
      document.querySelector('.btn-ok').addEventListener('click', () => {
        document.querySelector('.popup-ticket').remove();
        fetch(`http://localhost:7010/?method=ticketById&id=${evt.target.parentElement.getAttribute('id')}`);
        evt.target.closest('div.ticket-container').parentElement.remove();
      });
    }, false);
  }
  
  for (const changeStatus of subscribeWidget.getElementsByClassName('ticket-status')) {
    changeStatus.addEventListener('click', (e) => {
	  fetch(`http://localhost:7010/?method=ticketStatus&id=${e.target.parentElement.getAttribute('id')}`);
      e.target.parentElement.firstChild.classList.add('status-true');
	  e.stopPropagation();
    }, false);
  }
  
  for (const edit of document.getElementsByClassName('ticket-edit')) {
    edit.addEventListener('click', (ev) => {
		const popupEditTicket = document.createElement('DIV');
		renameTicket(popupEditTicket);
		document.getElementsByClassName('btn-change-cancel')[0].addEventListener('click', (evt) => {
          popupEditTicket.remove();
        });
        document.getElementsByClassName('btn-change-ok')[0].addEventListener('click', (e) => {
		  document.getElementsByClassName('text-description')[0].addEventListener('keyup', () => {
			ticketUserFull.name = document.getElementsByClassName('text-description')[0].value;
		  });
		  document.getElementsByClassName('text-description-full')[0].addEventListener('keyup', () => {
		   ticketUserFull.description = document.getElementsByClassName('text-description-full')[0].value;
		  });
		  changeTicket(ev.target.parentElement.getAttribute('id'));
          popupEditTicket.remove();
		});
		ev.stopPropagation();
    }, false);
  }
  
  for (const ticketGeneral of document.getElementsByClassName('ticket-container')) {
    ticketGeneral.addEventListener('click', (e) => {
	  descriptionModalWindow(e.target.getAttribute('id'));
	  document.getElementsByClassName('close')[0].addEventListener('click', (e) => {
		  document.getElementsByClassName('modal__description')[0].remove();
	  })
    }, false);
  }
}

xhr.open('GET', 'http://localhost:7010/?method=allTickets');
xhr.send();

addNewTicket();
