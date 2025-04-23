import { Component,OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar,IonButtons,IonSearchbar,IonGrid,IonRow,IonCol,IonLabel, IonItem,IonList,IonCardHeader,IonCardTitle,IonCard, IonCardSubtitle,IonCardContent,IonButton,IonIcon} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { PlatformService } from './platform.service';
import { CommonModule } from '@angular/common';
import { gameService } from './game.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonAvatar,IonButtons,IonSearchbar,FormsModule,IonGrid,IonRow ,IonCol,IonLabel,IonItem,IonList,CommonModule,IonCardHeader,IonCardTitle,IonCard, IonCardSubtitle,IonCardContent,IonButton,RouterModule,IonIcon],
})
//Main controller
export class HomePage implements OnInit {

  //creates list of platform and games when the code fetches them
  platforms: any[] = [];
  games:any[] =[];
  playedGames: any[] = [];

  searchText: string = "";
  
//adding the 2 services into the main home page
  constructor(private platformService: PlatformService,
    public gameService: gameService) {}

    toggleSave(game: any){
      this.gameService.toggleSaveGame(game);
    }

    isGameSaved(game: any): boolean {
      return this.gameService.getSavedGames().some(g => g.id === game.id);
    }


    togglePlayed(game: any){
      this.gameService.togglePlayedGames(game);
    }

    isGamePlayed(game: any): boolean {
      return this.gameService.getPlayedGames().some(g => g.id === game.id);
    }

    togglePlaying(game: any){
      this.gameService.togglePlayingGames(game);
    }
    isPlayingGames(game: any):boolean{
      return this.gameService.getPlayingGames().some(g=>g.id=== game.id);
    }


// Getter for filtered games based on search
    get filteredGames(): any[] {
      if (!this.searchText) {
        return this.games;
      }
    
      const text = this.searchText.toLowerCase();
      return this.games.filter(game =>
        game.name.toLowerCase().includes(text)
      );
    }
    

  ngOnInit(): void {
    //get games from api and store in "games"
    this.gameService.getGames().subscribe((data:any) => {
      this.games =data.results;

    });

//get platform from api and store in "platforms"
    this.platformService.getPlatforms().subscribe({
      next: (data: any) => {
        this.platforms = data.results;
        console.log(this.platforms);
      },

      //if there is a error with fetching the data
      error: (err: any) => {
        console.error('Failed to fetch platforms:', err);
      }
    });
  }
}
