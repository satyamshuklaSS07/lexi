const PRIMARY_API = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const BACKUP_API = "https://api.suvankar.cc/dictionaryapi/v1/definitions/en/";

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
    showLoading();

    const cleanWord = word.trim().toLowerCase();

    // First try Free Dictionary API
    try {
        const response = await fetch(
            PRIMARY_API + encodeURIComponent(cleanWord)
        );

        if (response.ok) {
            const data = await response.json();

            if (Array.isArray(data) && data[0]) {
                render(data[0]);
                return;
            }
        }

        // If primary API fails, use backup API
        console.log("Primary API unavailable. Trying backup API...");

    } catch (error) {
        console.log("Primary API failed. Trying backup API...");
    }

    // Backup API
    try {
        const response = await fetch(
            BACKUP_API + encodeURIComponent(cleanWord) + "?compact=true"
        );

        if (!response.ok) {
            throw new Error("Backup API failed");
        }

        const data = await response.json();

        if (!data) {
            throw new Error("No data");
        }

        const convertedData = convertBackupData(data, cleanWord);

        if (!convertedData.meanings.length) {
            throw new Error("Word not found");
        }

        render(convertedData);

    } catch (error) {
        showError(cleanWord);
    }
}

function showLoading() {
    results.innerHTML = `
        <div class="state">
            <div class="loader"></div>
            <h2>Looking it up...</h2>
            <p>Fetching meanings and pronunciation.</p>
        </div>
    `;
}

function showError(word) {
    results.innerHTML = `
        <div class="state">
            <div style="font-size:45px">⚠</div>
            <h2>Dictionary service is unavailable</h2>
            <p>
                Please check your internet connection and try again.
            </p>
        </div>
    `;
}

function convertBackupData(data, word) {
    const meanings = [];

    // Backup API format:
    // meanings -> senses -> glosses
    if (Array.isArray(data.meanings)) {
        data.meanings.forEach((meaning) => {
            const definitions = [];

            if (Array.isArray(meaning.senses)) {
                meaning.senses.forEach((sense) => {
                    if (Array.isArray(sense.glosses)) {
                        sense.glosses.forEach((gloss) => {
                            definitions.push({
                                definition: cleanText(gloss),
                                example:
                                    sense.examples &&
                                    sense.examples[0]
                                        ? cleanText(
                                              sense.examples[0]
                                          )
                                        : "",
                                synonyms: []
                            });
                        });
                    }
                });
            }

            if (definitions.length > 0) {
                meanings.push({
                    partOfSpeech:
                        meaning.partOfSpeech ||
                        meaning.part_of_speech ||
                        "meaning",
                    definitions
                });
            }
        });
    }

    return {
        word: data.word || word,
        phonetic: data.phonetic || "",
        phonetics: [],
        meanings
    };
}

function render(data) {
    const phonetic =
        data.phonetic ||
        data.phonetics?.find((item) => item.text)?.text ||
        "Phonetic unavailable";

    const audio =
        data.phonetics?.find((item) => item.audio)?.audio;

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
                Source: Free Dictionary API / Backup Dictionary
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

function cleanText(value) {
    return String(value)
        .replace(/<[^>]*>/g, "")
        .trim();
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}