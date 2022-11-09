const subscribeWidget = document.querySelector('.subscribe');
const subscribeForm = subscribeWidget.querySelector('.subscribe-form');
const btnDelete = subscribeWidget.getElementsByClassName('ticket-delete');
const btnStatus = subscribeWidget.getElementsByClassName('ticket-status');
const btnAddOk = document.getElementsByClassName('btn-add-ok');
const btnAddCancel = document.getElementsByClassName('btn-add-cancel');
const textDescription = document.getElementsByClassName('text-description');
const textDescriptionFull = document.getElementsByClassName('text-description-full');
const btnCancel = document.getElementsByClassName('btn-cancel');
const btnOk = document.getElementsByClassName('btn-ok');
const ticketContainerGeneral = document.getElementsByClassName('ticket-container');
const editTicket = document.getElementsByClassName('ticket-edit');
const btnChOk = document.getElementsByClassName('btn-change-ok');
const btnChCancel = document.getElementsByClassName('btn-change-cancel');

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
		  xhrUploadTicket();
        document.getElementsByClassName('popup-ticket-add')[0].remove();
      });
      btnAddCancel[0].addEventListener('click', () => {
        document.getElementsByClassName('popup-ticket-add')[0].remove();
      });
      textDescription[0].addEventListener('keyup', () => {
        ticketUserFull.name = textDescription[0].value;
		console.log(ticketUserFull.name);
      });
      textDescriptionFull[0].addEventListener('keyup', () => {
        ticketUserFull.description = textDescriptionFull[0].value;
      });
  });
}

function xhrUploadTicket() {
	const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
      addElTicket(JSON.parse(xhr.responseText));
    };

    if (xhr.status === 404) return;

    xhr.open('POST', 'http://localhost:7010/?createTicket');
    xhr.send(JSON.stringify(ticketUserFull));
	
}

export function removeTicket(idt) {
  const body = new FormData(subscribeForm);
  const xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
  };
  if (xhr.status == 404) return;

  xhr.open('GET', `http://localhost:7010/?method=ticketById&id=${idt}`);
  xhr.send();
}

export function statusTicket(idt) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
  };
  if (xhr.status === 404) return;

  xhr.open('GET', `http://localhost:7010/?method=ticketStatus&id=${idt}`);
  xhr.send();
}

export function descriptionTicket(idt) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) {
	return xhr.responseText;
	}
  };
  if (xhr.status === 404) return;

  xhr.open('GET', `http://localhost:7010/?method=ticketDescription&id=${idt}`);
  xhr.send();
}

function changeTicket(idt) {
/*   textDescription[0].addEventListener('keydown', () => {
    ticketUserFull.name = textDescription[0].value;
  });
  textDescriptionFull[0].addEventListener('keydown', () => {
   ticketUserFull.description = textDescriptionFull[0].value;
  }); */
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
    addElTicket(JSON.parse(xhr.responseText));
  };

  if (xhr.status === 404) return;

  xhr.open('POST', `http://localhost:7010/?method=changeTicket&id=${idt}`);
  xhr.send(JSON.stringify(ticketUserFull));
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
  newContainer.innerHTML = `<div class="ticket-container" id=${objTicket.id}><div class="ticket-status">
    </div><div class="ticket-name">${objTicket.name}</div><div class="ticket-datetime">${getDateTime()}</div>
    <div class="ticket-edit edit"></div><div class="ticket-delete delete"></div></div>`;
  subscribeForm.after(newContainer);
      for (const btn of btnDelete) {
        btn.addEventListener('click', (e) => {
			const popupDeleteConfirm = document.createElement('DIV');
            popupDeleteConfirm.classList.add('popup-ticket');
            popupDeleteConfirm.innerHTML = `<button class="btn-ok">ОК</button>
            <button class="btn-cancel">Отмена</button><p class="confirm-title">Удалить тикет</p>
            <p class="confirm-description">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>`;
	        e.stopPropagation();
      if (document.getElementsByClassName('popup-ticket').length === 0) {
		  subscribeWidget.before(popupDeleteConfirm);
		  	 document.getElementsByClassName('btn-ok')[0].addEventListener('click', (et) => {
		     removeTicket(e.target.parentElement.getAttribute('id'));
             e.target.closest('div.ticket-container').parentElement.remove();
		     popupDeleteConfirm.remove();
	  })
	  } else if (document.getElementsByClassName('popup-ticket').length > 1) {
		  popupDeleteConfirm.remove();
	  }
      btnCancel[0].addEventListener('click', (evt) => {
        popupDeleteConfirm.remove();
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
	  
	    for (const edit of editTicket) {
        edit.addEventListener('click', (e) => {
		const popupEditTicket = document.createElement('DIV');
        popupEditTicket.classList.add('popup-ticket-add');
        popupEditTicket.innerHTML = `<button class="btn-change-ok">ОК</button>
        <button class="btn-change-cancel">Отмена</button>
        <p class="confirm-title-add">Изменить тикет</p>
        <p class="title-description">Краткое описание</p>
        <textarea class="text-description"></textarea>
        <p class="title-description-full">Полное описание</p>
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
		}, false)};
}
