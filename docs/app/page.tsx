import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { Hero } from './_components/hero';
import { Features } from './_components/features';
import { CodeShowcase } from './_components/code-showcase';
import { Community } from './_components/community';
import { Footer } from './_components/footer';

export default function HomePage() {
  return (
    <HomeLayout {...baseOptions()}>
      <Hero />
      <Features />
      <CodeShowcase />
      <Community />
      <Footer />
    </HomeLayout>
  );
}
