async function appendToGist(content) {
  const gistId = process.env.gistId;
  const accessToken = process.env.githubAccessToken;

  if (!gistId || !accessToken) {
    console.error(
      "Gist ID or Access Token not provided in environment variables."
    );
    return;
  }

  const url = `https://api.github.com/gists/${gistId}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `token ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      files: {
        "new_file.txt": {
          content: content,
        },
      },
    }),
  });

  if (response.ok) {
    console.log("Content appended successfully to the Gist.");
  } else {
    console.error("Failed to append content to the Gist:", response.statusText);
  }
}
