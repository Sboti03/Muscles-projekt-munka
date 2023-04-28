# Mobil


## Letöltés

Klónozd a projektet a local repóba
    
    ~ cd .\mobile\
    ~ npm install

## Start development server

+ Telefonon kapcsold be az 'adb debugging'-ot [*Többet róla itt](https://developer.android.com/tools/adb#Enabling)

Androidon töltsd le az 'Expo Go' applikációt, hogy csatlakozni tudj a fejlesztési szerverhez  
Szükséged lesz az '@expo/ngrok@^4.1.0' vagy újabb verziójára hogy használni tudd a 'tunnel' funkciót. `npm install` után automatikusan rá fog kérdezni.  
Kábelesen vagy wifi-n keresztül is lehet majd csatlakoznia  szerverre.

    ~ npm start
        
##### Kapcsolat létrehozása kábelen keresztül
+ Nyomd meg az 'a' gombot mikor aktív a terminál
+ Használd a  telefonodon lévő 'Expo Go' alkalmazás kameráját hogy beszkennelje a QR kódot 

##### Kapcsolat létrehozása wifin keresztül
+ Use your phone 'Expo Go' app's camera to scan the QR-code shown in the terminal   

Sikeres csatlakozás után a főoldalon meg kell jelenjen a projekt neve amire kattintva elérhetjük azt.

## Buildelés

#### Legkorábbi EAS CLI letöltése

    ~ npm install -g eas-cli

#### Belépés az Expo fiókunkba

    ~ eas login

#### Konfiguráció elvégzése

    ~ eas build:configure

#### Másold be az alábbiakat az eas.json fájlba

```
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {}
  }
}

``` 
#### Futtasd az alábbi parancsot

    ~ eas build -p android --profile muscles

