import fs from "fs";
import path from "path";

export const hoang = "hoang";

// const hagiangPath = path.join(process.cwd(), "data", "hagiang.json");

// const hagiangList = JSON.parse(fs.readFileSync(hagiangPath, "utf-8")).hagiang;
const provineListPath = path.join(process.cwd(), "data", "caobangList.json");
const provineCoorDataPath = path.join(
  process.cwd(),
  "data",
  "newDistrictCoor.json"
);

const provineList = JSON.parse(
  fs.readFileSync(provineListPath, "utf-8", (err, data) => {
    console.log("data", data);
  })
);

const provineCoorData = JSON.parse(
  fs.readFileSync(provineCoorDataPath, "utf-8")
);

//map district coordinates
const mapAndWriteFile = (list) => {
  const newCoors = list.map((item) => {
    return {
      district: item.district,
      coordinates: item.coordinates[0][0],
    };
  });

  fs.writeFileSync(newPath, JSON.stringify(newCoors), (err) => {
    if (err) {
      console.log(err);
    }
  });
};

// mapAndWriteFile(districtList);

const mapProvineData = (provList, distCoor) => {
  const finalGeoData = [];
  for (const prov in provList) {
    const distList = provList[prov].map((dist) => {
      const distCoorData = distCoor.find(
        (district) => district.district === dist
      );
      return distCoorData;
    });
    // const distList = provList[prov].map((dist) => {
    //   const distCoorData = distCoor.find(
    //     (district) => district.district === dist
    //   )?.coordinates;

    //   return { district: dist, coordinates: distCoorData };
    // });
    const provineData = {
      city: prov,
      regions: distList,
    };

    finalGeoData.push(provineData);
    console.log(provineData);
    // return finalGeoData;

    // const provData = {
    //   city: prov,
    //   regions: distList,
    // };
  }
};

mapProvineData(provineList, provineCoorData);
