

# Muslces Frontend
*Fejlesztői dokkumentáció*

## Fejlesztői környezet
A frontend futtatásához a következők kellenek  
Windows rendszeren:

- [Node js 18.16.0](https://nodejs.org/en/download)

## Futtatás
Futtatáshoz szükséges, hogy fusson a backend alkalmazás is!
A `frontend/vite.config.ts` fájlban lehet beállítani, hogy hol éri el a backendet.
```typescript
proxy: {  
// '/api': 'http://34.22.242.178:3000/'  //Google cloud backend
'/api': 'http://localhost:3000/' //Local backend
}
```

### Fejlesztés

A frontend mappában az `npm run dev` paranccsal futtatható a react alkalmazás.

## Több nyelvűség

A frontendben van lehetőség **saját szöveget/több** nyelvet hozzá adni.  A `public/locales` mappában található az **angol** szöveg **json** formátumban. Jelenleg csak a **leglényegesebb szövegek** *(hiba üzenet, profil adatok)* van benne.

## Frontend backend összekapcsolás

Az `npm run build` paranccsal lehet egy buildet készíteni a frontendből. Majd a dist mappában található minden mappát és fájlt kell átmásolni a backendbe.


## Hasznos dokkumentációk
[Vite](https://vitejs.dev/guide/)  
[React](https://www.w3schools.com/REACT/DEFAULT.ASP)  
