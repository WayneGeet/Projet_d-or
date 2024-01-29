export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  try {
    const response = await fetch("http://127.0.0.1:8000/api/token/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    });
    const tokens = await response.json();
    // await useStorage().setItem("access", tokens.access);
    // await useStorage().setItem("refresh", tokens.refresh);

    return tokens;
  } catch (err) {
    console.log(err + " error caught ..........");
  }
});
