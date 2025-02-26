// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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

// Criar uma nova partida
window.criarPartida = function() {
    const nomePartida = prompt("Digite o nome da partida:");
    if (!nomePartida) return;

    const partidaRef = ref(db, "partidas/" + nomePartida);
    set(partidaRef, {
        jogadores: {},
        status: "aguardando"
    }).then(() => {
        alert("Partida criada!");
    }).catch(error => {
        console.error("Erro ao criar partida:", error);
    });
};

// Entrar em uma partida
window.entrarPartida = function(nomePartida) {
    const nomeUsuario = prompt("Digite seu nome de jogador:");
    if (!nomeUsuario) return;

    const partidaRef = ref(db, "partidas/" + nomePartida + "/jogadores");

    get(partidaRef).then(snapshot => {
        const jogadores = snapshot.val() || {};
        if (Object.keys(jogadores).length >= 3) {
            alert("A partida já está cheia!");
            return;
        }

        const userId = gerarIdUnico();
        jogadores[userId] = { nome: nomeUsuario };

        set(partidaRef, jogadores);
    });
};

// Listar partidas disponíveis
function listarPartidas() {
    const lista = document.getElementById("lista-partidas");
    
    onValue(ref(db, "partidas"), snapshot => {
        lista.innerHTML = "";
        snapshot.forEach(partidaSnapshot => {
            const nomePartida = partidaSnapshot.key;
            const partida = partidaSnapshot.val();

            if (Object.keys(partida.jogadores || {}).length < 3) {
                const btn = document.createElement("button");
                btn.innerText = nomePartida;
                btn.onclick = () => entrarPartida(nomePartida);
                lista.appendChild(btn);
            }
        });
    });
}

// Gerar um ID único
function gerarIdUnico() {
    return Math.random().toString(36).substr(2, 9);
}

// Carregar lista de partidas ao abrir a página
document.addEventListener("DOMContentLoaded", listarPartidas);
