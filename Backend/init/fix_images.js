const fs = require('fs');
const path = require('path');

// Read the original data file
const dataPath = path.join(__dirname, 'data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Function to convert image arrays to object format
function convertImageArray(match, imageArray) {
  // Parse the array of strings
  const urls = imageArray.match(/"[^"]+"/g) || [];
  
  // Convert to object format
  const imageObjects = urls.map((url, index) => {
    const cleanUrl = url.replace(/"/g, '');
    const publicId = `product_${Date.now()}_${index}`;
    const originalUrl = cleanUrl.replace('?auto=compress&cs=tinysrgb&w=500', '');
    
    return `      {
        url: ${url},
        public_id: "${publicId}",
        original: "${originalUrl}"
      }`;
  });
  
  return `images: [
${imageObjects.join(',\n')}
    ]`;
}

// Replace all image arrays in the file
dataContent = dataContent.replace(/images:\s*\[([\s\S]*?)\]/g, convertImageArray);

// Write the updated content back to the file
fs.writeFileSync(dataPath, dataContent);

console.log('✅ Successfully updated image format in data.js');
console.log('🔄 Images converted from string arrays to object format');