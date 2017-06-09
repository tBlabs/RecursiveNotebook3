import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'editable-once',
    template: `
       
    <span *ngIf="!edit" 
        (click)="Edit()" 
        class="value-label">
        {{ value }}
    </span>                                 

    <span *ngIf="edit" class="value-edit">
        <input type="text"
               #thisInput 
               focus="true"
               [value]="value"                           
               [placeholder]="placeholder"
               (keydown.enter)="OnEnterPress(thisInput.value)"
               (blur)="Abort()" 
               (keydown.esc)="Abort()">
    </span>         
    `,
    styles: 
    [`
        input { height: 20px; border: 1px solid #999; }
    `]
})
export class EditableOnceComponent  
{
    @Input() value: string = null;
    @Input() placeholder: string = null;
   
    @Output() onComplete = new EventEmitter<string>();

    private oldValue: string = null
    private edit: boolean = false;
    private edited = false;

    Edit()
    {
        this.edit = true;
        this.oldValue = this.value;
        this.value = "";
        this.edited = false;       
    }
  
    OnEnterPress(value: string)
    {
        if (value != "") 
        {          
            this.edited = true;

            this.onComplete.emit(value);    
                
            this.value = this.oldValue;
        }
        else
        {
            this.value = this.oldValue;
        }

        this.edit = false;
    }

    Abort()
    {       
        if (this.edited) // keydown.enter makes blur..         
        {           
            return; // ..so we need to stop here
        }
        else
        {
            this.edit = false;

            this.value = this.oldValue;
        }
    }
}