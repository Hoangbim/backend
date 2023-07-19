import fs from "fs";

import path from "path";

// export default class Product {
//   constructor(title, imageUrl, description, price) {
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     const p = path.join(process.cwd(), "data", "products.json");

//     fs.readFile(p, (err, fileContent) => {
//       console.log("error", err, "filecontent", JSON.parse(fileContent));
//       return JSON.parse(fileContent);
//     });
//   }

//   static fetchAll(cb) {
//     const p = path.join(process.cwd(), "data", "products.json");

//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         cb([]);
//       }
//       cb(JSON.parse(fileContent));
//     });
//   }
// }
