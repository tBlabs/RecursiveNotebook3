import { SuperFixture } from './../../testing/utils';
import { element } from 'protractor';
import { EditableValueComponent } from './editable-value.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('editable-input', () =>
{
    let $label = '.value-label'; // $ sign is used only for CSS-Selectors
    let $edit = '.value-edit';
    let $input = '.value-edit input';
    let f: SuperFixture<EditableValueComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations: [EditableValueComponent]
            })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        f = new SuperFixture<EditableValueComponent>(EditableValueComponent);

        f.component.value = "init";
        f.component.placeholder = "placeholder";

        f.DetectChanges();
    });


    it('after creation should display label with initial value', () =>
    {
        expect(f.Exists($label)).toBeTruthy();
        expect(f.TextOf($label)).toBe("init");

        expect(f.Exists($edit)).toBeFalsy();
    });

    it('should display empty label when [value] set to undefined or null', () =>
    {
        f.component.value = undefined;
        expect(f.TextOf($label)).toBe("");

        f.component.value = null;
        expect(f.TextOf($label)).toBe("");
    });

    it('should display specified label', () =>
    {
        f.component.value = "abc";
        expect(f.TextOf($label)).toBe("abc");
    });

    it('should switch to edit mode after left click', () =>
    {
        f.DoubleClick($label);
        expect(f.Exists($label)).toBeFalsy('hide $label');
        expect(f.Exists($edit)).toBeTruthy('show $edit');
    });

    it('should change label after edit', () =>
    {
        // Switch to edit mode (double click on label)
        f.DoubleClick($label);

        // Edit value
        f.SetInputValue($input, "test");

        // Press enter
        f.Find($input).triggerEventHandler('keydown.enter', null);

        // Check label 
        expect(f.TextOf($label)).toBe("test");
    });

    it('should not change label after edit aborted by Esc press', () =>
    {
        // Switch to edit mode (double click on label)
        f.DoubleClick($label);

        // Edit value
        f.SetInputValue($input, "edited");

        // Abort
        f.Find($input).triggerEventHandler('keydown.esc', null);

        // Check label if still has initial value
        expect(f.TextOf($label)).toBe("init");
    });

    it('should not change label after edit aborted by blur', () =>
    {
        // Switch to edit mode (double click on label)
        f.DoubleClick($label);

        // Edit value
        f.SetInputValue($input, "edited");

        // Abort
        f.Blur($input);

        // Check label if still has initial value
        expect(f.TextOf($label)).toBe("init");
    });

    it('should not change label after edit to empty string', () =>
    {
        // Switch to edit mode (double click on label)
        f.DoubleClick($label);

        // Edit value
        f.SetInputValue($input, "");

        // Press enter
        f.Find($input).triggerEventHandler('keydown.enter', null);

        // Check label if still has initial value
        expect(f.TextOf($label)).toBe("init");
    });

    it('should emit onChange after value change', () =>
    {
        // Switch to edit mode (double click on label)
        f.DoubleClick($label);

        // We need to be shure that onChange had been called, otherwise test would pass with wrong value
        spyOn(f.component.onChange, 'emit').and.callThrough();

        let value = ""
        f.component.onChange.subscribe((v: string) =>
        {
            value = v;
        })

        f.SetInputValue($input, "edited");

        // Press enter
        f.Find($input).triggerEventHandler('keydown.enter', null);

        expect(value).toBe("edited");
        expect(f.component.onChange.emit).toHaveBeenCalled();
    });

    it('should not emit onChange when value will not change', () =>
    {
        // Switch to edit mode (double click on label)
        f.DoubleClick($label);

        // We need to be shure that onChange had been called, otherwise test would pass with wrong value
        spyOn(f.component.onChange, 'emit').and.callThrough();

        f.component.onChange.subscribe((value: string) =>
        {
            expect(value).toBe("init"); // Should not be called! (but we need to subscribe cause observables are cold)
        })

        // Press enter
        f.Find($input).triggerEventHandler('keydown.enter', null);

        expect(f.component.onChange.emit).not.toHaveBeenCalled();
    });

});