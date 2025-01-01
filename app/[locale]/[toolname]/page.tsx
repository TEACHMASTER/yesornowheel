import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { defaultLocale } from '@/i18n/config'
import PageIllustration from '@/components/page-illustration'
import Stats from '@/components/stats'
import Tabs from '@/components/tabs'
import Process from '@/components/process'
import TestimonialsBlocks from '@/components/testimonials-blocks'
import FeaturesBlocks from '@/components/features-blocks'
import { allPosts } from 'contentlayer/generated'
import { HomePost } from '@/components/HomePost'
import Carousel from '@/components/carousel'
import DecisionWheel from '@/components/decisionWheel'
import { notFound } from 'next/navigation'
import { to } from '@react-spring/web'

export async function generateMetadata({ params: { locale,toolname } }: { params: { locale:string,toolname:string } }): Promise<Metadata> {
  const t = await getTranslations(`${toolname}.meta`)
  const url = process.env.NEXT_PUBLIC_URL||'https://yes-or-no.org/'
  return {
    title: {
      default:t('title'),
      template: `%s `
    },
    description:t('description'),
    alternates: {
      canonical: (locale===defaultLocale?"":locale+"/")+toolname,
    },
    openGraph: {
      type: 'website',
      locale: locale,
      url: (locale===defaultLocale?"":locale+"/")+toolname,
      title: t('title'),
      description: t('description'),
      siteName: t('title'),
    },
    twitter: {
      card: 'summary_large_image',
      site: (locale===defaultLocale?"":locale+"/")+toolname,
      title: t('title'),
      description: t('description'),
    }
  }
}


export default function Home({ params: { locale, toolname } }: { params: { locale: string, toolname: string } }) {
  
  const latestPost = allPosts.find(post => post.slug.startsWith(`${locale}/tools/${toolname}`))

  if(!latestPost){
    return notFound()
  }

  return (
    <>
      <div suppressHydrationWarning className="relative max-w-6xl mx-auto h-0 pointer-events-none -z-1" aria-hidden="true">
        <PageIllustration />
      </div>

      <DecisionWheel param={`${toolname}.tool`}/>


      <Stats />

      <Carousel params={{toolname}}/>
      
      <TestimonialsBlocks params={{toolname}}/>

      <Process params={{toolname}}/> 

      <Tabs params={{toolname}}/>

      <FeaturesBlocks params={{toolname}}/>


     {latestPost && <HomePost post={latestPost} isHome={true} />}
    </>
  )
}
