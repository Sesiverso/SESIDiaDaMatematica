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

// Pegar parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const nomePartida = urlParams.get("nome");
const nomeJogador = urlParams.get("jogador");

// Atualizar título da partida
document.getElementById("titulo-partida").innerText = `Partida: ${nomePartida}`;

// Adicionar jogador à partida
if (nomeJogador) {
    const partidaRef = ref(db, "partidas/" + nomePartida + "/jogadores");

    get(partidaRef).then(snapshot => {
        const jogadores = snapshot.val() || {};
        if (Object.keys(jogadores).length >= 3) {
            alert("A partida já está cheia!");
            window.location.href = "index.html";
            return;
        }

        jogadores[nomeJogador] = { nome: nomeJogador };
        set(partidaRef, jogadores);
    });
}

// Atualizar lista de jogadores em tempo real
const listaJogadores = document.getElementById("lista-jogadores");

onValue(ref(db, "partidas/" + nomePartida + "/jogadores"), snapshot => {
    listaJogadores.innerHTML = "";
    snapshot.forEach(childSnapshot => {
        const li = document.createElement("li");
        li.innerText = childSnapshot.val().nome;
        listaJogadores.appendChild(li);
    });
});
