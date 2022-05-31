
const qrcode = require('qrcode');

export function getQrCode (url: string) {
  const qrOption = {
    margin : 7,
    width : 1000,
    height : 1000,
  };
  return qrcode.toDataURL(url, qrOption);
}