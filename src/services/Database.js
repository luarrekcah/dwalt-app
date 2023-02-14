import database from '@react-native-firebase/database';
export const createItem = ({path, params}) => {
  if (!path || !params) {
    return console.warn('Sem path ou params!');
  }

  if (path.includes('undefined')) {
    return console.warn('Path recebendo valor indefinido');
  }
  database().ref(path).push(params);
};

export const updateItem = ({path, params}) => {
  if (!path || !params) {
    return console.warn('Sem path ou params!');
  }

  if (path.includes('undefined')) {
    return console.warn('Path recebendo valor indefinido');
  }
  database().ref(path).update(params);
};

export const deleteItem = ({path}) => {
  if (!path) {
    return console.warn('Sem path ou params!');
  }
  if (path.includes('undefined')) {
    return console.warn('Path recebendo valor indefinido');
  }
  database().ref(path).remove();
};

export const setItem = ({path, params}) => {
  if (!path || !params) {
    return console.warn('Sem path ou params!');
  }

  if (path.includes('undefined')) {
    return console.warn('Path recebendo valor indefinido');
  }
  database().ref(path).set(params);
};

export const getItems = async ({path}) => {
  if (!path) {
    return console.warn('Sem path ou params!');
  }

  if (path.includes('undefined')) {
    return console.warn('Path recebendo valor indefinido');
  }
  const items = await database()
    .ref(path)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });
  return items;
};

export const getAllItems = async ({path}) => {
  if (!path) {
    return console.warn('Sem path ou params!');
  }

  if (path.includes('undefined')) {
    return console.warn('Path recebendo valor indefinido');
  }
  const allItems = await database()
    .ref(path)
    .once('value')
    .then(snapshot => {
      let alldata = [];
      snapshot.forEach(childSnapshot => {
        let key = childSnapshot.key,
          data = childSnapshot.val();
        alldata.push({key, data});
      });
      return alldata;
    });
  return allItems;
};
