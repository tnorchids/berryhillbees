import logo from './assets/bhbheader.png';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import BuyLocally from './pages/BuyLocally.jsx';
import About from './pages/About.jsx';
import BuyOnline from './pages/BuyOnline.jsx';
import Bees from './pages/Bees.jsx';
import Contact from './pages/Contact.jsx';
import Updates from './pages/Updates.jsx';
import useUpdates from './hooks/useUpdates.js';
import { NewUpdateBadge } from './components/UpdatePost.jsx';
import PageMetadata from './components/PageMetadata.jsx';
import ThankYou from './pages/ThankYou.jsx';

const pages = [
  { path: '/', label: 'Home', component: Home },
  { path: '/bees', label: 'Our Bees', component: Bees },
  { path: '/products', label: 'Products', component: Products },
  { path: '/buyonline', label: 'Buy Online', component: BuyOnline },
  { path: '/wheretobuy', label: 'Buy Locally', component: BuyLocally },
  { path: '/about', label: 'About', component: About },
  { path: '/updates', label: 'Updates', component: Updates },
  { path: '/contact', label: 'Contact', component: Contact }
];

function Header({ currentPath }) {
  const { updates, isNew } = useUpdates();
  const hasNewUpdates = updates.some(isNew);
  return (
    <header className='mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line px-0 py-6 sm:py-8'>
      <a
        href='/'
        aria-label='Berry Hill Bees home'
        className='shrink-0 rounded-sm'
      >
        <img src={logo} alt='Berry Hill Bees' className='h-auto w-56 sm:w-68' />
      </a>
      <nav
        aria-label='Main navigation'
        className='flex flex-wrap justify-end gap-x-5 gap-y-1 sm:gap-x-8'
      >
        {pages.map(({ path, label }) => (
          <a
            key={path}
            href={path}
            aria-current={currentPath === path ? 'page' : undefined}
            className='group inline-flex items-center gap-2 py-2 text-sm text-ink'
          >
            <span
              className={`size-1.5 rounded-full ${currentPath === path ? 'bg-honey' : 'bg-transparent'}`}
              aria-hidden='true'
            />
            <span className='underline-offset-4 group-hover:underline'>
              {label}
            </span>
            {path === '/updates' && hasNewUpdates && <NewUpdateBadge />}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className='-mx-6 border-t border-line bg-[#f3f0e8] px-6 sm:-mx-10 sm:px-10'>
      <div className='mx-auto flex max-w-6xl flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10'>
        <div>
          <div className='mb-4 h-0.5 w-10 bg-honey' aria-hidden='true' />
          <a href='/' className='font-serif text-2xl tracking-tight text-ink'>
            Berry Hill Bees
          </a>
          <p className='mt-1 text-xs leading-6 text-muted'>
            A small apiary in Solway · Knoxville, Tennessee.
          </p>
        </div>
        <div className='text-sm text-muted'>
          <nav
            aria-label='Footer navigation'
            className='flex flex-wrap items-center gap-x-5 gap-y-2'
          >
            <a
              href='/wheretobuy'
              className='py-2 underline-offset-4 hover:text-ink hover:underline hover:decoration-honey'
            >
              Find us locally
            </a>
            <span
              aria-hidden='true'
              className='size-1 rounded-full bg-honey/60'
            />
            <a
              href='/contact'
              className='py-2 underline-offset-4 hover:text-ink hover:underline hover:decoration-honey'
            >
              Say hello
            </a>
          </nav>
          <p className='mt-3 text-xs text-muted sm:text-right'>
            © {new Date().getFullYear()} Berry Hill Bees
          </p>
        </div>
      </div>
    </footer>
  );
}
export default function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  const Page =
    currentPath === '/buyonline/thankyou'
      ? ThankYou
      : (pages.find(({ path }) => path === currentPath)?.component ?? NotFound);
  return (
    <div className='min-h-screen bg-paper px-6 font-sans text-ink sm:px-10'>
      <PageMetadata path={currentPath} />
      <a
        href='#main'
        className='sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-paper focus:p-3'
      >
        Skip to content
      </a>
      <Header currentPath={currentPath} />
      <main id='main' className='mx-auto max-w-6xl'>
        <Page />
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <section className='py-20'>
      <h1 className='font-serif text-4xl'>Page not found</h1>
      <a
        href='/'
        className='mt-6 inline-block text-muted underline underline-offset-4'
      >
        Return home
      </a>
    </section>
  );
}
