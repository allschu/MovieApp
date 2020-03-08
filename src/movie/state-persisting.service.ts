import { Injectable } from '@angular/core';
import { GridSettings } from './models/gridSettings';

@Injectable({
  providedIn: 'root'
})
export class StatePersistingService {

  public get<T>(token: string): T {
    const settings = localStorage.getItem(token);
    return settings ? JSON.parse(settings) : settings;
  }

  public set<T>(token: string, gridConfig: GridSettings): void {
    localStorage.setItem(token, JSON.stringify(gridConfig));
  }
}
