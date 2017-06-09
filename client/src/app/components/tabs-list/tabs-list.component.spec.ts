import { EditableValueComponent } from './../editable-value/editable-value.component';
import { EditableOnceComponent } from './../editable-once/editable-once.component';
import { TabsService } from './../../services/tabs.service';
import { EmptyGuid } from './../../common/guid.extension';
import { Tab } from './../../models/tab.model';
import { SuperFixture } from './../../testing/utils';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';
import { element, by } from 'protractor';
import { TabsListComponent } from './tabs-list.component';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { guid } from "app/common/types";

describe('tabs-list', () =>
{
    let _service: TabsService;

    const tabsServiceStub =
        {
            GetChildren: (parentId: guid) =>
            {
                if (parentId === EmptyGuid)
                {
                    return Observable.of(
                        [
                            { parentId: EmptyGuid, id: "00000000-0000-0000-0000-000000000001", title: 'A', content: 'A content' },
                            { parentId: EmptyGuid, id: "00000000-0000-0000-0000-000000000002", title: 'B', content: 'B content' },
                            { parentId: EmptyGuid, id: "00000000-0000-0000-0000-000000000003", title: 'C', content: 'C content' }
                        ]);
                }
                else if (parentId === "00000000-0000-0000-0000-000000000001")
                {
                    return Observable.of(
                        [
                            { parentId: "00000000-0000-0000-0000-000000000001", id: "00000000-0000-0000-0000-000000000010", title: 'AA', content: 'AA content' },
                            { parentId: "00000000-0000-0000-0000-000000000001", id: "00000000-0000-0000-0000-000000000011", title: 'AB', content: 'AB content' },
                            { parentId: "00000000-0000-0000-0000-000000000001", id: "00000000-0000-0000-0000-000000000012", title: 'AC', content: 'AC content' }
                        ]);
                }
                else if (parentId === "00000000-0000-0000-0000-000000000002")
                {
                    return Observable.of([]);
                }
            }
        }

    let f: SuperFixture<TabsListComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule(
            {
                declarations:
                [
                    TabsListComponent,
                    EditableOnceComponent,
                    EditableValueComponent
                ],
                providers:
                [
                    Title,
                    { provide: TabsService, useValue: tabsServiceStub }
                ]
            })
            .compileComponents();
    }));

    beforeEach(inject([TabsService, Title], (service: TabsService, t: Title) =>
    {
        _service = service;

        f = new SuperFixture<TabsListComponent>(TabsListComponent);

        f.component.parentTab = null;

        f.DetectChanges();
    }));

    it('should start with initial tabs', () =>
    {
        expect(f.$('ul li', 'A')).toBeDefined();
        expect(f.$('ul li', 'B')).toBeDefined();
        expect(f.$('ul li', 'C')).toBeDefined();
        expect(f.$('ul li', '(+)')).toBeDefined('plus tab not found');
    });

    it('after click on tab should call onSelect', () =>
    {
        spyOn(f.component.onSelect, 'emit').and.callThrough();
      
        f.component.onSelect.subscribe((tab: Tab) =>
        {
            expect(tab.parentId).toBe(EmptyGuid);
            expect(tab.id).toBe("00000000-0000-0000-0000-000000000002");
            expect(tab.title).toBe('B');
            expect(tab.content).toBe('B content');
        });
 
        f.ClickLeft(f.$('ul li', 'B')); // tab A is initially selected
  
        expect(f.component.onSelect.emit).toHaveBeenCalled();
    });

    it('after click on tab A should load tabs AA, AB, AC and _ and (+)', () =>
    {
        f.ClickLeft(f.$('ul li', 'A'));

        expect(f.$('ul li', '_')).toBeDefined('parent content tab not found');
        expect(f.$('ul li', 'AA')).toBeDefined();
        expect(f.$('ul li', 'AB')).toBeDefined();
        expect(f.$('ul li', 'AC')).toBeDefined();
        expect(f.$('ul li', '(+)')).toBeDefined('plus tab not found');
    });

});