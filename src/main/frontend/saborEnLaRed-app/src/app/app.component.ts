import { Component } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import {TopBarComponent} from "./components/top-bar/top-bar.component";
import {FooterComponent} from "./components/footer/footer.component";
import { SpinnerComponent } from './components/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, FooterComponent, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent {
  title = 'saborEnLaRed-app';
}

