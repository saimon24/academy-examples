ionic start academyMaps blank --type=angular
cd ./academyMaps
 
npm i @capacitor/google-maps
npm i @capacitor/geolocation
 
ionic g page modal
 
ionic build
ionic cap add ios
ionic cap add android