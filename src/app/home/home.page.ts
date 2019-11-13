import { Component, OnInit } from '@angular/core';
import {Geolocation, GeolocationOptions} from '@ionic-native/geolocation/ngx';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

declare var tt:any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  tomtomMap:any;
  tomtomMapContainer:any;
  currentLocationMarker:any;
  currentLonLat=[0,0]
  markerOptions = {
    icon: tt.L.svgIcon({
        icon: {
            icon: 'fa fa-camera',
            iconSize: [32, 37],
            iconAnchor: [16, 2],
            style: {
                color: '#fff'
            },
            noPlainSVG: true
        }
    })
};
  constructor(private geoLocation:Geolocation) {}
  

  ngOnInit(){
    this.geoLocation.getCurrentPosition()
    .then((position)=>{
      this.currentLonLat=[position.coords.longitude,position.coords.latitude];
    }).catch((error)=>{
      console.log(error);
    });
    var options:GeolocationOptions = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 0
    };

    this.geoLocation.watchPosition(options).subscribe((position)=>{
      if(!(position.coords===undefined)){
        this.currentLonLat=[position.coords.longitude,position.coords.latitude];
        this.updateCurrentpositionMarker(); 
      }
    })
  }


  ionViewDidEnter(){   
   let mapPromise=new Promise((resolve,reject)=>{
      this.loadMap();
      resolve(this.tomtomMap);
    });
    
    mapPromise.then((map)=>{this.putCurrentpositionMarker(map)});

  }

  
  loadMap(){
    this.tomtomMapContainer=document.getElementById("tomtomMapContainer");
    //console.log(this.tomtomMapContainer);
    this.tomtomMap = tt.map({
      key: 'zBAUYdIZ2oBB0iFrMlD1pu3ZZIIxGvB2',
      container: this.tomtomMapContainer,
      style: 'tomtom://vector/1/basic-main',
      zoom:15,
      center:this.currentLonLat
    })
  }
  
  putCurrentpositionMarker(map){
        this.currentLocationMarker=new tt.Marker().setLngLat(this.currentLonLat).addTo(map);
  }

  updateCurrentpositionMarker(){
    if(!(this.currentLocationMarker===undefined)){
      this.currentLocationMarker.setLngLat(this.currentLonLat);
      
    }
  }

  recenterMap(){
    this.geoLocation.getCurrentPosition()
    .then((position)=>{
      this.currentLonLat=[position.coords.longitude,position.coords.latitude];
      let cameraOptions={
        center:this.currentLonLat,
        zoom:15
      }
      this.tomtomMap.jumpTo(cameraOptions);
    }).catch((error)=>{
      console.log(error);
    });
    
  }






}






