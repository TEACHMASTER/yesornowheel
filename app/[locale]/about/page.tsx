import Hero from '@/components/hero-about'
import FeaturesGallery from '@/components/features-gallery'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('about.meta')
  return {
    title: {
      default:t('title'),
      template: `%s `
    },
    description:t('description')
  }
}

export default function About() {
  return (
    <>
      <Hero param="about" />
      <FeaturesGallery />
    </>
  )
}
