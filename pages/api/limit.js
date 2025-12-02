export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  console.log("Starting POST calls to all API endpoints");

  // Define all your API endpoints
  const apiEndpoints = [
    "https://dev11-app.csnonprod.com/launch-api/manage/deploy/692ee1b07587c4907f981a85",
    "https://dev11-app.csnonprod.com/launch-api/manage/deploy/692ee2d4b1b5b10d2f52bcc3",
  ];

  const results = [];
  const errors = [];

  try {
    const batchSize = 16;
    const totalBatches = Math.ceil(apiEndpoints.length / batchSize);

    console.log(`Processing ${apiEndpoints.length} endpoints in ${totalBatches} batches of ${batchSize} (all batches in parallel)`);

    // Create all batches
    const batches = [];
    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const startIndex = batchIndex * batchSize;
      const endIndex = Math.min(startIndex + batchSize, apiEndpoints.length);
      const batch = apiEndpoints.slice(startIndex, endIndex);
      batches.push(batch);
    }

    // Process all batches in parallel
    const allBatchPromises = batches.map(async (batch, batchIndex) => {
      console.log(`Starting batch ${batchIndex + 1}/${totalBatches} (${batch.length} URLs)`);

      const batchPromises = batch.map(async (url, index) => {
        const globalIndex = (batchIndex * batchSize) + index;
        try {
          console.log(`Making POST call ${globalIndex + 1}/${apiEndpoints.length}: ${url}`);

          const isInternal = url.startsWith('/api/');
          const fullUrl = isInternal
            ? `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${url}`
            : url;

          const response = await fetch(fullUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              timestamp: new Date().toISOString(),
              source: 'post-all-endpoint'
            })
          });

          let responseData;
          try {
            responseData = await response.json();
          } catch {
            responseData = await response.text();
          }

          const result = {
            url,
            status: response.status,
            success: response.ok,
            message: response.ok ? 'Success' : `Failed with status ${response.status}`,
            response: responseData
          };

          if (response.ok) {
            console.log(`✅ Success for ${url}: ${response.status}`);
          } else {
            console.log(`❌ Error for ${url}: ${response.status}`);
          }

          return result;

        } catch (error) {
          console.log(`❌ Network error for ${url}:`, error);
          return {
            url,
            status: 0,
            success: false,
            message: `Network error: ${error?.message || 'Unknown error'}`
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      console.log(`Completed batch ${batchIndex + 1}/${totalBatches}`);
      return batchResults;
    });

    const allBatchResults = await Promise.all(allBatchPromises);

    allBatchResults.flat().forEach(result => {
      if (result.success) results.push(result);
      else errors.push(result);
    });

    return res.status(200).json({
      success: true,
      message: `POST calls completed. ${results.length} successful, ${errors.length} failed`,
      summary: {
        total: apiEndpoints.length,
        successful: results.length,
        failed: errors.length
      },
      results,
      errors,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Unexpected error during POST calls:", error);
    return res.status(500).json({
      success: false,
      message: "Unexpected error occurred during POST calls",
      error: error?.message || 'Unknown error'
    });
  }
}
