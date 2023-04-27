# Muslces Asztali Alkalmazás
Fejlesztői dokumentáció

## Alkalmazásról
JavaFX-ben írodott asztali alkalmazás, melynek célja, hogy admin funkciókat lásson el a projekt munka keretein belül.
Adminnak joga van ételek felvételére az adatbázisba, meglévő ételek módosítására, törlésére és annak visszavonására.
Ezen kívül blokkolhatja a web- és mobilalkalmazás felhasználóit is, illetve vissza állíthatja a fiókokat.

## Belépés
#### Admin felhasználónévvel és jelszóval történik:
- Felhasználónév: *`admin@muscles.com`*
- Jelszó: *`admin`*


## Futtatás – IntelliJ IDEA
#### Amit asztali alkalmazás futtatása előtt szükséges tenni Windows operációs rendszeren:

- A könnyebb futtatás érdekében a javasolt fejlesztői környezet: [Intellij IDEA](https://www.jetbrains.com/idea/download/#section=windows), JDK corretto-17.0.5 java verzióval telepítve.

#### Közvetlen a futtatás előtt:

- A futtatás előtt mindenképpen fusson a [backend](../backend/README.md). 
Az alkalmazást lehet futtatni helyi backend eléréssel és Google Cloud eléréssel. 


- Alapértelmezetten az alkalmazás a lokális backendet éri el, ez a beállítás a
`desktop/src/main/java/hu/muscles/desktop/urls/Urls.java` fáljban található, illetve módosítható:
```java
// Lokális backend elérése:
private String BASE_URL() {
      return "http://localhost:3000"; // Local backend
   // return "http://34.22.242.178:3000"; // Google Cloud backend
}
```
```java
// Google Cloud backend elérése:
private String BASE_URL() {
   // return "http://localhost:3000"; // Local backend
      return "http://34.22.242.178:3000"; // Google Cloud backend
}
```

#### Alkalmazás indítása:
- A `desktop` mappát célszerű új Intellij IDEA projektként megnyitni, és az `src/main/java/hu/muscles/desktop/App.java` fáljt kiválasztva, a run gombra kattintva elindítható az alkalmazás.


## Futtatás – Telepítővel

Az alkalmazás futtatható úgy is, hogy előtte lefuttatjuk a `desktop/out/installer/muscles-admin-app-installer.exe` fájlt, amely feltelepíti az alkalmazást a számítógépünkre.

## Felhasználói Dokumentáció
[Ide kattintva olvashatja el.](./desktop-user-documentation/README.md)

## Hasznos dokkumentáció
[JavaFX](https://openjfx.io/)
