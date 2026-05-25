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
    res.redirect('/home.html'); 
});


const express = require('express');
const path = require('path');
const BrawlStarsAPI = require("brawlstars-api-nodejs");

const app = express();
const PORT = 3000;

// Hier ist dein funktionierender API-Token fest hinterlegt
const client = new BrawlStarsAPI("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImJhOTA5YmVlLTYxNzUtNDM0OS05YzA0LTBjY2I1YTY2N2E2YyIsImlhdCI6MTc3OTc1MTUyOSwic3ViIjoiZGV2ZWxvcGVyLzA2MzNhNDYxLTNkZDctNDVkYS01NTBkLWE5NWVhZGM4NjkwYSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMC4wLjAuMCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.y1YVkFBo6niwumA1rg_BpMHVusjnPl2G26fVcTXfyW_eT5Q_e3qZN6JS-Dv26jTm-3MtS2XT3i1cwnSYQteLsA");

// Erlaubt es Node.js, die Daten aus deinem HTML-Formular zu lesen
app.use(express.urlencoded({ extended: true }));

// Stellt sicher, dass CSS-Dateien und Bilder aus dem Ordner geladen werden können
app.use(express.static(__dirname));

// Startseite anzeigen (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Verarbeitung der Registrierung und API-Prüfung
app.post('/register', async (req, res) => {
    let spielerTag = req.body.username; // Holt den Tag aus dem Eingabefeld
    const passwort = req.body.password;

    // Falls das "#" vom Spieler vergessen wurde, fügen wir es hinzu
    if (!spielerTag.startsWith('#')) {
        spielerTag = '#' + spielerTag;
    }

    // Macht den Tag komplett in Großbuchstaben, da die API das so braucht
    spielerTag = spielerTag.toUpperCase();

    try {
        // Fragt die Live-Daten bei der Brawl Stars API ab
        const player = await client.player(spielerTag);
        
        // Zeigt dir im Terminal an, wer sich gerade registriert hat
        console.log(`Erfolgreich verifiziert! Ingame-Name: ${player.name}`);
        
        // Weiterleitung auf deine neue Seite nach erfolgreicher Prüfung
        res.redirect('/Home.html');

    } catch (error) {
        // Falls der Tag falsch eingegeben wurde oder die API offline ist
        console.error("Fehler bei der API-Abfrage:", error);
        res.send(`
            <div style="text-align: center; margin-top: 50px; font-family: Arial, sans-serif;">
                <h1 style="color: red;">Spieler nicht gefunden!</h1>
                <p>Der Brawl Stars Tag <strong>${spielerTag}</strong> existiert nicht.</p>
                <a href="/" style="color: #537a7a; font-weight: bold;">Zurück zum Formular</a>
            </div>
        `);
    }
});

// Startet den Server
app.listen(PORT, () => {
    console.log(`Der Server läuft! Bitte öffne Port ${PORT} in deinen Codespaces.`);
});
// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft! Klicke auf den Link im Terminal oder öffne Port ${PORT}`);
});
