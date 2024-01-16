export default defineEventHandler(async (event) => {
  const {
    fname: first_name,
    lname: last_name,
    email,
    password,
    id_no,
  } = await readBody(event);
  const response = await fetch("http://127.0.0.1:8000/users/register/", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ first_name, last_name, email, id_no, password }),
  });
  if (!response.ok) {
    throw createError({
      statusCode: 400,
      statusMessage: "something went wrong!",
    });
  } else {
    setResponseStatus(event, 201);
    const data = await response.json();
    return data;
  }
});
