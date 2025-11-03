import clipboard from "clipboardy";

function GeneratePassword() {
  let pw: string = "";
  const min: number = 33;
  const max: number = 126;
  for (let i = 0; i < 16; i++) {
    const c: any = Math.floor(Math.random() * (max - min)) + min;
    pw += String.fromCharCode(c);
  }

  clipboard.write(pw);
}

GeneratePassword();
