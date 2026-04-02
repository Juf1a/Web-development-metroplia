const catItems = [
  {
    cat_id: 9592,
    cat_name: 'Frank',
    weight: 11,
    owner: 3609,
    filename: 'f3dbafakjsdfhg4',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9590,
    cat_name: 'Mittens',
    weight: 8,
    owner: 3602,
    filename: 'f3dasdfkjsdfhgasdf',
    birthdate: '2021-10-12',
  },
  {
    cat_id: 9593,
    cat_name: 'Whiskers',
    weight: 6,
    owner: 3610,
    filename: 'asdjfklasjdf123',
    birthdate: '2022-03-05',
  },
  {
    cat_id: 9594,
    cat_name: 'Shadow',
    weight: 9,
    owner: 3611,
    filename: 'lkj23lkj4lkj23',
    birthdate: '2020-07-21',
  },
  {
    cat_id: 9595,
    cat_name: 'Luna',
    weight: 7,
    owner: 3612,
    filename: 'zxcvbnm09876',
    birthdate: '2023-01-14',
  },
  {
    cat_id: 9596,
    cat_name: 'Simba',
    weight: 10,
    owner: 3613,
    filename: 'poiuytrewq456',
    birthdate: '2019-11-30',
  },
  {
    cat_id: 9597,
    cat_name: 'Nala',
    weight: 8,
    owner: 3614,
    filename: 'qwerty123asd',
    birthdate: '2022-06-18',
  }
];

const allCatItems = () => {
    return catItems;
}

const searchCatbyId = (id) => {
    return  catItems.find(cat => cat.cat_id == id)
}

const addCat = (cat) => {
  const { cat_name, weight, owner, filename, birthdate } = cat;

  const newId = Math.max(...catItems.map(cat => cat.cat_id)) + 1;

  const newCat = {
    cat_id: newId,
    cat_name,
    weight,
    owner,
    filename,
    birthdate,
  };

  catItems.push(newCat);

  return newCat;
};

export {allCatItems, searchCatbyId, addCat}