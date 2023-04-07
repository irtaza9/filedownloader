const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button");

downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkURL(fileInput.value)) {
    downloadBtn.innerText = "Downloading file...";
    fetchFile(fileInput.value);
  } else {
    alert("Only mentioned files are downloadable!");
    fileInput.value = "";
  }
});

function checkURL(url) {
  return url.match(/\.(jpeg|jpg|gif|png|pdf|mp4)$/) != null;
}

function fetchFile(url) {
  fetch(url)
    .then((res) => res.blob())
    .then((file) => {
      let tempUrl = URL.createObjectURL(file);
      const aTag = document.createElement("a");
      aTag.href = tempUrl;
      aTag.download = url.replace(/^.*[\\\/]/, "");
      document.body.appendChild(aTag);
      aTag.click();
      downloadBtn.innerText = "Download File";
      URL.revokeObjectURL(tempUrl);
      aTag.remove();
    })
    .catch(() => {
      alert("Failed to download file!");
      downloadBtn.innerText = "Download File";
      fileInput.value = "";
    });
}
