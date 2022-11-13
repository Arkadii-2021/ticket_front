import { descriptionModalWindow, renameTicket, deleteConfirmNew } from './ticketContainer';
import { changeTicket } from './queries';
import { ticketUserFull } from './dataTicketObj';

const subscribeWidget = document.querySelector('.subscribe');

function getDateTime() {
  const timestamp = new Date();
  const date = timestamp.getDate();
  const month = timestamp.getMonth();
  const year = timestamp.getFullYear();
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();

  return `${date}.${month + 1}.${year} ${hours}:${minutes}`;
}

export function addElTicket(objTicket) {
  const newContainer = document.createElement('DIV');
  newContainer.innerHTML = `<div class="ticket-container" id=${objTicket.id}><div class="ticket-status">
    </div><div class="ticket-name">${objTicket.name}</div><div class="ticket-datetime">${getDateTime()}</div>
    <div class="ticket-edit edit"></div><div class="ticket-delete delete"></div></div>`;
  subscribeWidget.querySelector('.subscribe-form').after(newContainer);
      for (const btn of subscribeWidget.getElementsByClassName('ticket-delete')) {
        btn.addEventListener('click', (e) => {
			const popupDeleteConfirm = document.createElement('DIV');
			deleteConfirmNew(popupDeleteConfirm);
	        e.stopPropagation();
			if (document.getElementsByClassName('popup-ticket').length === 0) {
				subscribeWidget.before(popupDeleteConfirm);
				document.getElementsByClassName('btn-ok')[0].addEventListener('click', (et) => {
					fetch(`http://localhost:7010/?method=ticketById&id=${e.target.parentElement.getAttribute('id')}`);		    
					e.target.closest('div.ticket-container').parentElement.remove();
					popupDeleteConfirm.remove();
	            })
	           } else if (document.getElementsByClassName('popup-ticket').length > 1) {
			       popupDeleteConfirm.remove();
	       }
      document.getElementsByClassName('btn-cancel')[0].addEventListener('click', (evt) => {
        popupDeleteConfirm.remove();
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
	 
	  for (const ticketGeneral of document.getElementsByClassName('ticket-container')) {
          ticketGeneral.addEventListener('click', (e) => {
			  if (document.getElementsByClassName('modal__description').length === 1) return;
			descriptionModalWindow(e.target.getAttribute('id'));
			document.getElementsByClassName('close')[0].addEventListener('click', (e) => {
				document.getElementsByClassName('modal__description')[0].remove();
	        })
        }, false);
      }
	
	  for (const edit of document.getElementsByClassName('ticket-edit')) {
        edit.addEventListener('click', (ev) => {
		const popupEditTicket = document.createElement('DIV');
        if (document.getElementsByClassName('popup-ticket-add').length === 1) return;
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
		  ticketUserFull.id = e.target.parentElement.getAttribute('id');
		  changeTicket(ev.target.parentElement.getAttribute('id'));
          popupEditTicket.remove();
		});  
		ev.stopPropagation();
	  }, false)};
}
