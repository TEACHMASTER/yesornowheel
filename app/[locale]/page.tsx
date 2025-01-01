import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('index.meta')
  return {
    title: {
      default:t('title'),
      template: `%s `
    },
    description:t('description')
  }
}

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



export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const latestPost = allPosts.find(post => post.slug.startsWith(`${locale}/index-1`))

  return (
    <>
      <div suppressHydrationWarning className="relative max-w-6xl mx-auto h-0 pointer-events-none -z-1" aria-hidden="true">
        <PageIllustration />
      </div>

      <DecisionWheel param='index.tool'/>

      <Stats />

      <Process params={{toolname:"index"}}/>
      <Carousel params={{index:true,toolname:"index"}}/>
      <TestimonialsBlocks params={{toolname:"index"}}/>
      <Tabs params={{toolname:"index"}}/>

      <FeaturesBlocks  params={{toolname:"index"}}/>
     {latestPost && <HomePost post={latestPost} isHome={true} />}
    </>
  )
}
