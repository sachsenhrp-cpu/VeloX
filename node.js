const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Sorgt dafür, dass Node.js Formulardaten lesen kann
app.use(express.urlencoded({ extended: true }));

// Macht deinen Ordner (mit der style.css und index.html) für den Browser verfügbar
app.use(express.static(__dirname));

// Wenn jemand die Startseite aufruft, zeige die index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// HIER werden die Daten verarbeitet, wenn jemand auf "Registrieren" klickt
app.post('/register', (req, res) => {
    const spielerName = req.body.username;
    const passwort = req.body.password;

    // Hier könnte man die Daten später in einer Datenbank speichern.
    console.log(`Neuer Spieler registriert: ${spielerName}`);

    // NACH der Registrierung: Weiterleitung auf die nächste Seite (z.B. erfolg.html)
    res.redirect('/erfolg.html'); 
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft! Klicke auf den Link im Terminal oder öffne Port ${PORT}`);
});