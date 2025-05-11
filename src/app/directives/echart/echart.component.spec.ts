
import { EchartComponent } from './echart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('EchartComponent', () => {
    let component: EchartComponent;
    let fixture: ComponentFixture<EchartComponent>;
    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientModule,
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
            ],
            declarations: [
                EchartComponent,
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(EchartComponent);
        component = fixture.componentInstance;
        component.chartId = "Payment-bar-chart"
        component.chartOption = { title: { text: 'Test Chart' } };

        const chartElement = document.createElement('div');
        chartElement.id = 'Payment-bar-chart';
        spyOn(document, 'getElementById').and.returnValue(chartElement);
    });
})
