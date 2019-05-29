# CODEBT

## Descriere

Aplicatia implica in principal o componenta / modul de web scrapping, ce va prelua date, dintr-o lista de url-uri ce contin informatii despre "alerte de securitate", date ce vor trebui mai apoi parsate pentru afisare. 
Daca datele provenite de la 2 url-uri sunt similare ( Anumite campuri identice ), atunci inseamna ca datele respective sunt despre acelasi lucru, si nu va mai fi afisat din nou decat daca se determina ca sursa noua gasita contine date mai utile ( mai detaliate, putand insemna o metoda de reproducere ale acelei probleme mai extinsa sau o descriere cu mai mult text  in cazul in care se respecta anumite conditii ). 
 
Ca si functionalitate suplimentara, pe langa informarea la nivel de pagina a utilizatorului, aplicatia va avea si o componenta / un modul  ce va notifica utilizatorul de alerte noi ce apartin de o categorie la care acesta sa abonat si posibilitatea de a posta noi alerte de securitate . 
Pentru evitarea unui sistem de notificari care sa supraincarce utilizatorul pentru ca acesta sa fie notificat despre solutii referitoare al o problema, acesta trebuie sa se aboneze la problema respectiva prin apasarea unui buton "watch". 
 
** Tipuri utilizatori **

**Default user** 
- Vizualizarea alertelor
- Vizualizarea solutiilor
- Filtrarea alertelor
- Abonarea la o categorie de alerte
- Utilizarea butonului de watch pt o anumita alerta 
- Managementul profilului personal
- Reportarea unei alerte de securitate in cazul in care este gresita 
- Comentarea unei alerte de securitate
- Vizualizarea profilurilor publice ale altor utilizatori precum si postarile acestora daca sunt Advanced users 
- Aceptarea notificarilor trimise legate de abonamente 
 
**Advanced user**
- *Default user
- Postarea unei alerte de securitate, precum si stergerea sau editarea sa 
- Postarea unei solutii precum si stergerea sau editarea sa
- Verificarea rapoartelor oferite de utilizatori referitor la greseli si confirmarea lor ca si commituri pe pagina 
 
**Administrator**
- *Advanced user
- Stergerea unui alerte indiferent de cine a postat alerta 
- Restrictionarea acesului unui tilizator la pagina 
- Schimbarea tipului unui utilizator
- Adaugarea de surse pt web scrapping si parsalrea lor

##Tehnologii utilizate

- Nodejs
Un mediu de executie oen-source, multiplatforma, care permite dezvoltatorilor sa creeze tot felul de instrumente si aplicatii in JavaScript. 
Mediul de executie este destinat utilizarii in afara contextului unui browser ( adica rularea directa pe un server ). Astfel, mediul omite API-urile specifice JavaScript si aduce suport pentru API-urile ce tim de sistemul de operare cum ar fi suport pentru HTTP si bibliotecile destinate sistemului de fisiere. 
 
 
 
- Firebase - DB
Baza de date firebase este o baza de date hostata intrun cloud. Este NoSQL si iti permite sa stochezi si sa sincronizezi datele intre useri in timp real 
[sursa](https://firebase.google.com/products/realtime-database/)

##Module necesare

- Web scrapper
- Auth
- Search
- Notification
- Serve-static
- Live data update
- altele

##Descriere module

**1. Web scrapper 100%**
 
Modulul presupune un request la un anumit url ce va returna un obiect cu date despre pagina respectiva precum si fisierul html in sine. 
Pentru ca modulul sa fie util acesta are nevoie de o functionalitate request-prommise ce se va asigura ca actiunile ce necesita un set de date de la modul nu se vor lansa pana la primirea si parsarea datelor. 
Partea de request a modulului poate fi implementata cu metoda http.get(options,callback) din nodejs. 
Cum requesturile sunt niste GER-uri fara body, node are aceasta metoda care are ca si diferenta faptul ca seteaza metoda la get si apeleaza req.end() automat. 
 
```
var options = {
  host: 'www.google.com',
  port: 80,
  path: '/index.html'
};
 
http.get(options, function(res) {
  console.log("Got response: " + res.statusCode); 
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
```

[sursa](https://nodejs.org/docs/v0.4.7/api/all.html#http.get) 
 
Pe langa aceasta posibilitate nodejs, mai ofera inca o metoda numita http.request(), ce foloseste o alta metoda numita agent ce se ocupa de managementul conexiunilor multiple http. In mod normal instantele acestui agent nu ar trebui sa fie disponibile utilizatorului ca si cod, dar in anumite situatii poate fi util sa ii poti verifica statusul 
 
Deasemenea pe langa toate astea exista si metoda in care se poate utiliza modulus 'fs' din nodejs ce va considera pagina web ca un fisier html intern si il va returna ca atare. 
 
Partea de parsare a modulului va fi insa doar o functie, ce primeste ca parametrii, o lista de taguri in care se afla elementele pe care le dorim returnate, pe care le vom avea mai apoi parsate intr-un obiect cu datele corespunzatoare diagramei UML

**2.Auth - 100%**
 
Modul de autentificare, trimite la server un obiect cu datele necesare pentru validare, si returneaza inapoi un obiect cu erori, si un obiect ce contin date despre utilizator daca datele sunt corecte. Acest lucru se va intampla atat pentru login cat si pentru register. Datele necesare validarii de afla in diagrama uml.

**3. Search - 0%**
 
Modulul va primi un string pe care il va parsa intro lista de cuvinte, ce vor fi comparate cu date relevante ale obiectelor din baza de date. Obiectele care au cat mai multe similaritati cu stringul initial primit vor fi returnate primele, urmand mai apoi ca obiectele cu mai putine similaritati sa fie returnate mai la final. Obiectele fara date similare vor fi omise, pentru a nu incurca utilizatorul.

**4. Notification 0%**
 
Modulul va trimite nortificari utilizatorului la adaugarea obiectelor noi in baza de date care corespun unor criterii la care acesta este abonat. 
[exemplu](https://www.npmjs.com/package/node-pushnotifications)

**5. Serve static 100%**
 
Modulul serveste fisiere statice utilizatorului, fisiere aflate pe server ( ex : logo, images, css , js ) cand acesta intra pe o ruta cu 
"/file..." in fata rutei.
modulul foloseste modulul 'fs' deja prezent in nodejs ce ofera utilizatorului functii de citire si editare a fisierelor.

#Use case general
 
 
Un utilizator vine pe pagina principala, se trimite un request la server si se afiseaza o lista cu cele mai noi alerte de securitate. 
Acesta are posibilitatea de a apasa pe un item pentru a fi redirectat la o noua pagina ce va returna un obiect mai detaliat leagt despre acea alerta de securitate precum si informatii legate de solutii propuse 
Utilizaatorul apasa butonul watch pentru a fi notificat daca apar schimbari in legatura cu alerta respectiva ( ex se adauga o solutie, sau problema a fost patchuita) 
De asemenea acesta poate apasa butonul de subscribe care va inregistra o categorie, un user, sau un tip de eraore in baza de date, la obiectul personal al utilizatorului, pentru a primi notificari despre acea categorie 
