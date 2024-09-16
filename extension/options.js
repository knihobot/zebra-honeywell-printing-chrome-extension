var print = document.getElementById("print");

print.onclick = function () {
  console.log("Print button clicked.");
  chrome.runtime.sendMessage({
    type: "zebra_print_label",
    zpl: document.getElementById("zpl").value,
    ip: document.getElementById("printerAddress").value,
  });
  return false;
};
