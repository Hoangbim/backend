import fs from "fs";
import path from "path";

const p = path.join(process.cwd(), "data", "movieList.json");
const movies = JSON.parse(fs.readFileSync(p, "utf-8"));
export const hoang = "hoang";

const dictPath = path.join(process.cwd(), "data", "dict.json");
fs.readFile(dictPath, (err, data) => {
  if (!err) {
    console.log("search DictiOnary already exist!");
  } else {
    console.log(err, "Creating search dictionary");
    let listOfTitleOverview = [];
    movies.forEach((movie) => {
      listOfTitleOverview = movie.title
        ? [
            ...listOfTitleOverview,
            ...movie.title?.toLowerCase().split(/[\s,.]+/),
            ...movie.overview?.toLowerCase().split(/[\s,.]+/),
          ]
        : [
            ...listOfTitleOverview,

            ...movie.overview?.toLowerCase().split(/[\s,.]+/),
            ...movie.name?.toLowerCase().split(/[\s,.]+/),
          ];
    });

    ///////////////////////// list of genre ID///////////////////////////
    const setOfDictionary = Array.from(new Set(listOfTitleOverview));

    ///////////////////////get reverted index///////////////////////////
    let revertedDictIndex = {};
    setOfDictionary.map((word) => {
      const index = [];
      for (let i = 0; i < movies.length; i++) {
        if (
          movies[i].title?.toLowerCase().includes(word) ||
          movies[i].name?.toLowerCase().includes(word) ||
          movies[i].overview?.toLowerCase().includes(word)
        )
          index.push(i);
      }
      return (revertedDictIndex[word] = index);
    });

    fs.writeFileSync(dictPath, JSON.stringify(revertedDictIndex), (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
});

/////FIND ARRAYS INTERSECTION //////////
export const findIntersection = (a, b) => {
  if (!!a && !!b) {
    let i = 0;
    let j = 0;
    let insections = [];
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) {
        insections.push(a[i]);
        i++;
        j++;
      } else if (a[i] > b[j]) {
        j++;
      } else i++;
    }
    return insections;
  }

  if (!!a && !b) {
    return a;
  }

  if (!a && !!b) {
    return b;
  }
};

// const A = [1, 2, 3, 5, 7, 8];
// const B = [0, 2, 3, 4, 8];
// console.log(findIntersection(A, B));
