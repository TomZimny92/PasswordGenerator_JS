"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var clipboardy_1 = require("clipboardy");

chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
		id: "generatePassword",
		title: "Generate Password",
		contexts: ["password"]
	})
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "generatePassword" && info.editable === true){
		const newPassword = GeneratePassword();

		const activeElement = document.activeElement;
		if (activeElement && (activeElement.type === 'password' || activeElement.getAttribute('type') === 'password')) {
			activeElement.value = password;
			activeElement.dispatchEvent(new Event('input', {bubbles: true}));
			activeElement.dispatchEvent(new Event('change', {bubbles: true}));
		}
	}
});


function GeneratePassword() {
  var pw = "";
  var min = 33;
  var max = 126;
  for (var i = 0; i < 16; i++) {
      var c = Math.floor(Math.random() * (max - min)) + min;
      pw += String.fromCharCode(c);
  }
	//password = pw;
  clipboardy_1.default.write(pw);
	return pw;
	
}


//GeneratePassword();
