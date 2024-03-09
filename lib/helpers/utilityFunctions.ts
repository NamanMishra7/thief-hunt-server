const fs = require('fs')

import { Model } from "../models/Model";

export async function addData(model: String, data: Model) {
  return new Promise(async (resolve, reject) => {
    try {
      const fileData = await fs.promises.readFile(`data/${model}.json`);
      const parsedData = JSON.parse(fileData);
      parsedData.push(data);
      await fs.promises.writeFile(`data/${model}.json`, JSON.stringify(parsedData));
      resolve(true);
    } catch (err) {
      console.error(err);
      reject(false);
    }
  });
}

export async function fetchData(model: String) {
  return new Promise<any[]>(async (resolve, reject) => {
    try {
      if (!fs.existsSync(`data/${model}.json`)) {
        return resolve([]);
      }
      const fileData = await fs.promises.readFile(`data/${model}.json`);
      const parsedData = JSON.parse(fileData);
      resolve(parsedData);
    } catch (err) {
      console.error(err);
      reject(null);
    }
  });
}

export async function saveData(model: string, data: any[]) {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      await fs.promises.writeFile(`data/${model}.json`, JSON.stringify(data));
      resolve(true);
    } catch (err) {
      console.error(err);
      reject(false);
    }
  });
}