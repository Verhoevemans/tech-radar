import { Component } from '@angular/core';
import { AnalyzeComponent } from '../../components/analyze/analyze.component';

@Component({
  selector: 'radar-main',
  standalone: true,
  imports: [
    AnalyzeComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
