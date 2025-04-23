import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonBackButton,IonButton,IonItem,IonList,IonLabel} from '@ionic/angular/standalone';
import { gameService } from '../initialPage/game.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonBackButton,IonButton,IonItem,IonList,IonLabel],
})
export class ProfilePage {

  savedCount = 0;
  playedCount = 0;
  playingCount = 0;
//arrays to call game names in the profile page as well
  savedGames: any[] = [];
  playedGames: any[] = [];
  playingGames: any[] = [];

  constructor(private gameService: gameService) {}

  ngOnInit() {
    this.updateGameStats();
  }

  ionViewWillEnter() {
    this.updateGameStats(); // to insure its updated when user comes back
  }

  updateGameStats() {
    this.savedGames = this.gameService.getSavedGames();
    this.playedGames = this.gameService.getPlayedGames();
    this.playingGames = this.gameService.getPlayingGames();

    this.savedCount = this.savedGames.length;
    this.playedCount = this.playedGames.length;
    this.playingCount = this.playingGames.length;
  }
}
