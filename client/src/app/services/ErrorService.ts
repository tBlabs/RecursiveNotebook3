import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Injectable()
export class SnackService
{
    constructor(private _snack: MdSnackBar)
    {

    }

    public Error(message: string)
    {
        console.log("snack: "+message);
        this._snack.open(message, null, { duration: 2500, extraClasses: ["red-alert"] });
    }
}