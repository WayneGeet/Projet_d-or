export default defineEventHandler(async (event) => {
  const token = getRequestHeader(event, "authorization");
  try {
    const response = await fetch(`http://127.0.0.1:8000/users/${slug}/me/`, {
      method: "get",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    }
  } catch (error) {
    console.log(error, response.status, " something went wrong");
  }
});
