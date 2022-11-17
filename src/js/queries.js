import { allTIckLoad } from './app';
import { ticketUserFull } from './dataTicketObj';

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

  xhr.open('POST', `http://localhost:7030/?method=changeTicket&id=${idt.id}`);
  xhr.send(JSON.stringify(idt));
}

export function removeTicket(idt) {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return;
  };

  if (xhr.status === 404) return;

  xhr.open('POST', `http://localhost:7030/?method=removeTicket&id=${idt}`);
  xhr.send(JSON.stringify(ticketUserFull));
}
