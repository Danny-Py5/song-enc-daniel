// const fs = require("fs");
// const mammoth = require("mammoth");

// const yorubaDocPath = "yoruba.docx"; // Path to the Yoruba DOC file
// const songsJsonPath = "songs.json"; // Path to the existing JSON file
// const updatedSongsPath = "updated_songs.json"; // Path to save the updated JSON

// // Helper function to parse the Yoruba DOC file
// function parseYorubaDoc(text) {
//   const lines = text
//     .split("\n")
//     .map((line) => line.trim())
//     .filter(Boolean);

//   const songs = [];
//   let currentSong = null;
//   let currentSection = null;
//   let pendingTitle = null; // To handle split titles

//   lines.forEach((line) => {
//     const titleMatch = line.match(/^\d+[\.:]\s(.+)$/);
//     const yorubaTitleMatch = line.match(/^\((.+?)\)$/);

//     if (titleMatch) {
//       if (currentSong) {
//         songs.push(currentSong);
//       }
//       pendingTitle = titleMatch[1].trim();
//       currentSong = null;
//     } else if (yorubaTitleMatch && pendingTitle) {
//       currentSong = {
//         englishTitle: pendingTitle,
//         yorubaTitle: yorubaTitleMatch[1].trim(),
//         yoruba: [{ title: "main", items: [] }],
//       };
//       pendingTitle = null;
//       currentSection = null;
//     } else if (/^Egbe:|^Ese\s\d+:|^Coda:/i.test(line)) {
//       if (!currentSong) {
//         console.warn("Section header found without a song title:", line);
//         return;
//       }
//       const sectionTitle = line.split(":")[0].trim();
//       currentSection = { title: sectionTitle, lyrics: "" };
//       currentSong.yoruba[0].items.push(currentSection);
//     } else if (currentSection) {
//       currentSection.lyrics += (currentSection.lyrics ? "\n" : "") + line;
//     }
//   });

//   if (currentSong) {
//     songs.push(currentSong);
//   }

//   return songs;
// }

// async function updateSongsJson() {
//   try {
//     const yorubaDoc = await mammoth.extractRawText({ path: yorubaDocPath });
//     const yorubaSongs = parseYorubaDoc(yorubaDoc.value);

//     const songsJson = JSON.parse(fs.readFileSync(songsJsonPath, "utf8"));

//     const songsWithoutYoruba = []; // Array to store the IDs of songs without Yoruba items

//     yorubaSongs.forEach((yorubaSong) => {
//       const match = songsJson.find(
//         (song) =>
//           song.englishTitle.toLowerCase() ===
//           yorubaSong.englishTitle.toLowerCase()
//       );

//       if (match) {
//         // Skip songs that already have something in the `yoruba` array
//         if (match.yoruba && match.yoruba.length > 0) {
//           console.log(`Skipping song with existing Yoruba content: ${match.englishTitle}`);
//           return;
//         }

//         if (!match.yoruba) {
//           match.yoruba = [];
//         }

//         match.yoruba = [...match.yoruba, ...yorubaSong.yoruba];

//         // Check if the song doesn't have Yoruba items and add its ID to the list
//         if (match.yoruba.length === 0) {
//           songsWithoutYoruba.push(match.id); // Assuming `id` is the unique identifier
//         }
//       }
//     });

//     fs.writeFileSync(
//       updatedSongsPath,
//       JSON.stringify(songsJson, null, 2),
//       "utf8"
//     );
//     console.log("Updated songs JSON saved to:", updatedSongsPath);

//     // Return the IDs of the songs without Yoruba items
//     console.log("Songs without Yoruba items:", songsWithoutYoruba);
//     return songsWithoutYoruba;
//   } catch (error) {
//     console.error("Error updating songs JSON:", error);
//   }
// }

// updateSongsJson();

const fs = require("fs");
const mammoth = require("mammoth");

const yorubaDocPath = "yoruba.docx"; // Path to the Yoruba DOC file
const songsJsonPath = "songs.json"; // Path to the existing JSON file
const updatedSongsPath = "updated_songs.json"; // Path to save the updated JSON

// Helper function to parse the Yoruba DOC file
function parseYorubaDoc(text) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const songs = [];
  let currentSong = null;
  let pendingTitle = null; // To handle split titles

  lines.forEach((line) => {
    const titleMatch = line.match(/^\d+[\.:]\s(.+)$/); // Matches English song title
    const yorubaTitleMatch = line.match(/^\((.+?)\)$/); // Matches Yoruba title in parentheses

    if (titleMatch) {
      if (currentSong) {
        songs.push(currentSong);
      }
      pendingTitle = titleMatch[1].trim();
      currentSong = null;
    } else if (yorubaTitleMatch && pendingTitle) {
      currentSong = {
        englishTitle: pendingTitle,
        yorubaTitle: yorubaTitleMatch[1].trim(), // Set Yoruba title
        yoruba: [{ title: "main", items: [] }],
      };
      pendingTitle = null;
    }
  });

  if (currentSong) {
    songs.push(currentSong);
  }

  return songs;
}

async function updateSongsJson() {
  try {
    const yorubaDoc = await mammoth.extractRawText({ path: yorubaDocPath });
    const yorubaSongs = parseYorubaDoc(yorubaDoc.value);

    const songsJson = JSON.parse(fs.readFileSync(songsJsonPath, "utf8"));

    yorubaSongs.forEach((yorubaSong) => {
      // Find the song in the JSON that matches the English title
      const match = songsJson.find(
        (song) => song.englishTitle.toLowerCase() === yorubaSong.englishTitle.toLowerCase()
      );

      if (match) {
        // If the Yoruba title is not already set, add it
        if (!match.yorubaTitle || match.yorubaTitle === "") {
          match.yorubaTitle = yorubaSong.yorubaTitle;
          console.log(`Updated Yoruba title for: ${match.englishTitle}`);
        }
      }
    });

    // Write the updated songs data to a new JSON file
    fs.writeFileSync(updatedSongsPath, JSON.stringify(songsJson, null, 2), "utf8");
    console.log("Updated songs JSON saved to:", updatedSongsPath);
  } catch (error) {
    console.error("Error updating songs JSON:", error);
  }
}

updateSongsJson();
