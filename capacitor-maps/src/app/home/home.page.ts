import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;

  constructor(private modalCtrl: ModalController) {}

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.mapsKey,
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
    await this.addMarkers();
  }

  async addMarkers() {
    const markers: Marker[] = [
      {
        coordinate: {
          lat: 33.7,
          lng: -117.8,
        },
        title: 'localhost',
        snippet: 'Best place on earth',
      },
      {
        coordinate: {
          lat: 33.7,
          lng: -117.2,
        },
        title: 'random place',
        snippet: 'Not sure',
      },
    ];

    const result = await this.map.addMarkers(markers);

    this.map.setOnMarkerClickListener(async (marker) => {
      const modal = await this.modalCtrl.create({
        component: ModalPage,
        componentProps: {
          marker,
        },
        breakpoints: [0, 0.3],
        initialBreakpoint: 0.3,
      });
      modal.present();
    });
  }
}
