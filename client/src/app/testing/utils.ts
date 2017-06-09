import { element } from 'protractor';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';


export class SuperFixture<T>
{
    private fixture: ComponentFixture<T>;
    public component: T;


    constructor(component: Type<T>)
    {
        this.fixture = TestBed.createComponent<T>(component);
        this.component = this.fixture.componentInstance;
    }

    public Query(cssSelector: string): DebugElement
    {
        return this.fixture.debugElement.query(By.css(cssSelector));
    }

    public QueryAll(cssSelector: string): DebugElement[]
    {
        return this.fixture.debugElement.queryAll(By.css(cssSelector));
    }

    public Find(cssSelector: string): DebugElement
    {
        this.DetectChanges();

        const element: DebugElement = this.Query(cssSelector);

        if (element == null)
        {
            throw new Error('Can not find "' + cssSelector + '"');
        }  

        return element;
    }

    public FindAll(cssSelector: string): DebugElement[]
    {
        this.DetectChanges();

        const elements: DebugElement[] = this.QueryAll(cssSelector);

        if (elements == null)
        {
            throw new Error('Can not find "' + cssSelector + '"');
        }

        return elements;
    }

    public FindWithText(cssSelector: string, text: string): DebugElement
    {
        let elements: DebugElement[] = this.FindAll(cssSelector);

        for (let i=0; i<elements.length; i++)
        {       
            if (elements[i].nativeElement.innerText == text) 
                return elements[i];
        }
    }

    public $(cssSelector: string, withText?: string): DebugElement
    {
        if (withText != null)
        {
            return this.FindWithText(cssSelector, withText);
        }
        else 
        {
            return this.Find(cssSelector);
        }
    }

    public Exists(cssSelector: string): boolean 
    {
        this.DetectChanges();

        let element: DebugElement = this.Query(cssSelector);

        return (element != null) ? true : false;
    }

    public Blur(cssSelector: string): void 
    {
        let element: DebugElement = this.Find(cssSelector);

        element.triggerEventHandler('blur', null);

        this.DetectChanges();
    }

    public TextOf(cssSelector: string): string 
    {
        this.DetectChanges();

        const element: DebugElement = this.Find(cssSelector);

        return element.nativeElement.innerText;
    }

    public GetInputValue(cssSelector: string): string
    {
        this.DetectChanges();

        let input: HTMLInputElement = this.Find(cssSelector).nativeElement;

        if (input != null)
        {
            return input.value;
        }
        else throw 'Can not find input "' + cssSelector + '"';
    }

    public SetInputValue(cssSelector: string, newValue: string): void
    {
        const element: DebugElement = this.Find(cssSelector);

        const input: HTMLInputElement = element.nativeElement;

        if (input != null)
        {
            input.value = newValue;

            // input.dispatchEvent(new Event('input')); // ?

            // this.DetectChanges(); // ?
        }
        else throw new Error('Can not find input "' + cssSelector + '"');
    }

    private ButtonClickEvents =
    {
        left: { button: 0 },
        right: { button: 2 }
    };

    /** Simulate element click. Defaults to mouse left-button click event. */
    private Click(el: DebugElement | HTMLElement, eventObj: any = this.ButtonClickEvents.left): void
    {
        if (el instanceof HTMLElement)
        {
            el.click();
        }
        else
        {
            el.triggerEventHandler('click', eventObj);
        }
    }

    public DoubleClick(cssSelector: string): void
    {
        this.Find(cssSelector).triggerEventHandler('dblclick', this.ButtonClickEvents.left);

        this.DetectChanges();
    }

    public ClickLeft(selector: string | DebugElement): void 
    {
        let element: DebugElement;

        if (selector instanceof DebugElement)
        {
            element = selector;
        }
        else
        {
            element = this.Find(selector);
        }

        this.Click(element);

        this.DetectChanges();
    }

    public DetectChanges()
    {
        this.fixture.detectChanges();
    }
}

