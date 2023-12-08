export default defineEventHandler(async (event) => {
  const accessToken = await useStorage().getItem("access");
  try {
    const response = await fetch("http://127.0.0.1:8000/users/me/", {
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
