export default defineEventHandler(async (event) => {
  console.log(getResponseStatus(event));
  if (getResponseStatus(event) !== 200) {
    const { refr } = await readBody(event);
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refr,
      }),
    });

    const { access, refresh } = await response.json();
    await useStorage().setItem("access", access);
    await useStorage().setItem("refresh", refresh);
  }
});
