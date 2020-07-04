import { getUserFromVueX } from '../../utils';

class SideBarUtils {
  static clientNavLinks = [
    { icon: 'fa fa-home', path: '/client', name: 'DashBoard' },
    { icon: 'fa fa-book', path: '/client/balance', name: 'Balance' },
    { icon: 'fa fa-user', path: '/client/profile', name: 'Profile' },
    { icon: 'fa fa-power-off', path: '/', name: 'Log Out' }
  ];

  static adminNavLinks = [
    { icon: 'fa fa-user', path: '/admin/dashboard', name: 'Admin' },
    { icon: 'fa fa-institution', path: '/admin/agencies', name: 'Agencies' },
    { icon: 'fa fa-group', path: '/admin/agents', name: 'Agents' },
    { icon: 'fa fa-area-chart', path: '/admin/metrics', name: 'Metrics' },
    { icon: 'fa fa-power-off', path: '/', name: 'Log Out' }
  ];

  static addNewLinks(link) {
    this.clientNavLinks.push(link);
  }

  static addNewAdminLinks(link) {
    this.adminNavLinks.push(link);
  }

  static getNavLinks(role) {
    const userState = getUserFromVueX();
    const checkRole = role ? role : userState.permission;
    switch (checkRole) {
      case 'CLIENT':
        return this.clientNavLinks;
      case 'ADMIN':
        return this.adminNavLinks;
      default:
        return [];
    }
  }
}

export default SideBarUtils;
