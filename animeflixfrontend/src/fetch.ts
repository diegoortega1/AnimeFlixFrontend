export async function list_animes(): Promise<any> {
  const r = await fetch("http://localhost:8000/list_animes");
  const data = await r.json();
  console.log("top", data);

  if (r.status !== 200) throw new Error(data.detail);
  return data;
}
