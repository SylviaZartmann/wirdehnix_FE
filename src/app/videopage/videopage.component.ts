import { Component } from '@angular/core';
import { CategoryComponent } from "./category/category.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-videopage',
    standalone: true,
    templateUrl: './videopage.component.html',
    styleUrl: './videopage.component.scss',
    imports: [CommonModule, RouterLink, CategoryComponent]
})
export class VideopageComponent {

}
