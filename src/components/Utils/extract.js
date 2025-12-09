export function extractTableData(json) {
  if (!json) return [];
  // If array and contains 'table' object
  if (Array.isArray(json)) {
    const tableObj = json.find(item => item && item.type === "table" && Array.isArray(item.data));
    if (tableObj) return tableObj.data;
    // If already clean array of objects (not wrapper)
    if (json.length > 0 && typeof json[0] === "object" && !json[0].type) return json;
  }
  // Fallback empty
  return [];
}

/**
 * Safe filter by relation key (works with string/number ids)
 * data: array, key: relation key e.g. 'division_id' or 'divisionId', value: id
 */
export function filterByRelation(data, key, value) {
  if (!Array.isArray(data) || value === "" || value === null || typeof value === "undefined") return [];
  const sVal = String(value);
  return data.filter(item => String(item[key]) === sVal);
}