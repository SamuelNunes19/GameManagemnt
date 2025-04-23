import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class gameService {
  private _storage: Storage | null = null;

 

  private savedGames = new BehaviorSubject<any[]>([]);
  savedGames$ = this.savedGames.asObservable();

  toggleSaveGame(game: any) {
     // Get the current list of saved games
    const current = this.savedGames.value;
    //checking if the game is saved or not by its id 
    const exists = current.find(g => g.id === game.id);

    let updated;

     if (exists) {
    updated = current.filter(g => g.id !== game.id);
  } else {
    updated = [...current, game];
  }

  this.savedGames.next(updated);
  this.updateStorage('savedGames', updated); 

  }

  getSavedGamesCount(): number {
    return this.savedGames.value.length;
  }

  getSavedGames(): any[] {
    return this.savedGames.value;
  }


  private playedGames = new BehaviorSubject<any[]>([]);
  playedGames$ = this.playedGames.asObservable();

  togglePlayedGames(game:any){
    const current = this.playedGames.value;

    const exists = current.find(g=>g.id === game.id);

   let updated;

     if (exists) {
    updated = current.filter(g => g.id !== game.id);
  } else {
    updated = [...current, game];
  }

  this.playedGames.next(updated);
  this.updateStorage('playedGames', updated); 
  }

    getPlayedGamesCount(): number {
      return this.playedGames.value.length;
    }

    getPlayedGames(): any[] {
      return this.playedGames.value;

    }


    private playingGames = new BehaviorSubject<any[]>([]);
    playingGames$ = this.playingGames.asObservable();

    togglePlayingGames(game:any){
      const current = this.playingGames.value;

      const exists = current.find(g=> g.id === game.id);

      let updated;

      if (exists) {
     updated = current.filter(g => g.id !== game.id);
   } else {
     updated = [...current, game];
   }
 
   this.playingGames.next(updated);
   this.updateStorage('playingGames', updated); 
    }

    getPlayingGamesCount(): number{
      return this.playingGames.value.length;
    }

    getPlayingGames(): any[]{
      return this.playingGames.value;
    }
  

  //go into this api and get back information
  private apiUrl = 'https://api.rawg.io/api/games?key=03f9f79f206e4537b46e87c556802c7f&page_size=50';

  constructor(private http: HttpClient) {
    this.init();
  }

  async init() {
    const storage = new Storage();
    this._storage = await storage.create();
    await this.loadFromStorage(); // Load existing data from local storage
  }

  private async loadFromStorage() {
    const saved = await this._storage?.get('savedGames');
    const played = await this._storage?.get('playedGames');
    const playing = await this._storage?.get('playingGames');
  
    if (saved) this.savedGames.next(saved);
    if (played) this.playedGames.next(played);
    if (playing) this.playingGames.next(playing);
  }
  
  private updateStorage(key: string, data: any[]) {
    this._storage?.set(key, data);
  }
  
//this fetches games from the api
  getGames(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}