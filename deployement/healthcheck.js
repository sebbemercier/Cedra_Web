const url = "http://localhost:3000";

try {
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`Healthcheck failed with status: ${response.status}`);
    process.exit(1);
  }
  console.log("Healthcheck passed");
  process.exit(0);
} catch (error) {
  console.error("Healthcheck failed:", error);
  process.exit(1);
}
