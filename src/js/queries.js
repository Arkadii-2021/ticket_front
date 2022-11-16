import { newElTIcket } from './ticketContainer';
import { ticketUserFull } from './dataTicketObj';
import { allTIckLoad } from './app';

const subscribeWidget = document.querySelector('.subscribe');
const subscribeForm = subscribeWidget.querySelector('.subscribe-form');

export async function descriptionTicket(idt) {
	let response = await fetch(`http://localhost:7030/?method=ticketDescription&id=${idt}`);
	if (response.ok) {
		let txt = await response.text();
	} else {
		console.log("Ошибка HTTP: " + response.status);
    }
}

export function xhrUploadTicket() {
	const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return;
	  allTIckLoad();
    };

    if (xhr.status === 404) return;

    xhr.open('POST', 'http://localhost:7030/?method=createTicket');
    xhr.send(JSON.stringify(ticketUserFull));
}

export function changeTicket(idt) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
  };

  if (xhr.status === 404) return;

  xhr.open('POST', `http://localhost:7030/?method=changeTicket&id=${idt}`);
  xhr.send(JSON.stringify(ticketUserFull));
}

export function addNewTicket() {
  subscribeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
	newElTIcket();
      document.getElementsByClassName('btn-add-ok')[0].addEventListener('click', () => {
		xhrUploadTicket();
        document.getElementsByClassName('popup-ticket-add')[0].remove();
      });
      document.getElementsByClassName('btn-add-cancel')[0].addEventListener('click', () => {
        document.getElementsByClassName('popup-ticket-add')[0].remove();
      });
      document.getElementsByClassName('text-description')[0].addEventListener('keyup', () => {
        ticketUserFull.name = document.getElementsByClassName('text-description')[0].value;
      });
      document.getElementsByClassName('text-description-full')[0].addEventListener('keyup', () => {
        ticketUserFull.description = document.getElementsByClassName('text-description-full')[0].value;
      });
  });
  
}
