exports.handler = async (event, context) => {
  try {
    const response = await fetch("https://www.marvalouscompetitions.co.uk/instant-winners");
    const html = await response.text();

    const clean = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        text: clean.slice(0, 1200)
      })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Could not load winners"
      })
    };
  }
};
