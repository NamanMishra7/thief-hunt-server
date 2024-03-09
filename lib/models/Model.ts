const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

export class Model {
  private document: string;
  private uid: string;

  constructor (modelName: string) {
    this.uid = uuidv4();
    this.document = modelName;
  }

  async save() {
    return new Promise(async (resolve, reject) => {
      try {
        let fileData = "[]";
        if (fs.existsSync(`data/${this.document}.json`)) {
          fileData = await fs.promises.readFile(`data/${this.document}.json`);
        }
        const parsedData = JSON.parse(fileData);
        parsedData.push(this);
        await fs.promises.writeFile(`data/${this.document}.json`, JSON.stringify(parsedData));
        resolve(true);
      } catch (err) {
        console.error(err);
        reject(false);
      }
    });
  }
}