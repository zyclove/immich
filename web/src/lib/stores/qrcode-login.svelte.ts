class QRCodeLoginStore {
  shouldShowForm = $state(false);

  showForm() {
    this.shouldShowForm = true;
  }

  hideForm() {
    this.shouldShowForm = false;
  }
}

export const qrCodeLoginStore = new QRCodeLoginStore();
