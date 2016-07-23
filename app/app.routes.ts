import { provideRouter, RouterConfig }  from '@angular/router';

import { employeeRoutes } from './employee/employee.routes';

export const routes: RouterConfig = [
  ...employeeRoutes
];

export const appRouterProviders = [
    provideRouter(routes)
];
