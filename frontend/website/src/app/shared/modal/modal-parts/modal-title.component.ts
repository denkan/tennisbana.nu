import { Component, Input, Type } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
    selector: 'app-modal-title',
    template: `
        <header class="d-flex align-items-center pl-1 pl-sm-2 pr-1 bg-primary text-white"
            [class.justify-content-between]="close && !center"
            [class.justify-content-center]="!close && center"
            [class.py-1]="!close"
            [class.py-05]="close"           
            [ngClass]="headerClass" 
        >
            <h2 class="h4 m-0 p-0"><ng-content></ng-content></h2>
            <button mat-icon-button 
                *ngIf="close"
                (click)="dialogRef.close()"
            ><i class="fa fa-times"></i></button>
        </header>
    `,
    styles: [`
        :host { display: block; }
    `],
})
export class ModalTitleComponent {
    @Input() dialogRef: MatDialogRef<Type<any>>;
    @Input() close = true;
    @Input() center = false;
    @Input() headerClass = null;

    constructor() {}
}
