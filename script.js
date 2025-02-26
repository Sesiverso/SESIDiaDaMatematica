// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB5kZ3SHZnae5Heex5q0zW0L02DKXoZ1fk",
    authDomain: "diamatematicasesi.firebaseapp.com",
    databaseURL: "https://diamatematicasesi-default-rtdb.firebaseio.com/",
    projectId: "diamatematicasesi",
    storageBucket: "diamatematicasesi.appspot.com",
    messagingSenderId: "458293115437",
    appId: "1:458293115437:web:8850092cc196df91c416a4",
    measurementId: "G-RFJ2ET31WX"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Criar uma nova partida e redirecionar
window.criarPartida = function() {
    const nomePartida = prompt("Digite o nome da partida:");
    if (!nomePartida) return;

    const partidaRef = ref(db, "partidas/" + nomePartida);
    set(partidaRef, {
        jogadores: {},
        status: "aguardando"
    }).then(() => {
        window.location.href = `partida.html?nome=${encodeURIComponent(nomePartida)}`;
    });
};

// Entrar em uma partida e redirecionar
window.entrarPartida = function(nomePartida) {
    const nomeUsuario = prompt("Digite seu nome de jogador:");
    if (!nomeUsuario) return;

    window.location.href = `partida.html?nome=${encodeURIComponent(nomePartida)}&jogador=${encodeURIComponent(nomeUsuario)}`;
};

// Listar partidas disponíveis
function listarPartidas() {
    const lista = document.getElementById("lista-partidas");
    
    onValue(ref(db, "partidas"), snapshot => {
        lista.innerHTML = "";
        snapshot.forEach(partidaSnapshot => {
            const nomePartida = partidaSnapshot.key;

            const btn = document.createElement("button");
            btn.innerText = nomePartida;
            btn.onclick = () => entrarPartida(nomePartida);
            lista.appendChild(btn);
        });
    });
}

// Carregar lista de partidas ao abrir a página
document.addEventListener("DOMContentLoaded", listarPartidas);
tring(36).substr(2, 9);
}

// Carregar lista de partidas ao abrir a página
document.addEventListener("DOMContentLoaded", listarPartidas);
