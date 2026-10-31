import {services,type ServiceShape} from './services';
export type CapabilityShape=ServiceShape;
export const capabilities=services.map(service=>({slug:service.slug,title:service.name,description:service.intro,shape:service.shape,services:service.items}));
