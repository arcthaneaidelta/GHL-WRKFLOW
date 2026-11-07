/**
 * Real client-side CSV export utility
 */
export function exportToCsv(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length) {
    console.warn('No data available for CSV export');
    return;
  }

  const separator = ',';
  const keys = Object.keys(rows[0]);

  const csvContent =
    keys.map((k) => `"${k.replace(/"/g, '""')}"`).join(separator) +
    '\n' +
    rows
      .map((row) => {
        return keys
          .map((k) => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k];
            if (typeof cell === 'object') {
              cell = JSON.stringify(cell);
            }
            cell = String(cell).replace(/"/g, '""');
            return `"${cell}"`;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().slice(0, 10)}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

