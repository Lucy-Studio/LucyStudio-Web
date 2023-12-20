// get elements
const inputBox = document.getElementById("inputbox");
const ampersandOption = document.getElementById("ampersandOption");
const sectionSymbolOption = document.getElementById("sectionOption");
const outputBox = document.getElementById("outputbox");
const previewText = document.getElementById("previewtext");

// set up Pickr
const colorInput1 = Pickr.create({
    el: "#colorpicker1",
    theme: "monolith",
    swatches: null,
    default: "#FF6600",
    defaultRepresentation: "HEX",
    position: "bottom-middle",
    components:
    {
        // Main components
        preview: true,
        opacity: false,
        hue: true,
        // Input / output Options
        interaction: {}
    }
});
colorInput1.setColor("#FF6600");
const colorInput2 = Pickr.create({
    el: "#colorpicker2",
    theme: "monolith",
    swatches: null,
    default: "#FF00FF",
    defaultRepresentation: "HEX",
    position: "bottom-middle",
    components:
    {
        // Main components
        preview: true,
        opacity: true,
        hue: true,
        // Input / output Options
        interaction: {}
    }
});
colorInput2.setColor("#FF00FF");

// add listeners for elements
colorInput1.on("change", generate);
colorInput1.on("changestop", () => { colorInput1.applyColor(); });
colorInput2.on("change", generate);
colorInput2.on("changestop", () => { colorInput2.applyColor(); });
inputBox.addEventListener("input", generate);

// main generator function
function generate() {
    const hex1 = "#" + colorInput1.getColor().toHEXA().join("");
    const hex2 = "#" + colorInput2.getColor().toHEXA().join("");

    const rgbArray1 = hexToRGBArray(hex1);
    const rgbArray2 = hexToRGBArray(hex2);

    const chars = inputBox.value.split("");

    var newMessage = "";
    for (var i = 0; i < chars.length; ++i) {
        const percent = i / chars.length;
        const currentRGBArray = rbgArrayInterpolate(rgbArray1, rgbArray2, percent);
        const currentHex = rgbArrayToHex(currentRGBArray);

        const settings = [hexToMCCode(currentHex)];
        newMessage += settings.join("") + chars[i];
    }

    lastMessage = newMessage.replaceAll("§", "&");

    outputBox.value = lastMessage

    // console.log(lastMessage) // DEBUGING

    previewText.style.fontFamily = "NeoDunggeunmo";
    previewText.innerHTML = mcCodesToHTML(newMessage, false);
}

// initital function call
generate();

function copyCmd() {
    // textarea element 가져오기
    const textarea = document.getElementById("outputbox");

    // textarea의 값을 복사하여 클립보드에 저장
    textarea.select();
    document.execCommand('copy');
    
    alert('복사되었습니다!')
}