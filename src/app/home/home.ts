import { Component } from '@angular/core';
import { Header } from '../components/header/header';
import { Hero } from '../components/hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Hero],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
