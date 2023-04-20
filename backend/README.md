

# Muslces backend
*Fejlesztői dokkumentáció*

## Fejlesztői környezet
A backend futtatásához a következők kellenek  
Windows rendszeren:

- [Postgres 15.1 vagy újabb](https://www.postgresql.org/download/)
- [Node js 18.16.0](https://nodejs.org/en/download)
- Nest js `npm install -g @nestjs/cli`
- Prisma client `npm install @prisma/client`
- Node env `npm install -g win-node-env`

Linux:
- [Postgres 15.1 vagy újabb](https://www.postgresql.org/download/)
- [Node js 18.16.0](https://nodejs.org/en/download)
- Nest js `npm install -g @nestjs/cli`
- Prisma client `npm install @prisma/client`

## Futtatás

### Tesztelés

A teszteléshez a backend mappában az `npm run test` parancsot kell lefuttatni.
Csak a fontosabb tesztek vannak megírva:
- **Auth** tesztek
- **User** tesztek
- **Food** tesztek

### Fejlesztés
Az adatbázis beállításához létre kell hozni egy egy új schemat **musclesdb** néven. A **.dev.env** fáljban lehet átírni az adatbázishoz szükséges felhasználó nevet és jelszót ami alapértelmezetten postgres, *Ezen alkalmazás adatbázis jelszava: pwd felhasználó neve: postgres*

Az egyszerűbb megoldás érdekében érdemes [dockert](https://www.docker.com/products/docker-desktop/) telepíteni és lefuttatni a következő parancsot:
```bash  
docker run --name postgresdb -p 5432:5432 -e POSTGRES_PASSWORD=pwd -d postgres  
```

Az adatbázis beállítása után a backend mappában az adatbázis schema integrálásához az `npm run push:dev` parancsot lehet használni, ezután alap adatok feltöltése érdekében az `npm run seed:dev` parancsokat kell lefuttatni.  
Ezek után már futtatható is az alkalmazás az `npm run start:dev` paranccsal.

### Production/Frontend fejlesztéshez

A backend mappában a `docker compose up --build` paranccsal el lehet indítani az egész backend alkalmazást és a **3000**-es porton el lehet érni.

### Google cloud

Google cloudon is van lehetőség futtatni, ehhez csak egy **ssh-kulcsot** kell generálni és beállítani a **Githubon**, illetve a **VM instance**-en és minden egyes push után a **main branchen** autómatikusan elindul az alkalmazás új buildje.

## Feljlesztéshez szükséges adatok
Az alkalmazás elindítása után megtekinthetőek a route-ok a [http://localhost:3000/api](http://localhost:3000/api) útvonalon.  
Vagy a jelenlegi [Linked](http://34.22.242.178:3000/api)

A teljesen működő alkalmazás megtekinthető a [http://34.22.242.178:3000/](http://34.22.242.178:3000/)

## Frontend backend összekapcsolás
A frontend buildelése után az dist mappában található fáljokat és mappákat a client mappába kell másolni és ezáltal egybe lehet futtatni a backendet és frontendet is.


## Autentikáció/Autorizáció

A backend **JWT tokeneket** használ a felhasználók jogosultságainak kezelésére, melyet vagy minden egyes kéréskor **Bearer tokenént** kell küldeni a fejlécben vagy böngésző használata során automatikusan a backend **eltárolja a sütikbe**.

Az **Access** és **Refresh** token **lejárati idejét**, illetve **secret**-ét a **.prod.env** **.dev.env** file-okban lehet beállítani


## Adatbázis

Az adatbázis sémaja a **prisma** mappában található **schema.prisma** fáljban található.
Vagy képként a következőképpen néz ki:

<img src="../musclesdb.png" alt="../muscles.png" style="width: 70%; height: 70%" >

## File struktúra

Néhány hasznos mappa a fejlesztés során.

```markdown  
├── src  
│ ├── MVC  
├── cleint  
│ ├── React build  
├── prisma  
│ ├── Adatbázis model  
│ ├── Seed file  
│ ├── Alap étel adatok CSV formátumban  
├── images  
│ ├── default  
│ │ ├── Két alap profilkép  
│ ├── Profileképek  
└── .gitignore  
```  

## Hasznos dokkumentációk
[Nestjs](https://docs.nestjs.com/)  
[Prisma](https://www.prisma.io/)  
[Docker](https://docs.docker.com/)
