const previewInput = document.getElementById("previewInput");
const previewOutput = document.getElementById("previewOutput");
const previewButtons = document.querySelectorAll("[data-sample]");

if (previewInput && previewOutput) {
  const syncPreview = (value) => {
    previewOutput.textContent = value.trim() || "R2 sharpens the signal.";
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
