/**
 * Created by PanJiaChen on 16/11/18.
 */

import {
  Number
} from "core-js";

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validIP(str) {
  const ips = str.split(".");
  for (const i of ips) {
    if (!isNaN(parseInt(i)) && (parseInt(i) >= 0 && parseInt(i) <= 255)) {
      continue;
    }
    return false;
  }
  return true;
}
export function validMask(str) {
  const ips = str.split(".");
  for (const i of ips) {
    if (!isNaN(parseInt(i)) && (parseInt(i) >= 0 && parseInt(i) <= 255)) {
      continue;
    }
    return false;
  }
  return true;
}
export function validGateway(str) {
  const ips = str.split(".");
  for (const i of ips) {
    if (!isNaN(parseInt(i)) && (parseInt(i) >= 0 && parseInt(i) <= 255)) {
      continue;
    }
    return false;
  }
  return true;
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
// 修改密码
export function validOldPw(str) {
  return str == "123456";
}
export function validNewPw(str) {
  return str.length > 6;
}
export function validNewPw2(str1, str2) {
  return str1 == str2;
}
