import {toPng} from "html-to-image";

function downloadImage(dataUrl) {
    const a = document.createElement("a");

    a.setAttribute("download", "reactflow.png");
    a.setAttribute("href", dataUrl);
    a.click();
}

export function saveAsImage() {
    toPng(document.querySelector(".react-flow__viewport")
    ).then(downloadImage);
}
