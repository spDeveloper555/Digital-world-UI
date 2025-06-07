import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'e-seva-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {
    @Input() title: string = 'Confirm';
    @Input() message: string = 'Are you sure?';
    @Input() confirmButtonText: string = 'Yes';
    @Input() cancelButtonText: string = 'No';

    @Output() confirmed = new EventEmitter<boolean>();

    confirm() {
        this.confirmed.emit(true);
    }

    cancel() {
        this.confirmed.emit(false);
    }
}
