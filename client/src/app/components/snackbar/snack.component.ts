import { Component } from '@angular/core';

@Component({
    selector: 'test-snack',
    template: `
        <div>SNACK!!!!!!!!!!!</div>
    `
})
export class TestSnackComponent
{
    constructor()
    {
        console.log("snack constr.");

    }
}