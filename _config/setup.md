
## 🧩 Setup — Humania Project (Spring Boot + Angular)

---

## ⚙️ 1. Prérequis système

### Java & Maven

```bash
sudo apt update
sudo apt install openjdk-17-jdk maven -y
```

Vérifier :

```bash
java -version
mvn -v
```

### PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib -y
sudo service postgresql start
sudo -u postgres psql
```

Créer la base :

```sql
CREATE USER humania WITH PASSWORD 'humania123';
CREATE DATABASE humania_db OWNER humania;
\q
```

---

## 🌐 2. Environnement Angular

### Node.js & npm

```bash
sudo apt install nodejs npm -y
node -v
npm -v
```

### Angular CLI

```bash
sudo npm install -g @angular/cli
ng version
```

---

## 🧱 3. Installation du backend (Spring Boot)

### Étapes

1. Télécharger le projet depuis [https://start.spring.io](https://start.spring.io)

   * Spring Boot: `3.3.4`
   * Java: `17`
   * Dependencies: `Spring Web`, `Spring Data JPA`, `PostgreSQL Driver`, `Validation`, `Lombok`

2. Décompresser dans le dossier `Humania/backend`.

3. Vérifier :

   ```bash
   tree -L 2 backend
   ```

4. Configurer la base dans :

   ```
   backend/src/main/resources/application.properties
   ```

   Contenu :

   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/humania_db
   spring.datasource.username=humania
   spring.datasource.password=humania123
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
   server.port=8080
   ```

5. Démarrer :

   ```bash
   cd backend
   mvn spring-boot:run
   ```

   Tester : [http://localhost:8080/hello](http://localhost:8080/hello)

---

## 🖥️ 4. Installation du frontend (Angular)

### Étapes

1. Aller dans `frontend` :

   ```bash
   cd frontend
   ng new humania-ui --routing --style=css
   ```

   Réponses :

   ```
   Routing: Yes
   CSS: Yes
   SSR: No
   ```
2. Lancer :

   ```bash
   cd humania-ui
   ng serve
   ```

   Tester : [http://localhost:4200](http://localhost:4200)

---

## 🔗 5. Lien entre Angular et Spring Boot

Les deux communiquent via **API REST (HTTP + JSON)** :

```
Angular  ↔  Spring Boot  ↔  PostgreSQL
```

Exemple d’appel :

```typescript
this.http.get('http://localhost:8080/api/employes');
```

---

## ✅ 6. Vérification finale

| Service     | Port           | Vérification                    |
| ----------- | -------------- | ------------------------------- |
| Spring Boot | 8080 (ou 8081) | `http://localhost:8080/hello`   |
| Angular     | 4200           | `http://localhost:4200`         |
| PostgreSQL  | 5432           | `psql -U humania -d humania_db` |

