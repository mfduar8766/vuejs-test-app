class SideBarUtils {
  static clientNavLinks = [
    { icon: 'fa fa-home', path: '/client', name: 'DashBoard' },
    { icon: 'fa fa-book', path: '/client/balance', name: 'Balance' },
    { icon: 'fa fa-user', path: '/client/profile', name: 'Profile' },
    { icon: 'fa fa-power-off', path: '/', name: 'Log Out' }
  ];

  static adminNavLinks = [
    { icon: 'fa fa-user', path: '/admin', name: 'Profile' },
    { icon: 'fa fa-group', path: '/admin/agencies', name: 'Agencies' },
    { icon: 'fa fa-user-circle', path: '/admin/agents', name: 'Agents' },
    { icon: 'fa fa-power-off', path: '/', name: 'Log Out' }
  ];

  static addNewLinks(link) {
    this.clientNavLinks.push(link);
  }

  static addNewAdminLinks(link) {
    this.adminNavLinks.push(link);
  }

  static getNavLinks(role) {
    switch (role) {
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
