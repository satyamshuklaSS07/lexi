const API = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const form = document.getElementById("form");
const input = document.getElementById("input");
const results = document.getElementById("results");

let timer;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const word = input.value.trim();

    if (word) {
        lookup(word);
    }
});

input.addEventListener("input", () => {
    clearTimeout(timer);

    const word = input.value.trim();

    if (word.length >= 3) {
        timer = setTimeout(() => {
            lookup(word);
        }, 600);
    }
});

document.querySelectorAll("[data-word]").forEach((button) => {
    button.addEventListener("click", () => {
        const word = button.dataset.word;

        input.value = word;
        lookup(word);
    });
});

async function lookup(word) {
    results.innerHTML = `
        <div class="state">
            <div class="loader"></div>
            <h2>Looking it up...</h2>
            <p>Fetching meanings and pronunciation.</p>
        </div>
    `;

    try {
        const response = await fetch(
            API + encodeURIComponent(word)
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("WORD_NOT_FOUND");
            }

            throw new Error("API_ERROR");
        }

        const data = await response.json();

        if (!data || !data[0]) {
            throw new Error("API_ERROR");
        }

        render(data[0]);

    } catch (error) {

        if (error.message === "WORD_NOT_FOUND") {
            results.innerHTML = `
                <div class="state">
                    <div style="font-size:45px">⌁</div>
                    <h2>"${escapeHTML(word)}" wasn't found</h2>
                    <p>Check the spelling and try another word.</p>
                </div>
            `;
        } else {
            results.innerHTML = `
                <div class="state">
                    <div style="font-size:45px">⚠</div>
                    <h2>Dictionary service is unavailable</h2>
                    <p>
                        The dictionary server is temporarily not responding.
                        Please try again later.
                    </p>
                </div>
            `;
        }
    }
}

function render(data) {

    const phonetic =
        data.phonetic ||
        data.phonetics?.find(item => item.text)?.text ||
        "Phonetic unavailable";

    const audio =
        data.phonetics?.find(item => item.audio)?.audio;

    const meanings = (data.meanings || [])
        .map((meaning, index) => {

            const definitions = (meaning.definitions || [])
                .map((definition, number) => {

                    return `
                        <div class="def">
                            <span class="num">${number + 1}</span>

                            <div>
                                <p class="definition">
                                    ${escapeHTML(
                                        definition.definition || ""
                                    )}
                                </p>

                                ${
                                    definition.example
                                        ? `
                                        <p class="example">
                                            "${escapeHTML(
                                                definition.example
                                            )}"
                                        </p>
                                        `
                                        : ""
                                }

                                ${
                                    definition.synonyms?.length
                                        ? `
                                        <p class="syn">
                                            <b>Synonyms:</b>
                                            ${escapeHTML(
                                                definition.synonyms.join(", ")
                                            )}
                                        </p>
                                        `
                                        : ""
                                }
                            </div>
                        </div>
                    `;
                })
                .join("");

            return `
                <article
                    class="meaning"
                    style="animation-delay:${index * 70}ms"
                >
                    <span class="part">
                        ${escapeHTML(
                            meaning.partOfSpeech || "meaning"
                        )}
                    </span>

                    <div class="defs">
                        ${definitions}
                    </div>
                </article>
            `;
        })
        .join("");

    results.innerHTML = `
        <article class="card">

            <div class="head">

                <div>
                    <h2 class="word">
                        ${escapeHTML(data.word)}
                    </h2>

                    <p class="phonetic">
                        ${escapeHTML(phonetic)}
                    </p>
                </div>

                ${
                    audio
                        ? `
                        <button
                            class="audio"
                            id="audio"
                            title="Play pronunciation"
                        >
                            ▶
                        </button>
                        `
                        : ""
                }

            </div>

            <div class="meanings">
                ${meanings}
            </div>

            <div class="source">
                Source:
                ${
                    data.sourceUrls?.[0]
                        ? `
                        <a
                            href="${escapeAttribute(
                                data.sourceUrls[0]
                            )}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Free Dictionary
                        </a>
                        `
                        : "Free Dictionary API"
                }
            </div>

        </article>
    `;

    if (audio) {
        const audioButton =
            document.getElementById("audio");

        audioButton.addEventListener("click", () => {
            const sound = new Audio(audio);
            sound.play().catch(() => {});
        });
    }
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}