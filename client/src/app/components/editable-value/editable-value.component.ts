import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'editable-value',
    template:
    /*
        Warnings:
        (1) I think (!) that <a> tags styles are ignored by Angular in template, that's why we need to use something other here
        (2) .value-label need 3px of extra padding if we wanna have the same height of tab independently from edit mode (label or input)
              - or -
            We need to change input height to smaller
    */
    `      
    <span *ngIf="!edit"  
           class="value-label"
          (dblclick)="Edit()">{{ value }}</span>                                 

    <span *ngIf="edit" 
           class="value-edit">
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
        input { height: 20px; border: 1px solid #aaa; }
    `]
})
export class EditableValueComponent  
{
    @Input() value: string = null;
    @Input() placeholder: string = null;

    @Output() onChange = new EventEmitter<string>();

    private oldValue: string = null
    private edit: boolean = false;
    private edited = false;

    private Edit()
    {
        this.edit = true;
        this.edited = false;
        this.oldValue = this.value;
    }

    private OnEnterPress(value: string)
    {
        if (value != "") 
        {
            if (this.value != value)
            {
                this.value = value;
                this.edited = true;

                this.onChange.emit(this.value);
            }
        }
        else
        {
            this.value = this.oldValue;
        }

        this.edit = false;
    }

    private Abort()
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