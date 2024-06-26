import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem, IonGrid, IonCol, IonRow, IonButton, IonImg, IonText, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library-workout-list',
  templateUrl: './library-workout-list.page.html',
  styleUrls: ['./library-workout-list.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonLabel, IonItem, IonGrid, IonCol, IonRow, IonButton, IonImg, IonText, IonCard, IonCardHeader, IonCardContent, IonCardTitle]
})
export class LibraryWorkoutListPage implements OnInit {
  workouts: any;
  type: any;
  workoutType: any;
  hideWorkoutStats: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    const url = `https://jsonblob.com/api/jsonBlob/1237078231554580480`;
    this.http.get(url).subscribe(
      (data: any) => {
        this.type = history.state.type;
        switch (this.type) {
          case 0:
            this.workouts = data.workouts.strength;
            this.workoutType = "Strength";
            break;
          case 1:
            this.workouts = data.workouts.cardiovascular;
            this.workoutType = "Cardiovascular";
            this.hideWorkoutStats = true;
            break;
          case 2:
            this.workouts = data.workouts.flexibility;
            this.workoutType = "Flexibility";
            this.hideWorkoutStats = true;
            break;
          default:
            console.error('Invalid workout type');
        }
        console.log(this.workouts);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );


  }
  exploreWorkout(workout: any) {
    this.router.navigate(['/library/details'], { state: { workout } });
  }
  back() {
    history.back();
  }
}
