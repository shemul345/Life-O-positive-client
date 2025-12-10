export function extractTableData(json) {
  if (!json) return [];
  if (Array.isArray(json)) {
    const tableObj = json.find(item => item && item.type === "table" && Array.isArray(item.data));
    if (tableObj) return tableObj.data;
    if (json.length > 0 && typeof json[0] === "object" && !json[0].type) return json;
  }
  return [];
}

export function filterByRelation(data, key, value) {
  if (!Array.isArray(data) || value === "" || value === null || typeof value === "undefined") return [];
  const sVal = String(value);
  return data.filter(item => String(item[key]) === sVal);
}