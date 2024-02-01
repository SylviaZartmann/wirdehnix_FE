import {
  AfterViewInit,
  Component,
  ElementRef,
  Injectable,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-videopage',
  standalone: true,
  templateUrl: './videopage.component.html',
  styleUrl: './videopage.component.scss',
  imports: [CommonModule, RouterLink, HttpClientModule],
  providers: [{ provide: HttpClient, useClass: HttpClient }],
})
export class VideopageComponent implements OnInit, AfterViewInit {
  httpClient = inject(HttpClient);
  data: any = [];

  categories: string[] = ['Fiction', 'Horror', 'Documentary'];

  token: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    const URL = 'https://siehstehnix.sylviazartmann.de/filmography/'; //'https://last-airbender-api.fly.dev/api/v1/characters'
    this.token = localStorage.getItem('token'); // localStorage in Service auslagern
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.token}`,
    });
    this.httpClient
      .get<string>(URL, { headers }) //
      .subscribe((fetchedData: any) => {
        this.data = fetchedData;
      });
  }


  // Video Pause
  @ViewChildren('videoElement') videoElements!: QueryList<
    ElementRef<HTMLVideoElement>
  >;

  videos: HTMLVideoElement[] = [];
  ngAfterViewInit(): void {
    this.videos = this.videoElements.map(
      (videoElement) => videoElement.nativeElement
    );
    this.videos.forEach((video) => {
      video.addEventListener('play', () => this.pauseOtherVideos(video));
    });
  }

  pauseOtherVideos(targetVideo: HTMLVideoElement): void {
    this.videos.forEach((video) => {
      if (video !== targetVideo) {
        video.pause();
      }
    });
  }
}
