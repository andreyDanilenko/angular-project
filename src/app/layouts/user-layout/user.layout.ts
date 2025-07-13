import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.layout.component.html',
  styleUrls: ['./user.layout.component.css']
})
export class UserLayout {}
