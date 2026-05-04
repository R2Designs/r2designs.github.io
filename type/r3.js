const previewInput = document.getElementById("previewInput");
const previewOutput = document.getElementById("previewOutput");
const previewButtons = document.querySelectorAll("[data-sample]");

if (previewInput && previewOutput) {
  const syncPreview = (value) => {
    previewOutput.textContent = value.trim() || "R3 keeps the screen calmer.";
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
