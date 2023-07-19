const fs = require("fs");
const fetch = require("node-fetch");

// List các API bạn muốn fetch
const apiList = [
  "https://api.example.com/api1",
  "https://api.example.com/api2",
  "https://api.example.com/api3",
];

// Hàm để fetch API và ghi kết quả vào file
async function fetchAndWrite(api, file) {
  try {
    const response = await fetch(api);
    const data = await response.json();

    // Ghi kết quả vào file
    fs.appendFileSync(file, JSON.stringify(data) + "\n");
    console.log(`API ${api} đã được ghi vào file ${file}`);
  } catch (error) {
    console.log(`Lỗi khi fetch API ${api}:`, error);
  }
}

// Hàm chạy fetch và ghi kết quả vào file cho tất cả các API trong danh sách
async function fetchAndWriteAll(apiList, file) {
  for (const api of apiList) {
    await fetchAndWrite(api, file);
  }
  console.log("Hoàn thành!");
}

// Thực thi hàm chạy fetch và ghi kết quả vào file
const outputFile = "output.txt";
fetchAndWriteAll(apiList, outputFile);
