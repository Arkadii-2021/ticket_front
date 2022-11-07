export default function ticketContainerHtmlEl(id, name, created, statusEl) {
  return `<div class="ticket-container" id=${id}><div class="ticket-status ${statusEl}">
	</div><div class="ticket-name">${name}</div><div class="ticket-datetime">${created}</div>
	<div class="ticket-edit edit"></div><div class="ticket-delete delete"></div></div>`;
}
