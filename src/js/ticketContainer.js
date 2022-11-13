const subscribeWidget = document.querySelector('.subscribe');
import { descriptionTicket } from './queries';

export function newElTIcket() {
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
}

export function descriptionModalWindow(id) {
      const modalDescription = document.createElement('DIV');
      modalDescription.classList.add('modal__description');
      modalDescription.innerHTML = `<div class="close">&times</div><p class="confirm__modal__description">${descriptionTicket(id)}</p>`;
      subscribeWidget.before(modalDescription);
}

export function ticketContainerHtmlEl(id, name, created, statusEl) {
  return `<div class="ticket-container" id=${id}><div class="ticket-status ${statusEl}">
	</div><div class="ticket-name">${name}</div><div class="ticket-datetime">${created}</div>
	<div class="ticket-edit edit"></div><div class="ticket-delete delete"></div></div>`;
}

export function deleteConfirm() {
      const popupDeleteConfirm = document.createElement('DIV');
      popupDeleteConfirm.classList.add('popup-ticket');
      popupDeleteConfirm.innerHTML = `<button class="btn-ok">ОК</button>
      <button class="btn-cancel">Отмена</button><p class="confirm-title">Удалить тикет</p>
      <p class="confirm-description">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>`;
      subscribeWidget.before(popupDeleteConfirm);
}

export function deleteConfirmNew(popupDeleteConfirm) {
      popupDeleteConfirm.classList.add('popup-ticket');
      popupDeleteConfirm.innerHTML = `<button class="btn-ok">ОК</button>
      <button class="btn-cancel">Отмена</button><p class="confirm-title">Удалить тикет</p>
      <p class="confirm-description">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>`;
}

export function renameTicket(popupEditTicket) {
      popupEditTicket.classList.add('popup-ticket-add');
      popupEditTicket.innerHTML = `<button class="btn-change-ok">ОК</button>
      <button class="btn-change-cancel">Отмена</button>
      <p class="confirm-title-add">Изменить тикет</p>
      <p class="title-description">Краткое описание</p>
      <textarea class="text-description"></textarea>
      <p class="title-description-full">Полное описание</p>
      <textarea class="text-description-full"></textarea>`;
      subscribeWidget.before(popupEditTicket);
}
