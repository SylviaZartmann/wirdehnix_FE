import { Component } from '@angular/core';
import { CategoryComponent } from "./category/category.component";

@Component({
    selector: 'app-videopage',
    standalone: true,
    templateUrl: './videopage.component.html',
    styleUrl: './videopage.component.scss',
    imports: [CategoryComponent]
})
export class VideopageComponent {

}
