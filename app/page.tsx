import {Hero} from '@/components/Hero';
import {HomeSections} from '@/components/HomeSections';
export default function Home(){return <><link rel="preload" as="image" href="/globe/poster-v1.svg" fetchPriority="high"/><link rel="preload" as="fetch" href="/globe/land-mobile-v1.bin" media="(max-width: 699px)" crossOrigin="anonymous"/><link rel="preload" as="fetch" href="/globe/land-desktop-v1.bin" media="(min-width: 700px)" crossOrigin="anonymous"/><main><Hero/></main><HomeSections/></>;}
