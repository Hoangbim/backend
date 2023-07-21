import fs from "fs";
import path from "path";

export const hoang = "hoang";

// const hagiangPath = path.join(process.cwd(), "data", "hagiang.json");

// const hagiangList = JSON.parse(fs.readFileSync(hagiangPath, "utf-8")).hagiang;
const distPath = path.join(process.cwd(), "data", "listDistName.json");

const districtList = JSON.parse(fs.readFileSync(distPath, "utf-8"));

console.log(districtList);

const fetchAndWriteFile = async (dist) => {
  const coordinatesList = { district: "", coordinates: [] };
  const splitName = dist.split(" ");

  if (splitName.length === 3) {
    try {
      coordinatesList.district = dist;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${splitName[0]}+${splitName[1]}+${splitName[2]}&polygon_geojson=1&format=json`
      );
      console.log("current district ", dist);
      if (res) {
        const data = await res.json();
        if (data[0].geojson) {
          coordinatesList.coordinates.push(data[0]?.geojson?.coordinates);
          fs.appendFileSync(
            path.join(process.cwd(), "data", "baccanPhuthoCoor.json"),
            JSON.stringify(coordinatesList),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (splitName.length === 4) {
    try {
      coordinatesList.district = `${splitName[0]} ${splitName[1]} ${splitName[2]} ${splitName[3]}`;
      const res4 = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${dist[0]}+${dist[1]}+${dist[2]}+${dist[3]}&polygon_geojson=1&format=json`
      );
      if (res4) {
        const data4 = await res4.json();
        console.log("current district", dist);
        if (data4[0].geojson) {
          coordinatesList.coordinates.push(data4[0]?.geojson?.coordinates);
          fs.appendFileSync(
            path.join(process.cwd(), "data", "caobangCoor.json"),
            JSON.stringify(coordinatesList),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};

async function fetchAndWriteAll(distList, prov) {
  for (const dist of distList) {
    await fetchAndWriteFile(dist);
  }
  console.log("Hoàn thành tinh ", prov);
}

async function fetchListProvine(list) {
  for (const prov in list) {
    await fetchAndWriteAll(list[prov], prov);
  }
  console.log("xong");
}

// fetchAndWriteAll(caobangList);
fetchListProvine(districtList);
