/**
 * Created by Administrator on 2017/8/19.
 */
export function saveToLocal (id, key, value) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  window.localStorage._seller_ = JSON.stringify(seller);
};

export function loadFromLocal (id, key, dft) {
  let seller = window.localStorage._seller_;
  if (!seller) {
    return dft;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return dft;
  }
  let rect = seller[key];
  return rect || dft;
};

