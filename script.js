
let inputTexto = document.querySelector(".input-texto");
let traducaoTexto = document.querySelector(".traducao");
let idioma = document.querySelector(".idioma");
let deidioma = document.querySelector(".deidioma");
let botaoTraduzir = document.querySelector(".btn-traduzir");
let botaoMicrofone = document.querySelector(".btn-microfone");

const idiomasVoz = {
    pt: "pt-BR",
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    it: "it-IT",
    ru: "ru-RU",
    ja: "ja-JP",
    ar: "ar-SA",
    "zh-CN": "zh-CN"
};


// 2️⃣ Eventos
botaoTraduzir.addEventListener("click", traduzir);
botaoMicrofone.addEventListener("click", ouvirVoz);

// 3️⃣ Funções
async function traduzir() {
    let texto = inputTexto.value.trim();

    if (!texto) {
        traducaoTexto.textContent = "Digite um texto para traduzir.";
        return;
    }

    let url =
        "https://api.mymemory.translated.net/get?q=" +
        encodeURIComponent(texto) +
        "&langpair=" +
        deidioma.value +
        "|" +
        idioma.value;

    let resposta = await fetch(url);
    let dados = await resposta.json();

    traducaoTexto.textContent = dados.responseData.translatedText;
}

function ouvirVoz() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Reconhecimento de voz não suportado neste navegador.");
        return;
    }

    let reconhecimentoVoz = new SpeechRecognition();

    // 🔥 idioma escolhido no select de origem
    let idiomaSelecionado = deidioma.value;
    reconhecimentoVoz.lang = idiomasVoz[idiomaSelecionado] || "pt-BR";

    reconhecimentoVoz.onresult = (evento) => {
        let textoTranscricao = evento.results[0][0].transcript;
        inputTexto.value = textoTranscricao;
        traduzir();
    };

    reconhecimentoVoz.start();
}
