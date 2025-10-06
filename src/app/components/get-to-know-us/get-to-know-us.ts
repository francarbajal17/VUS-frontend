import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-to-know-us',
  standalone: true,
  imports: [CommonModule],
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
