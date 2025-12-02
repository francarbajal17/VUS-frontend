import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-get-to-know-us',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './get-to-know-us.html',
  styleUrl: './get-to-know-us.css',
})
export class GetToKnowUsComponent {
  @Input() leftImage: string = '/knowus1.webp';
  @Input() rightImage: string = '/knowus2.webp';
  @Input() title: string = 'GET TO KNOW VÜS';
  @Input() slogan: string = 'Wherever Whenever Always';
  @Input() logoSrc: string = '/blackLogo.png';
}
