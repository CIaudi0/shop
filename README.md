# Shop – E-commerce Full Stack (Rails 8 + Angular 17 + Docker)

Piattaforma e-commerce sviluppata con architettura separata frontend/backend, containerizzata tramite Docker e configurata con Continuous Integration.

Il progetto include:

* Backend API REST in Ruby on Rails 8
* Frontend Single Page Application in Angular 17
* Database PostgreSQL 16
* Orchestrazione tramite Docker Compose
* Testing automatizzato
* Pipeline CI con GitHub Actions

---

## Architettura

Il sistema è composto da tre servizi:

* **db** → PostgreSQL 16
* **backend** → Rails 8 API-only (porta 3000)
* **frontend** → Angular 17 (porta 4200)

La comunicazione tra frontend e backend avviene tramite API REST.
L’autenticazione è basata su sessioni e cookie HttpOnly.

---

## Requisiti

Per eseguire il progetto è necessario avere installato:

* Docker
* Docker Compose (incluso nelle versioni recenti di Docker Desktop)

Non è necessario installare Ruby, Node o PostgreSQL localmente.

---

## Avvio rapido

Clonare la repository:

```bash
git clone https://github.com/CIaudi0/shop.git
cd shop
```

Avviare l’intero ambiente:

```bash
docker compose up --build -d
```

Il sistema sarà disponibile su:

* Frontend: [http://localhost:4200](http://localhost:4200)
* Backend API: [http://localhost:3000](http://localhost:3000)

---

## Configurazione iniziale del database

Dopo il primo avvio è necessario eseguire le migrazioni:

```bash
docker compose exec backend bin/rails db:migrate
```

Per caricare dati di esempio (utenti e prodotti preimpostati):

```bash
docker compose exec backend bin/rails db:seed
```

Questo comando popola il database con:

* Utente amministratore
* Utente cliente
* Prodotti dimostrativi

---

## Comandi utili

### Accedere alla shell del backend

```bash
docker compose exec backend /bin/bash
```

### Accedere alla shell del frontend

```bash
docker compose exec frontend /bin/sh
```

### Visualizzare i log in tempo reale

```bash
docker compose logs -f
```

### Arrestare e pulire l’ambiente

```bash
docker compose down --remove-orphans
```

### Importare i moduli in VsCode

```bash
docker cp $(docker compose ps -q frontend):/app/node_modules ./frontend/
```

---

## Testing

### Backend (Rails + Minitest)

Per eseguire i test in modo isolato:

1. Arrestare eventuali container:

```bash
docker compose down --remove-orphans
```

2. Avviare solo il database:

```bash
docker compose up -d db
```

3. Preparare il database di test:

```bash
docker compose run --rm -e RAILS_ENV=test backend bin/rails db:test:prepare
```

4. Eseguire i test:

```bash
docker compose run --rm -e RAILS_ENV=test backend bin/rails test
```

Il backend utilizza:

* Minitest
* SimpleCov per analisi copertura

---

### Frontend (Angular + Karma + Jasmine)

I test frontend vengono eseguiti in modalità headless (ChromeHeadlessCI), compatibile con ambiente Docker.

Per eseguire i test dal container frontend:

```bash
docker compose exec frontend npx ng test --watch=false --browsers=ChromeHeadlessCI --code-coverage
```

```bash
docker compose exec -u root frontend npm install ...
```

---

## Autenticazione

Il sistema utilizza:

* Autenticazione stateful
* Sessioni server-side
* Cookie HttpOnly
* Controllo ruoli (admin / customer)

Le richieste dal frontend includono automaticamente le credenziali grazie a un HTTP Interceptor configurato con `withCredentials: true`.

---

## Area Amministrativa

Le funzionalità amministrative sono disponibili solo per utenti con ruolo `admin`.

Permettono di:

* Creare prodotti
* Modificare prodotti
* Eliminare prodotti

Le autorizzazioni vengono verificate lato backend.

---

## Continuous Integration

Il progetto include una pipeline GitHub Actions:

`.github/workflows/ci.yml`

Ad ogni push:

* Viene ricostruito l’ambiente
* Viene avviato PostgreSQL
* Vengono eseguite migrazioni
* Vengono lanciati tutti i test

Questo garantisce stabilità del ramo principale.

---

## Struttura del progetto

```
shop/
├── .github/
│   └── workflows/
│       └── ci.yml                 ← Pipeline GitHub Actions
├── backend/
│   ├── app/
│   │   ├── controllers/           ← Controller Rails (API)
│   │   ├── models/                ← Modelli ActiveRecord
│   │   └── ...
│   ├── config/
│   │   ├── routes.rb              ← Rotte API
│   │   └── database.yml           ← Configurazione DB
│   ├── db/
│   │   ├── migrate/               ← Migrazioni database
│   │   └── seeds.rb               ← Dati di esempio
│   ├── test/                      ← Test Minitest
│   ├── Gemfile                    ← Dipendenze Ruby
│   └── Dockerfile                 ← Immagine Docker backend
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/        ← Componenti Angular
│   │   │   ├── services/          ← Servizi HTTP
│   │   │   └── interceptors/      ← HTTP Interceptor (credenziali)
│   │   └── ...
│   ├── package.json               ← Dipendenze Node/Angular
│   ├── karma.conf.js              ← Configurazione test frontend
│   └── Dockerfile                 ← Immagine Docker frontend
├── docker-compose.yml             ← Orchestrazione 3 servizi
└── README.md
```

