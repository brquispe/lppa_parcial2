class Dialog {
  modals = []
  constructor() {
    this.overlay = document.createElement('div')
    this.overlay.classList.add('modal_overlay', 'hidden')
    document.getElementsByTagName('body')[0].prepend(this.overlay)
  }

  show(message, status = 'success') {
    this.overlay.classList.remove('hidden');
    const element = document.createElement('div')
    element.classList.add('modal');
    element.innerHTML = `
      <div class="modal__header">
        <button type="button" title="Close Modal" class="modal__close">&times;</button>
      </div>
      <div class="modal__body">
        <div class="modal__icon">
          <i class="fa-solid ${status === 'success' ? 'fa-check msg_success' : 'fa-xmark msg_error'}"></i>
          <p>${message}</p>
        </div>
      </div>
      <div class="modal__footer">
        <button type="button" title="OK" class="btn modal__btnOK">Aceptar</button>
      </div>`;
    this.modals.push(element)
    this.overlay.appendChild(element)
    element.querySelector('button.modal__btnOK')?.addEventListener('click', () => {
      this.hideDialog(element);
    })
    element.querySelector('button.modal__close')?.addEventListener('click', () => {
      this.hideDialog(element);
    })
  }

  hideDialog(element) {
    element?.classList.add('hidden')
    if (this.modals.every(modal => modal.classList.contains('hidden'))) {
      this.overlay.classList.add('hidden')
    }
  }
} 

export const dialogs = new Dialog()