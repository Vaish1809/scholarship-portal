// import express from 'express'
// import cheerio, { Cheerio } from 'cheerio'
// import axios from 'axios'
// import { each } from 'cheerio/lib/api/traversing'

// const PORT = process.env.PORT || 5000
// const app = express()
// axios("https://www.vidhyaa.in/blog/scholarship-for-indian-students-after-12th")
//     .then(res =>{
//         const htmlData = res.data
//         const articles = []
//         const $ = Cheerio.load(htmlData)
// //             $('.raman-base',htmlData);each((index,element)=>{
// //                 const title = $(element).cholden("headling").text()
// //                 const titleURL = $(element).children("headling").attr("href")
// //                 articles.push({
// //                     title,titleURL
// //                 })
// //             } )
// // console.log(articles)
//    // })

//    $('.raman-base li').each((index, element) => {
//     const title = $(element).find('a').text(); // get the text of the anchor
//     const titleUrl = $(element).find('a').attr('href'); // get the href attribute of the anchor
//     articles.push({
//       title,
//       titleUrl
//     });
//   });
  
//   console.log(articles);}).catch(err=>console.error(err))

//   app.listen(PORT,()=> console.log("Server is listening"))

// import express from 'express';
// import cheerio from 'cheerio'; // Corrected import
// import axios from 'axios';

// const PORT = process.env.PORT || 5000;
// const app = express();

// // axios("https://www.vidhyaa.in/blog/scholarship-for-indian-students-after-12th")
// axios("https://www.vidhyaa.in/scholarship/aicte-saksham-scholarship-scheme")

//     .then(res => {
//         const htmlData = res.data;
//         const articles = [];
//         const $ = cheerio.load(htmlData); // Corrected line


//         let fullContent = '';
//         const scholarships = [];
// let scholrshipdetails;
//         // Select all <p>, heading, and <li> tags within .raman-base
//         $('.raman-base').find('p, h1, h2, h3, h4, h5, h6, li').each((index, element) => {
            
//           // Check if it's a list item and prepend with a bullet point
//           if(element.tagName === 'li') {
//             scholrshipdetails += `• ${$(element).text().trim()}\n`; // Add a bullet point for list items
//           } else {
//            scholrshipdetails += $(element).text().trim() + '\n'; // For other tags, just append the text
//           }
//         scholarships.push(
//             scholrshipdetails
//         )
//         })
//         console.log(scholarships);
//     }).catch(err => console.error(err));
        
        
        

        
//     //     $('.raman-base li').each((index, element) => {
//     //         const title = $(element).find('a').text(); // get the text of the anchor
//     //         const titleUrl = $(element).find('a').attr('href'); // get the href attribute of the anchor
//     //         articles.push({
//     //             title,
//     //             titleUrl
//     //         });
//     //     });

//     //     console.log(articles);
//     // // })
//     // .catch(err => console.error(err));

// app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

import express from 'express';
import cheerio from 'cheerio'; // Note: Cheerio is correctly capitalized here
import axios from 'axios';

const PORT = process.env.PORT || 5000;
const app = express();

axios("https://www.vidhyaa.in/blog/scholarship-for-indian-students-after-12th")
  .then(async response => {
    const htmlData = response.data;
    const $ = cheerio.load(htmlData);
    const articleUrls = [];

    // Fetch all the article URLs
    $('.raman-base li a').each((index, element) => {
      const titleUrl = $(element).attr('href');
      if (titleUrl) {
        articleUrls.push(titleUrl);
      }
    });

    // Use Promise.all to fetch all articles details
    const articlesDetails = await Promise.all(
      articleUrls.map(async (url) => {
        try {
          const res = await axios(url);
          const html = res.data;
          const $ = cheerio.load(html);
          let fullContent = '';

          $('.raman-base').find('p, h1, h2, h3, h4, h5, h6, li').each((index, element) => {
            const tagName = element.tagName.toLowerCase();
            if (tagName === 'li') {
              fullContent += `• ${$(element).text().trim()}\n`;
            } else {
              fullContent += `${$(element).text().trim()}\n`;
            }
          });

          return { url, fullContent };
        } catch (error) {
          console.error(`Error fetching details for URL ${url}:`, error);
          return null;
        }
      })
    );

    // Filter out any null responses due to errors
    const validArticlesDetails = articlesDetails.filter(detail => detail !== null);
   // console.log(validArticlesDetails[0]);
   const scholarshipsText = validArticlesDetails[0].fullContent;
   


const cleanAndSplit = (text) => {
    return text.split('•')
               .map(s => s.trim())
               .filter(s => s.length > 0);
  };
  
  // Function to extract sections based on titles in the text
  const extractSection = (text, startTitle, endTitle) => {
    const startPosition = text.indexOf(startTitle) + startTitle.length;
    const endPosition = endTitle ? text.indexOf(endTitle, startPosition) : undefined;
    const sectionText = text.substring(startPosition, endPosition).trim();
    return cleanAndSplit(sectionText);
  };
  
  // Main function to parse all scholarships
  const parseScholarships = (scholarshipsText) => {
    const scholarshipSections = scholarshipsText.split('\n\n').filter(section => section.includes('2023'));
    
    return scholarshipSections.map(section => {
      const url = section.match(/(https?:\/\/[^\s]+)/g)?.[0];
      const nameMatch = section.match(/^(.*?)2023,/);
      const name = nameMatch ? nameMatch[1].trim() : 'Unknown Scholarship Name';
      
      // Extract sections between known titles
      const eligibility = extractSection(section, 'Eligibility Criteria', );
      const rewards = extractSection(section, 'Rewards', 'Application Form');
      const applicationProcess = extractSection(section, 'Application Form', 'List of Documents');
      const requiredDocuments = extractSection(section, 'List of Documents', 'Last Dates','Selection Criteria');
      const otherScholarships = extractSection(section, 'Check Some Other List Of Scholarship',);
      const lastDateMatch = section.match(/Last Date\s*-\s*([\w\s]+)\s*\n/);
      const applicationDeadline = lastDateMatch ? lastDateMatch[1].trim() : 'No Deadline Specified';
  
      // Construct the JSON object
      return {
        name,
        url,
        eligibilityCriteria: eligibility,
        rewards,
        applicationProcess,
        requiredDocuments,
        otherScholarships,
        applicationDeadline
      };
    });
  };
  
  const scholarshipObjects = parseScholarships(scholarshipsText);
  console.log(JSON.stringify(scholarshipObjects, null, 2));





  })
  .catch(err => console.error('Error fetching initial page:', err));
 // Your scholarship data as a long string




app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
