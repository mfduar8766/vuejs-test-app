export const ASC = 'ASC';
export const DESC = 'DESC';

export const chunckArray = (array, size) =>
  array.map((_, index) => (index % size === 0 ? array.slice(index, index + size) : null)).filter(element => element);

// export const chunckArray = (array: any[], size: number): any[] => {
//   const chunckedArray = [];
//   const arrayCopy = [...array];
//   const childrenArrays = Math.ceil(arrayCopy.length / size);
//   for (let i = 0; i < childrenArrays; i++) {
//     chunckedArray.push(arrayCopy.splice(0, size));
//   }
//   return chunckedArray;
// };

export const handleAscSort = (tableData, selectedHeader) =>
  tableData.sort((a, b) => {
    if (typeof a[selectedHeader] === 'number' || typeof b[selectedHeader] === 'number') {
      return a[selectedHeader] - b[selectedHeader];
    } else if (typeof a[selectedHeader] === 'string' || typeof b[selectedHeader] === 'string') {
      return a[selectedHeader].localeCompare(b[selectedHeader]);
    }
    return null;
  });

export const handleDescSort = (tableData, selectedHeader) =>
  tableData.sort((a, b) => {
    if (typeof a[selectedHeader] === 'number' || typeof b[selectedHeader] === 'number') {
      return b[selectedHeader] - a[selectedHeader];
    } else if (typeof a[selectedHeader] === 'string' || typeof b[selectedHeader] === 'string') {
      return b[selectedHeader].localeCompare(a[selectedHeader]);
    }
    return null;
  });
