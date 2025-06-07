import { Component } from '@angular/core';
@Component({
  selector: 'e-seva-invoice-recipt',
  templateUrl: './invoice-recipt.component.html',
  styleUrls: ['./invoice-recipt.component.css'],
})
export class InvoiceReciptComponent {
  public logo = 'assets/logo.png';
  public invoice = {
    date: 'January 10, 2026',
    number: '#12345',
    billedTo: {
      name: 'Daniel Gallego',
      phone: '+123-456-7890',
      email: 'hello@reallygreatsite.com',
      address: '123 Anywhere St., Any City'
    },
    items: [
      { name: 'New card', price: 999, qty: 1 },
    ],
    bank: {
      name: 'Larana',
      account: '123-456-7890'
    }
  };

  get subtotal() {
    return this.invoice.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  get total() {
    return this.subtotal; // No tax
  }
}
