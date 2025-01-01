import Hero from '@/components/hero-about'
import { allPosts } from 'contentlayer/generated'
import { Mdx } from '@/components//mdx/mdx'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { useLocale } from 'next-intl'
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('privacy.meta')
  return {
    title: {
      default:t('title'),
      template: `%s `
    },
    description:t('description')
  }
}


export default function Privacy() {

  const locale = useLocale()
  const latestPost = allPosts.find(post => post.slug.startsWith(locale+'/privacy'))

  return (
    <>
      <Hero param="privacy" />
      <section>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-6 pb-12 md:pt-8 md:pb-20">

            {/* Section header */}
            <div className="max-w-3xl mx-auto pb-12 md:pb-0">
                <section className="relative">
                  <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <div className={`pt-32 pb-12 md:pt-0 md:pb-20`}>
                      <div className="max-w-3xl mx-auto">
                        <article>
                          <div className="mb-8" data-aos="fade-up" data-aos-delay="450">
                            {latestPost && <Mdx code={latestPost.body.code} />}
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </section>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
