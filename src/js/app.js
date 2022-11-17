import { xhrUploadTicket, changeTicket, removeTicket } from './queries';
import { ticketUserFull } from './dataTicketObj';

const subscribeWidget = document.querySelector('.subscribe');
const subscribeForm = subscribeWidget.querySelector('.subscribe-form');

export function allTIckLoad() {
	fetch('http://localhost:7030/?method=allTickets')
	  .then(response => {  
		return response.json();
	  })  
	  .then(json => {
		renderTicket(json);
	  })  
	  .catch(error => {  
		log('Request failed', error)  
	});	
}

function renderTicket(tiсket) {
	for (const ticketEl of tiсket) {
		if (!window[ticketEl.id]) {
      const ticketContainer = document.createElement('div');
      ticketContainer.classList.add('ticket-container');
      ticketContainer.setAttribute('id', ticketEl.id);
        
      const ticketStatus = document.createElement('div');
      ticketStatus.classList.add('ticket-status');
      ticketStatus.classList.add(ticketEl.status);
        
      const ticketName = document.createElement('div');
      ticketName.classList.add('ticket-name');
      ticketName.textContent = ticketEl.name;
              
      const ticketDatetime = document.createElement('div');
      ticketDatetime.classList.add('ticket-datetime');
      ticketDatetime.textContent = ticketEl.created;
        
      const ticketEdit = document.createElement('div');
      ticketEdit.classList.add('ticket-edit');
      ticketEdit.classList.add('edit');
        
      const ticketDelete = document.createElement('div');
      ticketDelete.classList.add('ticket-delete');
        
      subscribeForm.after(ticketContainer);
      ticketContainer.append(ticketStatus, ticketName, ticketDatetime, ticketEdit, ticketDelete);

      ticketContainer.querySelector('.ticket-edit').addEventListener('click', (ed) => {
        renderModalEditTicket(ticketEl, ed);
        ed.stopPropagation();
      });
      
      ticketContainer.querySelector('.ticket-delete').addEventListener('click', (ed) => {
        deleteConfirm(ed);
        ed.stopPropagation();
      });
      
      ticketContainer.querySelector('.ticket-status').addEventListener('click', (ed) => {
        fetch(`http://localhost:7030/?method=ticketStatus&id=${ed.target.parentElement.getAttribute('id')}`)
        ed.target.classList.replace('false', 'true');
        ed.stopPropagation();
      });
      
      document.querySelector('.ticket-container').addEventListener('click', (ed) => {
        descriptionModalWindow(ed.target.id);
      });
    }
	}
}

function deleteConfirm(ed) {
  const popupDeleteConfirm = document.createElement('DIV');
  popupDeleteConfirm.classList.add('popup-ticket');
  popupDeleteConfirm.innerHTML = `<button class="btn-ok">ОК</button>
  <button class="btn-cancel">Отмена</button><p class="confirm-title">Удалить тикет</p>
  <p class="confirm-description">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>`;
  subscribeWidget.before(popupDeleteConfirm);
  
  document.querySelector('.btn-ok').addEventListener('click', (e) => {
    removeTicket(ed.target.parentElement.getAttribute('id'));
    ed.target.parentElement.remove();
    e.target.parentElement.remove();
  })
  
  document.querySelector('.btn-cancel').addEventListener('click', (e) => {
    e.target.parentElement.remove();
  })
}

function renderModalEditTicket(ticketEl, ed) {
  const popupAddTicket = document.createElement('DIV');
  popupAddTicket.classList.add('popup-ticket-add');
      
  const btnAddOk = document.createElement('button');
  btnAddOk.classList.add('btn-add-ok');
  btnAddOk.textContent = 'OK';
      
  const btnAddCancel = document.createElement('button');
  btnAddCancel.classList.add('btn-add-cancel');
  btnAddCancel.textContent = 'Отмена';
      
  const confirmTitleAdd = document.createElement('p');
  confirmTitleAdd.classList.add('confirm-title-add');
  confirmTitleAdd.textContent = 'Редактировать тикет';
      
  const titleDescription = document.createElement('p');
  titleDescription.classList.add('title-description');
  titleDescription.textContent = 'Краткое описание';
      
  const textDescription = document.createElement('textarea');
  textDescription.classList.add('text-description');
      
  const titleDescriptionFull = document.createElement('p');
  titleDescriptionFull.classList.add('title-description-full');
  titleDescriptionFull.textContent = 'Подробное описание';
      
  const textDescriptionFull = document.createElement('textarea');
  textDescriptionFull.classList.add('text-description-full');     

  subscribeWidget.before(popupAddTicket);
  popupAddTicket.append(
    btnAddOk, btnAddCancel, confirmTitleAdd, titleDescription, 
    textDescription, titleDescriptionFull, textDescriptionFull
  );
  renameTicket(ticketEl, ed);
}

function renderModalAddTicket(ticketEl) {
  const popupAddTicket = document.createElement('DIV');
  popupAddTicket.classList.add('popup-ticket-add');
      
  const btnAddOk = document.createElement('button');
  btnAddOk.classList.add('btn-add-ok');
  btnAddOk.textContent = 'OK';
      
  const btnAddCancel = document.createElement('button');
  btnAddCancel.classList.add('btn-add-cancel');
  btnAddCancel.textContent = 'Отмена';
      
  const confirmTitleAdd = document.createElement('p');
  confirmTitleAdd.classList.add('confirm-title-add');
  confirmTitleAdd.textContent = 'Добавить тикет';
      
  const titleDescription = document.createElement('p');
  titleDescription.classList.add('title-description');
  titleDescription.textContent = 'Краткое описание';
      
  const textDescription = document.createElement('textarea');
  textDescription.classList.add('text-description');
      
  const titleDescriptionFull = document.createElement('p');
  titleDescriptionFull.classList.add('title-description-full');
  titleDescriptionFull.textContent = 'Подробное описание';
      
  const textDescriptionFull = document.createElement('textarea');
  textDescriptionFull.classList.add('text-description-full');     

  subscribeWidget.before(popupAddTicket);
  popupAddTicket.append(
    btnAddOk, btnAddCancel, confirmTitleAdd, titleDescription, 
    textDescription, titleDescriptionFull, textDescriptionFull
  );
}

function addNewTicket() {
  subscribeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
	  renderModalAddTicket();
    document.querySelector('.btn-add-ok').addEventListener('click', () => {
      xhrUploadTicket();
      document.querySelector('.popup-ticket-add').remove();
    });
    document.querySelector('.btn-add-cancel').addEventListener('click', () => {
      document.querySelector('.popup-ticket-add').remove();
    });
    document.querySelector('.text-description').addEventListener('keyup', () => {
      ticketUserFull.name = document.querySelector('.text-description').value;
    });
    document.querySelector('.text-description-full').addEventListener('keyup', () => {
      ticketUserFull.description = document.querySelector('.text-description-full').value;
    });
  });
}

function renameTicket(ticketEl, ed) {
  document.querySelector('.btn-add-ok').addEventListener('click', (e) => {
    ticketEl.name = ticketUserFull.name
    ticketEl.description = ticketUserFull.description;
    changeTicket(ticketEl);
      
    document.querySelector('.popup-ticket-add').remove();
    ed.target.parentElement.childNodes[1].textContent = ticketEl.name;
    ed.target.parentElement.childNodes[2].textContent = ticketEl.created;
  });
    
  document.querySelector('.btn-add-cancel').addEventListener('click', () => {
    document.querySelector('.popup-ticket-add').remove();
  });
    
  document.querySelector('.text-description').addEventListener('keyup', () => {
    ticketUserFull.name = document.querySelector('.text-description').value;
  });
    
  document.querySelector('.text-description-full').addEventListener('keyup', () => {
    ticketUserFull.description = document.querySelector('.text-description-full').value;
  });   
}

function descriptionModalWindow(id) {
  const modalDescription = document.createElement('DIV');
  modalDescription.classList.add('modal__description');
  
  const times = document.createElement('div');
  times.classList.add('close');
  times.innerText = '\u2716';
  
  const confirmModalDescription = document.createElement('p');
  confirmModalDescription.classList.add('confirm__modal__description');
  
  fetch(`http://localhost:7030/?method=ticketDescription&id=${id}`)
  .then(response => {
    return response.text();
  })
  .then(data => {
    confirmModalDescription.textContent = data})
	.catch(error => {  
		log('Request failed', error)  
	});
  
  subscribeWidget.before(modalDescription);
  modalDescription.append(times, confirmModalDescription);
  document.querySelector('.close').addEventListener('click', () => {
    modalDescription.remove();
  }); 
}

allTIckLoad();
addNewTicket();
