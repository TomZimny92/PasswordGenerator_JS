import clipboard from "clipboardy";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "generatePassword",
    title: "Generate Password",
    contexts: ["password"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "generatePassword" && info.editable === true) {
    const newPassword: string = GeneratePassword();

    const activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.type === "password" ||
        activeElement.getAttribute("type") === "password")
    ) {
      activeElement.value = newPassword;
      activeElement.dispatchEvent(new Event("input", { bubbles: true }));
      activeElement.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }
});

function GeneratePassword(): string {
  let pw: string = "";
  const min: number = 33;
  const max: number = 126;
  for (let i = 0; i < 16; i++) {
    const c: any = Math.floor(Math.random() * (max - min)) + min;
    pw += String.fromCharCode(c);
  }

  clipboard.write(pw);
  return pw;
}
