chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "generatePassword",
    title: "Generate Password",
    contexts: ["editable"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generatePassword") {
    var newPassword = GeneratePassword();

		if (tab.url && !tab.url.startsWith("chrome://")){
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			func: insertPassword,
			args: [newPassword]
		});
		}
		else {
			console.log("Cannot execute 'Generate Password' on a chrome:// URL");
		}
  }
});

function insertPassword(password) {
	  var activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.type === "password" ||
        activeElement.getAttribute("type") === "password")
    ) {
      activeElement.value = password;
      activeElement.dispatchEvent(new Event("input", { bubbles: true }));
      activeElement.dispatchEvent(new Event("change", { bubbles: true }));
    }

}

function GeneratePassword() {
  let pw = "";
  let min = 33;
  let max = 126;
  for (let i = 0; i < 16; i++) {
    let c = Math.floor(Math.random() * (max - min)) + min;
    pw += String.fromCharCode(c);
  }
  return pw;
}
