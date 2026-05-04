const previewInput = document.getElementById("previewInput");
const previewOutput = document.getElementById("previewOutput");
const previewButtons = document.querySelectorAll("[data-sample]");
const glyphFixTargets = document.querySelectorAll(
  [
    ".type-hero__lede",
    ".type-hero__facts strong",
    ".specimen-strip span",
    ".specimen-card__body",
    ".preview-output",
    ".poster-card__word",
  ].join(", ")
);

const buildGlyphMarkup = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(
    /l/g,
    '<span class="glyph-l" aria-hidden="true">l</span>'
  );

const applyGlyphFix = (element, value) => {
  const text = value.trim() || "R3 keeps the screen calmer.";
  element.setAttribute("aria-label", text);
  element.innerHTML = buildGlyphMarkup(text);
};

glyphFixTargets.forEach((element) => {
  applyGlyphFix(element, element.textContent || "");
});

if (previewInput && previewOutput) {
  const syncPreview = (value) => {
    applyGlyphFix(previewOutput, value);
  };

  previewInput.addEventListener("input", () => {
    syncPreview(previewInput.value);
  });

  previewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sample = button.getAttribute("data-sample") || "";
      previewInput.value = sample;
      syncPreview(sample);
    });
  });
}
