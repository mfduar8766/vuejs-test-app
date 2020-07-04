const ADMIN = 'ADMIN';
const CLIENT = 'CLIENT';

export const chunckArray = (array, size) =>
  array.map((_, index) => (index % size === 0 ? array.slice(index, index + size) : null)).filter(element => element);

export const authGuard = (to, _, next) => {
  const userState = getUserFromVueX();
  if (!userState) {
    next({
      state: JSON.parse(localStorage.getItem('vuex')),
      name: 'PageNotFound',
      params: { message: 'Permission Denied', status: 401 }
    });
  }
  if (userState && userState.permission) {
    if (userState.permission === ADMIN) {
      next();
    }
    if (userState.permission === CLIENT) {
      next();
    }
  } else {
    next({
      state: JSON.parse(localStorage.getItem('vuex')),
      name: 'PageNotFound',
      params: { message: 'Page Not Found', status: 404 }
    });
  }
};

export const generateUserObject = (name, token, permission, data) => ({
  name,
  token,
  permission,
  data
});

export const getUserFromVueX = () => {
  const vuexState = JSON.parse(localStorage.getItem('vuex'));
  const userState = (vuexState && vuexState.user) || null;
  return userState && userState.permission === null ? null : userState;
};

export const setNavigationParams = (name, params, queries) => ({
  name,
  params,
  query: {
    t: new Date().getTime(),
    ...queries
  }
});

export class PaginatorService {
  static state$ = {
    rowsPerPage: null,
    tableData: [],
    page: 0
  };

  static changeState(value) {
    this.state$ = {
      rowsPerPage: value.rowsPerPage,
      tableData: value.tableData,
      page: value.page
    };
  }

  static state() {
    return this.state$;
  }
}
